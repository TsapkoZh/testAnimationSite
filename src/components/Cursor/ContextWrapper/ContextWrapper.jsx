import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import CursorContext from './CursorContext';

const ContextWrapper = ({ children }) => {
  const [isHover, setHover] = useState(true);

  const onCursorLeave = useCallback(() => {
    setHover(true);
  }, []);

  const onCursorEnter = useCallback(() => {
    setHover(false);
  }, []);

  return (
    <CursorContext.Provider value={{ onCursorLeave, onCursorEnter, isHover }}>
      {children}
    </CursorContext.Provider>
  );
};

ContextWrapper.propTypes = {
  children: PropTypes.array,
};

ContextWrapper.defaultProps = {
  children: null,
};

export default React.memo(ContextWrapper);
