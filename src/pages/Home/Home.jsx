import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useAction from 'hooks/useAction';
import { actions } from 'models/data/slice';
// import { postsSelector } from 'models/data/selectors';

import Header from './Header';
import Posts from './Posts';

const Home = () => {
  const [idInView, setIdInView] = useState('_');

  const onFetchData = useAction(actions.fetchData);
  useEffect(() => {
    onFetchData();
  }, [onFetchData]);

  const content = useSelector(state => state.data.posts);

  // const content = useSelector(postsSelector);

  const cbId = useCallback(elementIdInView => {
    setIdInView(elementIdInView);
  }, []);

  return (
    <Fragment>
      <Header content={content} idInView={idInView} />
      <Posts content={content} elementIdInView={cbId} />
    </Fragment>
  );
};

export default React.memo(Home);
