import React, { Fragment } from 'react';
import { PropTypes } from 'prop-types';

import Parallax from 'components/Parallax';
import Picture from 'components/Picture';
import Opacity from 'components/Opacity';

import styles from './PostContent.scss';
import classnames from 'classnames';
import { even } from 'utils/even';

const PostContent = ({ element }) => (
  <Fragment>
    {element.map((el, i) => (
      <Opacity
        id={el.id}
        key={el.id}
        className={classnames(styles.postContent, {
          [styles.postContentReverse]: even(i) === false,
        })}
      >
        <Parallax id={el.id} className={styles.imgParallax}>
          <div className={styles.imgWrapper} id={el.id}>
            <Picture
              src={el.contentImg.desktop}
              srcSet={el.contentImg}
              className={styles.contentImg}
            />
          </div>
        </Parallax>

        <div className={styles.textWrapper}>
          <h3 className={styles.postTitle}>{el.title}</h3>
          <p className={styles.postText}>{el.text}</p>
        </div>
      </Opacity>
    ))}
  </Fragment>
);

PostContent.propTypes = {
  element: PropTypes.arrayOf(
    PropTypes.shape({
      contentImg: PropTypes.shape({
        desktop: PropTypes.string,
        tablet: PropTypes.string,
        mobile: PropTypes.string,
      }),
      alt: PropTypes.string,
      id: PropTypes.string,
      title: PropTypes.string,
      textTitle: PropTypes.string,
    })
  ),
};

PostContent.defaultProps = {
  element: PropTypes.arrayOf(
    PropTypes.shape({
      contentImg: PropTypes.shape({
        desktop: null,
        tablet: null,
        mobile: null,
      }),
      alt: null,
      id: null,
      title: null,
      textTitle: null,
    })
  ),
};

export default React.memo(PostContent);
