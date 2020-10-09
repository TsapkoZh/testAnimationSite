import React from 'react';
import PropTypes from 'prop-types';
import { Controller, Scene } from 'react-scrollmagic';
import { Tween, Timeline } from 'react-gsap';

const Parallax = props => (
  <Controller>
    <Scene duration="200%" triggerHook="onEnter">
      <Timeline wrapper={<div className={props.className} />}>
        <Tween
          position="0"
          from={{
            top: '-30%',
          }}
          to={{
            top: '10%',
          }}
        >
          {props.children}
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
