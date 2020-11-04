import React, { useCallback } from 'react';
import { PropTypes } from 'prop-types';
import classnames from 'classnames';

import PostContent from './PostContent';
import InViewComp from 'components/InViewComp';
import Picture from 'components/Picture';

import styles from './Post.scss';

const Post = ({ element, updateHidden, getIdInView, i }) => {
  const hiddenAnchor = useCallback(
    (id, inView) => {
      const y = window.scrollY;
      if (y < 200) {
        updateHidden(true);
      } else {
        updateHidden(inView);
      }
      getIdInView(id);
    },
    [updateHidden, getIdInView]
  );

  return (
    <div className={styles.postWrapper}>
      <InViewComp
        as="div"
        onChange={hiddenAnchor}
        key={element.id}
        cbData={element.id}
        threshold={[0.05, 0.2]}
        className={classnames(styles.hlp, {
          [styles.hlpFirst]: i === 0,
        })}
      />
      <div
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
  updateHidden: PropTypes.func,
  getIdInView: PropTypes.func,
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
  getIdInView: null,
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
