import React from 'react';
import PropTypes from 'prop-types';
import { Controller, Scene } from 'react-scrollmagic';
import { Tween, Timeline } from 'react-gsap';

const Parallax = props => (
  <Controller>
    <Scene duration="200%" triggerHook="onEnter">
      <Timeline wrapper={<div className={props.className} />}>
        <Tween
          position=".5"
          from={{
            top: '-25%',
          }}
          to={{
            top: '20%',
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
