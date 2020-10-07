// import Home from 'pages/Home';
import MySite from 'pages/MySite';
// import UserInfo from 'pages/UserInfo';

// import { fetchUsers, fetchUser } from 'models/users/sagas';
import { fetchData } from './models/data/sagas';

export default [
  {
    path: '/',
    exact: true,
    cache: false,
    component: MySite,
    sagasToRun: [fetchData],
    title: 'MySite',
  },
  // {
  //   path: '/users/:id',
  //   cache: false,
  //   component: UserInfo,
  //   sagasToRun: [[fetchUser, ({ id }) => ({ payload: { id } })]],
  //   title: 'User',
  // },
];
