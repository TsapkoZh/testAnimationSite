import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useAction from 'hooks/useAction';
import { actions } from 'models/data/slice';

import Header from './Header';
import Posts from './Posts';
import Cursor from 'components/Cursor';

const MySite = () => {
  const [elementIdInView, setElementIdInView] = useState(0);

  const onFetchData = useAction(actions.fetchData);
  useEffect(() => {
    onFetchData();
  }, [onFetchData]);

  const content = useSelector(state => state.data.posts);

  const idInView = useCallback(value => {
    setElementIdInView(value);
    setTimeout(() => {
      setElementIdInView(0);
    }, 1000);
  }, []);

  return (
    <Fragment>
      <Cursor />
      <Header idInView={elementIdInView} content={content} />
      <Posts elementIdInView={idInView} content={content} />
    </Fragment>
  );
};

export default React.memo(MySite);
