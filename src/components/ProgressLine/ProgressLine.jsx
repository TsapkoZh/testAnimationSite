import React, { useRef, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { gsap } from 'gsap';
import classnames from 'classnames';

import Btn from 'components/Btn';

import s from './ProgressLine.scss';

const ProgressLine = ({ className, arr, onClick, activItem }) => {
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

  return (
    <Fragment>
      <div className={s.progressLine} ref={progressLine} />
      {arr.map((element, index) => (
        <div className={className} key={element}>
          <Btn
            className={classnames(s.anchor, {
              [s.isCurrent]: activItem === index,
            })}
            cbData={element}
            onClick={onClick}
          />
        </div>
      ))}
    </Fragment>
  );
};

ProgressLine.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  activItem: PropTypes.number,
  arr: PropTypes.array,
};

ProgressLine.defaultProps = {
  className: null,
  onClick: null,
  activItem: null,
  arr: null,
};

export default React.memo(ProgressLine);
