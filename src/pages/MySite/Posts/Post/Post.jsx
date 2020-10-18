import React, { useState, useCallback } from 'react';
import { PropTypes } from 'prop-types';

import PostContent from './PostContent';
import InViewComp from 'components/InViewComp';
import Picture from 'components/Picture';
import Opacity from 'components/Opacity';

import styles from './Post.scss';

const Post = ({ element, updateHidden, idInView }) => {
  const [viewAnchor, setViewAnchor] = useState(false);

  const hiddenAnchor = useCallback(
    (id, inView) => {
      if (inView) {
        setViewAnchor(true);
      } else {
        setViewAnchor(false);
      }
      updateHidden(viewAnchor);
      idInView(id);
    },
    [updateHidden, viewAnchor, idInView]
  );

  return (
    <Opacity duration="140%">
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
  updateHidden: PropTypes.func,
  idInView: PropTypes.func,

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
  idInView: null,

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
