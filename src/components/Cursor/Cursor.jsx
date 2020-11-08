import React, { useState, useEffect, useContext, useRef } from 'react';

import { gsap } from 'gsap';

import classnames from 'classnames';
import styles from './Cursor.scss';

import { CursorContext } from 'components/Cursor/ContextWrapper';

const Cursor = () => {
  const [hidden, setHidden] = useState(true);
  const { isHover } = useContext(CursorContext);
  const ball = useRef(null);
  const dot = useRef(null);

  useEffect(() => {
    gsap.set(ball.current, { xPercent: -50, yPercent: -50 });
    gsap.set(dot.current, { xPercent: -50, yPercent: -50 });

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const mouse = { x: pos.x, y: pos.y };
    const speed = 0.12;

    const xSetBall = gsap.quickSetter(ball.current, 'x', 'px');
    const ySetBall = gsap.quickSetter(ball.current, 'y', 'px');
    const xSetDot = gsap.quickSetter(dot.current, 'x', 'px');
    const ySetDot = gsap.quickSetter(dot.current, 'y', 'px');

    const onMouseMove = e => {
      mouse.x = e.x;
      mouse.y = e.y;
      setHidden(true);
    };
    const onMouseLeave = () => {
      setHidden(false);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);

    gsap.ticker.add(() => {
      pos.x += (mouse.x - pos.x) * speed;
      pos.y += (mouse.y - pos.y) * speed;
      xSetBall(pos.x);
      ySetBall(pos.y);
      xSetDot(mouse.x);
      ySetDot(mouse.y);
    });
  }, []);

  return (
    <>
      <div
        className={classnames(styles.cursorDot, {
          [styles.cursorHidden]: !hidden,
        })}
        ref={dot}
      />
      <div
        className={classnames(styles.cursorWrapper, {
          [styles.cursorHidden]: !hidden,
        })}
        ref={ball}
      >
        <div
          className={classnames(styles.cursorBall, {
            [styles.cursorEnter]: isHover,
          })}
        />
      </div>
    </>
  );
};

export default React.memo(Cursor);
