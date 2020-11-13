import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { gsap } from 'gsap';

const Opacity = ({ children, id, className, trigger }) => {
  const ref = useRef();

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: `#${trigger}${id}`,
        scrub: true,
        end: 'top -5%',
      },
    });
    tl.from(ref.current, { opacity: 0.1 });
  }, [id, trigger, ref]);

  return (
    <div className={className} ref={ref}>
      {children}
    </div>
  );
};

Opacity.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  id: PropTypes.string,
  trigger: PropTypes.string,
};

Opacity.defaultProps = {
  className: null,
  children: null,
  id: null,
  trigger: '',
};

export default React.memo(Opacity);
