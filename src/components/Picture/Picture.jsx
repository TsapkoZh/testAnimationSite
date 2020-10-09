import React from 'react';
import PropTypes from 'prop-types';

const Picture = ({ srcSet, className, alt, src }) => {
  return (
    <picture>
      <source srcSet={srcSet.desktop} media="(min-width: 768px)" />
      <source srcSet={srcSet.tablet} media="(min-width: 480px)" />
      <source srcSet={srcSet.mobile} media="(min-width: 0px)" />

      <img src={src.desktop} alt={alt} className={className} />
    </picture>
  );
};

Picture.propTypes = {
  className: PropTypes.string,
  srcSet: PropTypes.shape({
    desktop: PropTypes.string,
    tablet: PropTypes.string,
    mobile: PropTypes.string,
  }),
  alt: PropTypes.string,
  src: PropTypes.string,
};

Picture.defaultProps = {
  className: null,
  srcSet: PropTypes.shape({
    desktop: null,
    tablet: null,
    mobile: null,
  }),
  alt: null,
  src: null,
};

export default React.memo(Picture);
