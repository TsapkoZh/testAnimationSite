import { takeLatest, all, put, call } from 'redux-saga/effects';
import { serializer } from 'utils/serializers';

import * as api from 'api';

import { actions } from './slice';

export function* fetchData() {
  try {
    const response = yield call(api.fetchData);

    yield put({
      type: actions.fetchDataSuccess,
      payload: { posts: serializer(response.results[0].data.body) },
    });
  } catch (err) {
    console.error(err);
  }
}

export default function*() {
  yield all([takeLatest(actions.fetchData, fetchData)]);
}
