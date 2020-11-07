import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { gsap } from 'gsap';

const Parallax = ({ children, id, className, trigger }) => {
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: `#${trigger}${id}`,
        delay: 0.2,
        scrub: 1,
      },
    });
    tl.from(`#parallax${id}`, { y: '-60%' });
  }, [id, trigger]);

  return (
    <div className={className} id={`parallax${id}`}>
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
