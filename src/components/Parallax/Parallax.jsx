import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { gsap } from 'gsap';

const Parallax = ({ children, id, className, trigger }) => {
  const parallaxRef = useRef();

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: `#${trigger}${id}`,
        delay: 0.2,
        scrub: 0.1,
      },
    });
    tl.from(parallaxRef.current, { y: '-60%' });
  }, [id, trigger, parallaxRef]);

  return (
    <div className={className} ref={parallaxRef}>
      {children}
    </div>
  );
};

Parallax.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  id: PropTypes.string,
  trigger: PropTypes.string,
};

Parallax.defaultProps = {
  className: null,
  children: null,
  id: null,
  trigger: '',
};

export default React.memo(Parallax);
