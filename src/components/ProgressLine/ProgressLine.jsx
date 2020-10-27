import React, { useRef, useEffect } from 'react';

import { gsap } from 'gsap';

import s from './ProgressLine.scss';

const ProgressLine = () => {
  const progressLine = useRef(null);

  useEffect(() => {
    gsap.from(progressLine.current, {
      scrollTrigger: {
        trigger: 'body',
        scrub: true,
        start: 'top center',
        end: 'bottom bottom',
      },
      scaleY: 0,
      transformOrigin: 'top center',
      ease: 'none',
    });
  }, []);

  return <div className={s.progressLine} ref={progressLine} />;
};

export default React.memo(ProgressLine);
