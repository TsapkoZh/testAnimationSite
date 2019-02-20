import path from 'path';
import morgan from 'morgan';
import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import hpp from 'hpp';
import favicon from 'serve-favicon';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { matchRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import { all, fork, join } from 'redux-saga/effects';
import Helmet from 'react-helmet';
import chalk from 'chalk';
import _concat from 'lodash/concat';

import createHistory from 'history/createMemoryHistory';
import configureStore from './store';
import renderHtml from './utils/renderHtml';
import routes from './routes';
import { port } from './config';

import App from './app';

/* eslint-disable import/extensions */
import assets from '../public/webpack-assets';
/* eslint-disable import/extensions */

const app = express();

/* Use helmet to secure Express with various HTTP headers */
app.use(helmet());
/* Prevent HTTP parameter pollution */
app.use(hpp());
/* Compress all requests */
app.use(compression());

app.use(morgan('dev', { skip: (req, res) => res.statusCode < 400 }));
app.use(favicon(path.resolve(process.cwd(), 'public/favicon.ico')));

if (!__DEV__) {
  app.use(express.static(path.resolve(process.cwd(), 'public')));
} else {
  /* Run express as webpack dev server */
  const webpack = require('webpack');
  const webpackConfig = require('../tools/webpack/config.babel');
  const compiler = webpack(webpackConfig);

  compiler.apply(new webpack.ProgressPlugin());

  app.use(
    require('webpack-dev-middleware')(compiler, {
      publicPath: webpackConfig.output.publicPath,
      headers: { 'Access-Control-Allow-Origin': '*' },
      hot: true,
      quiet: true, /* Turn it on for friendly-errors-webpack-plugin */
      noInfo: true,
      stats: 'minimal',
    }),
  );

  app.use(
    require('webpack-hot-middleware')(compiler, {
      log: false, /* Turn it off for friendly-errors-webpack-plugin */
    }),
  );
}

app.get('*', (req, res) => {
  const history = createHistory();

  const initialState = {};
  const store = configureStore(history, initialState);

  const loadBranchData = () => {
    const branch = matchRoutes(routes, req.path);
    const sagasToRun = branch.reduce((sagas, routeInfo) => {
      const { route } = routeInfo;
      if (route.sagasToRun) {
        return _concat(sagas, route.sagasToRun);
      }

      return sagas;
    }, []);

    return store.runSaga(function* runSagas() {
      const tasks = yield all(sagasToRun.map(saga => fork(saga)));
      yield all(tasks.map(task => join(task)));
    }).done;
  };

  (async () => {
    try {
      await loadBranchData();

      const staticContext = {};
      const AppComponent = (
        <Provider store={store}>
          <StaticRouter location={req.path} context={staticContext}>
            <App routes={routes} />
          </StaticRouter>
        </Provider>
      );

      const head = Helmet.renderStatic();
      const htmlContent = renderToString(AppComponent);

      const status = staticContext.status === '404' ? 404 : 200;

      res
        .status(status)
        .send(
          renderHtml(
            head,
            assets,
            htmlContent,
            store.getState(),
          ),
        );
    } catch (err) {
      res.status(404).send('Not Found :(');
      console.error(chalk.red(`==> 😭  Rendering routes error: ${err}`));
    }
  })();
});

if (port) {
  app.listen(port, (err) => {
    const url = `http://localhost:${port}`;

    if (err) {
      console.error(`==> 😭  OMG!!! ${err}`);
    }

    console.info(chalk.green(`==> 🌎  Listening at ${url}`));
  });
} else {
  console.error(chalk.red('==> 😭  OMG!!! No PORT environment variable has been specified'));
}
