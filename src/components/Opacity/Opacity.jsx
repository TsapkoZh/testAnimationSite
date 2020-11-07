import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { gsap } from 'gsap';

const Opacity = ({ children, id, className, trigger }) => {
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: `#${trigger}${id}`,
        scrub: 0.6,
        delay: 0.2,
        end: 'top -5%',
      },
    });
    tl.from(`#opacityEl${id}`, { opacity: 0.1 });
  }, [id, trigger]);

  return (
    <div className={className} id={`opacityEl${id}`}>
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
