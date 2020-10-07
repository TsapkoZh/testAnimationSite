import React, { useState, useEffect } from 'react';

import classNames from 'classnames';
import styles from './Cursor.scss';

const cx = classNames.bind(styles);

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(false);

  const onMouseLeave = () => {
    setHidden(true);
  };

  const onMouseMove = e => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  const addEventListeners = () => {
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
  };

  const removeEventListeners = () => {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseleave', onMouseLeave);
  };

  useEffect(() => {
    addEventListeners();
    return () => removeEventListeners();
  }, []);

  const cursorClasses = cx(styles.cursor, {
    cursorHidden: hidden,
  });

  return (
    <div
      className={cursorClasses}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    />
  );
};

export default React.memo(Cursor);
