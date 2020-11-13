import React, { useCallback } from 'react';
import { PropTypes } from 'prop-types';
import classnames from 'classnames';

import Opacity from 'components/Opacity';

import PostContent from './PostContent';
import InViewComp from 'components/InViewComp';
import Picture from 'components/Picture';

import styles from './Post.scss';

const Post = ({ element, updateHidden, isEnable, i }) => {
  const hiddenAnchor = useCallback(
    (id, inView) => {
      updateHidden(inView);
    },
    [updateHidden]
  );

  return (
    <div className={styles.postWrapper}>
      {i === 0 || !isEnable ? (
        <div
          id={element.id}
          className={classnames(styles.headerImgWrapper, {
            [styles.firstHeaderImgWrapper]: i === 0,
          })}
        >
          <Picture
            src={element.mainImg.desktop}
            srcSet={element.mainImg}
            className={styles.headerImg}
          />
        </div>
      ) : (
        <Opacity id={element.id} className={styles.headerImgWrapper}>
          <Picture
            src={element.mainImg.desktop}
            srcSet={element.mainImg}
            className={styles.headerImg}
          />
        </Opacity>
      )}

      <InViewComp
        onChange={hiddenAnchor}
        key={element.id}
        cbData={element.id}
        threshold={[0.3, 0.4]}
      >
        <div className={styles.headerPost}>
          <h2 className={styles.headerPostTitle}>{element.title}</h2>
          <p className={styles.headerPostText}>{element.textTitle}</p>
        </div>

        <div className={styles.postContentWrap}>
          <PostContent element={element.postContent} />
        </div>
      </InViewComp>
    </div>
  );
};

Post.propTypes = {
  updateHidden: PropTypes.func,
  isEnable: PropTypes.bool,
  i: PropTypes.number,

  element: PropTypes.shape({
    mainImg: PropTypes.shape({
      desktop: PropTypes.string,
      tablet: PropTypes.string,
      mobile: PropTypes.string,
    }),
    alt: PropTypes.string,
    id: PropTypes.string,
    title: PropTypes.string,
    textTitle: PropTypes.string,

    postContent: PropTypes.arrayOf(
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
  }),
};

Post.defaultProps = {
  updateHidden: null,
  isEnable: true,
  i: null,

  element: PropTypes.shape({
    contentImg: PropTypes.shape({
      desktop: null,
      tablet: null,
      mobile: null,
    }),
    alt: null,
    id: null,
    title: null,
    textTitle: null,

    postContent: PropTypes.arrayOf(
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
  }),
};

export default React.memo(Post);
