import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import useAction from 'hooks/useAction';
import { actions } from 'models/data/slice';

import Header from './Header';
import Posts from './Posts';
import Cursor from 'components/Cursor';

const MySite = () => {
  const onFetchData = useAction(actions.fetchData);
  React.useEffect(() => {
    onFetchData();
  }, [onFetchData]);

  const content = useSelector(state => state.data.posts);

  return (
    <Fragment>
      <Cursor />
      <Header content={content} />
      <Posts content={content} />
    </Fragment>
  );
};

export default React.memo(MySite);
