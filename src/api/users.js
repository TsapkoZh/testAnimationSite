import Req from './request';

import users from 'stubs/users';
import Prismic from 'prismic-javascript';

export const fetchUsers = () =>
  Req.GET({
    url: '/users',
    stubData: users,
  });

export const fetchUser = id => {
  const userItem = users.find(user => user.id === Number(id));

  if (userItem) {
    return Req.GET({
      url: `/users/${id}`,
      stubData: userItem,
    });
  }

  return Promise.reject(new Error('Not found'));
};

export const fetchData = () =>
  Prismic.getApi('https://afinity.cdn.prismic.io/api/v2').then(api => {
    return api.query(Prismic.Predicates.at('document.type', 'home'));
  });
