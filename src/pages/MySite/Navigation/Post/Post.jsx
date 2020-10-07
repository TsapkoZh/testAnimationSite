import React, { useState, useCallback } from 'react';
import { PropTypes } from 'prop-types';

import PostContent from './PostContent';
import InViewComp from 'components/InViewComp';

import styles from './Post.scss';

const Post = ({ element, updateData }) => {
  const [viewAnchor, setViewAnchor] = useState(false);

  const hiddenAnchor = useCallback((position, inView) => {
    if (inView) {
      setViewAnchor(true);
    } else {
      setViewAnchor(false);
    }
    updateData(viewAnchor);
  });

  return (
    <div className={styles.postWrapper}>
      <InViewComp
        as="div"
        onChange={hiddenAnchor}
        key={element.id}
        cbData={element.id}
        threshold={0.2}
        className={styles.hlp}
      />
      <div className={styles.headerImgWrapper}>
        <picture>
          <source srcSet={element.src} media="(min-width: 1024px)" />
          <img
            src={element.src}
            alt={element.alt}
            className={styles.headerImg}
          />
        </picture>
      </div>
      <div className={styles.headerPost}>
        <h2 className={styles.headerPostTitle}>{element.title}</h2>
        <p className={styles.headerPostText}>{element.textTitle}</p>
      </div>

      <div className={styles.postContentWrap}>
        <PostContent element={element.postContent} />
      </div>
    </div>
  );
};

Post.propTypes = {
  updateData: PropTypes.func,
  element: PropTypes.shape({
    src: PropTypes.string,
    alt: PropTypes.string,
    id: PropTypes.string,
    title: PropTypes.string,
    textTitle: PropTypes.string,

    postContent: PropTypes.arrayOf(
      PropTypes.shape({
        src: PropTypes.string,
        alt: PropTypes.string,
        id: PropTypes.string,
        title: PropTypes.string,
        textTitle: PropTypes.string,
      })
    ),
  }),
};

Post.defaultProps = {
  updateData: null,
  element: PropTypes.shape({
    src: null,
    alt: null,
    id: null,
    title: null,
    textTitle: null,

    postContent: PropTypes.arrayOf(
      PropTypes.shape({
        src: null,
        alt: null,
        id: null,
        title: null,
        textTitle: null,
      })
    ),
  }),
};

export default React.memo(Post);
