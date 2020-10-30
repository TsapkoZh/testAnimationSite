import React, { useState, useEffect, useCallback } from 'react';

import classnames from 'classnames';

import styles from './Cursor.scss';

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);

  const onMouseLeave = () => {
    setHidden(false);
  };

  const onMouseMove = e => {
    setPosition({ x: e.clientX, y: e.clientY });
    setHidden(true);
  };

  const addEventListeners = useCallback(() => {
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
  }, []);

  const removeEventListeners = useCallback(() => {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseleave', onMouseLeave);
  }, []);

  useEffect(() => {
    addEventListeners();
    return () => removeEventListeners();
  }, [addEventListeners, removeEventListeners]);

  return (
    <div
      className={classnames(styles.cursorWrapper, {
        [styles.cursorHidden]: hidden === false,
      })}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    >
      <div className={styles.cursor} />
    </div>
  );
};

export default React.memo(Cursor);
