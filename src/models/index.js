import { connectRouter } from 'connected-react-router';
import { all } from 'redux-saga/effects';

import dataReduser from './data/slice';

import dataSagas from './data/sagas';

export const createRootReducer = history => ({
  router: connectRouter(history),
  data: dataReduser,
});

export const rootSaga = function* rootSaga() {
  yield all([dataSagas()]);
};
