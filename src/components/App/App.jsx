import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
/* import { Helmet } from 'react-helmet'; */

import AppRouter from 'components/AppRouter';
import CursorWrapper from 'components/Cursor';
import useBrowser from 'hooks/useBrowser';

import 'styles/normalize.scss';
import styles from './App.scss';

import ContextWrapper from 'components/Cursor/ContextWrapper';

const App = ({ routes }) => {
  const browser = useBrowser();

  if (RUNTIME_ENV === 'client') {
    console.info('browser', browser);
  }

  useEffect(() => {
    let resizeTimer;
    window.addEventListener('resize', () => {
      document.body.classList.add(styles.resizeAnimationStopper);
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        document.body.classList.remove(styles.resizeAnimationStopper);
      }, 400);
    });
  });

  return (
    <div className={styles.app}>
      <ContextWrapper>
        <CursorWrapper />
        <AppRouter routes={routes} />
      </ContextWrapper>

      {/* Use Helmet only in SPA mode. Render app head on server side  */}
      {/* <Helmet {...config.app} /> */}
      {/* <hr /> */}
    </div>
  );
};

App.propTypes = {
  routes: PropTypes.array.isRequired,
};

export default App;
