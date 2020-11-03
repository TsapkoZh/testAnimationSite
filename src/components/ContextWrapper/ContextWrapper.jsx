import React, { useState } from 'react';

import CursorContext from './CursorContext';

const ContextWrapper = ({ children }) => {
  const [mouseLeave, setMouseLeave] = useState(false);

  const mLeave = () => {
    setMouseLeave(false);
  };

  const mMove = () => {
    setMouseLeave(true);
  };
  return (
    <CursorContext.Provider value={{ mLeave, mMove, mouseLeave }}>
      {children}
    </CursorContext.Provider>
  );
};

export default React.memo(ContextWrapper);
