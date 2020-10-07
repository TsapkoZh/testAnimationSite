import React, { Fragment } from 'react';
import { PropTypes } from 'prop-types';

import Parallax from 'components/Parallax';

import styles from './PostContent.scss';

const PostContent = ({ element }) => {
  // console.log(element, 'PostContent');
  return (
    <Fragment>
      {element.map(el => (
        <div className={styles.postContent} key={el.id}>
          <Parallax className={styles.imgWrapper}>
            <picture className={styles.contentImg}>
              <source srcSet={el.src} media="(min-width: 1024px)" />
              <img
                src={el.src}
                alt={el.alt}
                id={el.id}
                className={styles.contentImg}
              />
            </picture>
          </Parallax>

          <div className={styles.contentTextWrapper}>
            <h3 className={styles.contentPostTitle}>{el.title}</h3>
            <p className={styles.contentPostText}>{el.text}</p>
          </div>
        </div>
      ))}
    </Fragment>
  );
};

PostContent.propTypes = {
  element: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string,
      alt: PropTypes.string,
      id: PropTypes.string,
      textTitle: PropTypes.string,
    })
  ),
};

PostContent.defaultProps = {
  element: PropTypes.arrayOf(
    PropTypes.shape({
      src: null,
      alt: null,
      id: null,
      textTitle: null,
    })
  ),
};

export default React.memo(PostContent);
