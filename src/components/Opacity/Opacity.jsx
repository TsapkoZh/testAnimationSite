import React from 'react';
import PropTypes from 'prop-types';
import { Tween, Timeline } from 'react-gsap';
import { Controller, Scene } from 'react-scrollmagic';

const Opacity = ({ children, duration, isEnable }) => (
  <Controller>
    <Scene
      enabled={isEnable}
      indicators={false}
      duration={duration}
      triggerHook="onEnter"
    >
      <Timeline>
        <Tween opacity="0">{children}</Tween>
      </Timeline>
    </Scene>
  </Controller>
);
Opacity.propTypes = {
  children: PropTypes.object,
  duration: PropTypes.string,
  isEnable: PropTypes.bool,
};
Opacity.defaultProps = {
  children: null,
  duration: null,
  isEnable: true,
};
export default React.memo(Opacity);
