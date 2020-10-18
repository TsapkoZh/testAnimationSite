import React, { useState, useCallback } from 'react';
import { PropTypes } from 'prop-types';

import PostContent from './PostContent';
import InViewComp from 'components/InViewComp';
import Picture from 'components/Picture';

import styles from './Post.scss';
import Opacity from 'components/Opacity';

const Post = ({ element, updateData, idInView }) => {
  const [viewAnchor, setViewAnchor] = useState(false);

  const hiddenAnchor = useCallback(
    (id, inView) => {
      if (inView) {
        setViewAnchor(true);
      } else {
        setViewAnchor(false);
      }
      updateData(viewAnchor);
      idInView(id);
    },
    [updateData, viewAnchor, idInView]
  );

  return (
    <Opacity duration="160%">
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
          <Picture
            src={element.mainImg.desktop}
            srcSet={element.mainImg}
            className={styles.headerImg}
          />
        </div>
        <div className={styles.headerPost}>
          <h2 className={styles.headerPostTitle}>{element.title}</h2>
          <p className={styles.headerPostText}>{element.textTitle}</p>
        </div>

        <div className={styles.postContentWrap}>
          <PostContent element={element.postContent} />
        </div>
      </div>
    </Opacity>
  );
};

Post.propTypes = {
  updateData: PropTypes.func,

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
  updateData: null,

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
