import React from 'react';
import PropTypes from 'prop-types';
import { Controller, Scene } from 'react-scrollmagic';
import { Tween, Timeline } from 'react-gsap';

const Parallax = ({ className, children }) => (
  <Controller>
    <Scene duration="200%" triggerHook="onEnter">
      <Timeline wrapper={<div className={className} />}>
        <Tween
          position="0"
          from={{
            top: '-45%',
          }}
          to={{
            top: '10%',
          }}
        >
          {children}
        </Tween>
      </Timeline>
    </Scene>
  </Controller>
);

Parallax.propTypes = {
  className: PropTypes.string,
  children: PropTypes.object,
};

Parallax.defaultProps = {
  className: null,
  children: null,
};

export default React.memo(Parallax);
