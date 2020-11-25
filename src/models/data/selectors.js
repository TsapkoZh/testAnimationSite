import { createSelector } from 'reselect';

export const dataSelector = createSelector(
  state => state,
  state => state.data
);

export const postsSelector = createSelector(dataSelector, ({ posts }) => posts);
