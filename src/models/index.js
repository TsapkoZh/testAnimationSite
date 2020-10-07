import { connectRouter } from 'connected-react-router';
import { all } from 'redux-saga/effects';

import usersReducer from './users/slice';
import dataReduser from './data/slice';

import usersSagas from './users/sagas';
import dataSagas from './data/sagas';

export const createRootReducer = history => ({
  router: connectRouter(history),
  users: usersReducer,
  data: dataReduser,
});

export const rootSaga = function* rootSaga() {
  yield all([usersSagas(), dataSagas()]);
};
