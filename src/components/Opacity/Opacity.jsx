import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { gsap } from 'gsap';

const Opacity = ({ children, id, className }) => {
  const opacityRef = useRef();

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: `#${id}`,
        scrub: true,
        end: 'top -5%',
      },
    });
    tl.from(opacityRef.current, { opacity: 0.1 });
  }, [id, opacityRef]);

  return (
    <div className={className} ref={opacityRef}>
      {children}
    </div>
  );
};

Opacity.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  id: PropTypes.string,
};

Opacity.defaultProps = {
  className: null,
  children: null,
  id: null,
};

export default React.memo(Opacity);
