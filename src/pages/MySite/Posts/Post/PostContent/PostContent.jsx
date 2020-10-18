import React, { Fragment } from 'react';
import { PropTypes } from 'prop-types';

import classnames from 'classnames';

import Parallax from 'components/Parallax';
import Picture from 'components/Picture';
import Opacity from 'components/Opacity';

import styles from './PostContent.scss';

const PostContent = ({ element }) => {
  const even = n => !(n % 2);

  return (
    <Fragment>
      {element.map((el, i) => (
        <Opacity duration="70%" key={el.id}>
          <div
            className={classnames(styles.postContent, {
              [styles.postContentReverse]: even(i) === false,
            })}
          >
            <Parallax className={styles.imgWrapper}>
              <div className={styles.contentImg}>
                <Picture
                  src={el.contentImg.desktop}
                  srcSet={el.contentImg}
                  className={styles.contentImg}
                />
              </div>
            </Parallax>

            <div className={styles.contentTextWrapper} style={{ order: '20' }}>
              <h3 className={styles.contentPostTitle}>{el.title}</h3>
              <p className={styles.contentPostText}>{el.text}</p>
            </div>
          </div>
        </Opacity>
      ))}
    </Fragment>
  );
};

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
