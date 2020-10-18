/* eslint-disable */

import React from "react";
import PropTypes from 'prop-types';
import { Tween, Timeline } from "react-gsap";
import { Controller, Scene } from 'react-scrollmagic';

const Opacity = ({ children, duration }) => {
  return (
    <Controller>
      <Scene 
        indicators={false} 
        duration={duration}
        triggerHook="onEnter" 
      >
        <Timeline>
          <Tween opacity="0">
            {children}
          </Tween>
        </Timeline>
      </Scene>
    </Controller>
  );
}

Opacity.propTypes = {
  children: PropTypes.object,
  duration: PropTypes.string,
};

Opacity.defaultProps = {
  children: null,
  duration: null,
};

export default React.memo(Opacity);
