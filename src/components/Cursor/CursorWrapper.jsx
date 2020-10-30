import React, { useState, useEffect } from 'react';
import useBrowser from 'hooks/useBrowser';

import Cursor from './Cursor';

const CursorWrapper = () => {
  const [isMobile, setMobile] = useState(true);
  const {
    platform: { type },
  } = useBrowser();

  useEffect(() => {
    const handleResize = () => {
      setMobile(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (type !== 'desktop' || isMobile) {
    return null;
  }

  return <Cursor />;
};

export default React.memo(CursorWrapper);
