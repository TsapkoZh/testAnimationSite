/* eslint-disable no-param-reassign */

import { createSlice } from 'redux-starter-kit';

import actionTypes from 'utils/actionTypes';

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    posts: [],
  },
  reducers: {
    fetchDataSuccess(state, { payload }) {
      state.posts = [...payload.posts];
    },
    fetchData: state => {
      state.fetching = true;
    },
  },
});

export const actions = actionTypes(dataSlice.actions);

export default dataSlice.reducer;
