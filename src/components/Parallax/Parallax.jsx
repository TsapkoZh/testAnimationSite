import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { gsap } from 'gsap';

const Parallax = ({ children, id, className }) => {
  const parallaxRef = useRef();

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: `#${id}`,
        delay: 0.2,
        scrub: 0.1,
      },
    });
    tl.from(parallaxRef.current, { y: '-60%' });
  }, [id, parallaxRef]);

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
};

Parallax.defaultProps = {
  className: null,
  children: null,
  id: null,
};

export default React.memo(Parallax);
