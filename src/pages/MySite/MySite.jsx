import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useAction from 'hooks/useAction';
import { actions } from 'models/data/slice';

import Header from './Header';
import Posts from './Posts';
import Cursor from 'components/Cursor';

const MySite = () => {
  const [idInView, setIdInView] = useState('_');

  const onFetchData = useAction(actions.fetchData);
  useEffect(() => {
    onFetchData();
  }, [onFetchData]);

  const content = useSelector(state => state.data.posts);

  const cbId = useCallback(elementIdInView => {
    setIdInView(elementIdInView);
  }, []);

  return (
    <Fragment>
      <Cursor />
      <Header content={content} idInView={idInView} />
      <Posts content={content} elementIdInView={cbId} />
    </Fragment>
  );
};

export default React.memo(MySite);
