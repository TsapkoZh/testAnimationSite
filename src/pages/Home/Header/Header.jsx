import React, { useState, useCallback, Fragment } from 'react';
import { PropTypes } from 'prop-types';

import { TweenMax } from 'gsap';

import Btn from 'components/Btn';
import Picture from 'components/Picture';
import { disableScroll, enableScroll } from 'utils/eventScroll';

import styles from './Header.scss';
import classnames from 'classnames';

const Header = ({ content, idInView }) => {
  const [currentItem, setCurrentitem] = useState(false);
  const [visibilityHeader, setVisibilityHeader] = useState(false);

  const toggleClass = useCallback(id => {
    TweenMax.to(window, {
      duration: 0.9,
      scrollTo: {
        y: `#${id}`,
        offsetY: -350,
      },
      onComplete: () => {
        enableScroll();
      },
    });

    disableScroll();
    setCurrentitem(id);
    setVisibilityHeader(true);
  }, []);

  const backToHeader = useCallback(() => {
    TweenMax.to(window, {
      duration: 1,
      scrollTo: `#${idInView}`,
      onComplete: () => {
        setCurrentitem(false);
        setVisibilityHeader(false);
        enableScroll();
      },
    });

    setCurrentitem(idInView);
    disableScroll();
  }, [idInView]);

  return (
    <Fragment>
      <button className={styles.btnReturn} onClick={backToHeader}>
        back
      </button>
      <div
        className={classnames(styles.header, {
          [styles.isVisibility]: visibilityHeader,
        })}
      >
        {content.map(element => (
          <Btn
            className={classnames(styles.imgWrapper, {
              [styles.isHiden]: element.id !== currentItem && currentItem,
              [styles.postHover]: !visibilityHeader,
            })}
            key={element.id}
            cbData={element.id}
            onClick={toggleClass}
            id={`#${element.id}`}
          >
            <Picture
              src={element.mainImg.desktop}
              srcSet={element.mainImg}
              className={styles.post}
            />
          </Btn>
        ))}
      </div>
    </Fragment>
  );
};

Header.propTypes = {
  idInView: PropTypes.string,
  content: PropTypes.arrayOf(
    PropTypes.shape({
      mainImg: PropTypes.shape({
        desktop: PropTypes.string,
        tablet: PropTypes.string,
        mobile: PropTypes.string,
      }),
      alt: PropTypes.string,
      id: PropTypes.string.isRequred,
      textTitle: PropTypes.string.isRequred,

      postContent: PropTypes.arrayOf(
        PropTypes.shape({
          src: PropTypes.string.isRequred,
          alt: PropTypes.string,
          id: PropTypes.string.isRequred,
          textTitle: PropTypes.string.isRequred,
        })
      ),
    })
  ),
};

Header.defaultProps = {
  idInView: null,
  content: PropTypes.arrayOf(
    PropTypes.shape({
      mainImg: PropTypes.shape({
        desktop: null,
        tablet: null,
        mobile: null,
      }),
      alt: null,
      id: null,
      textTitle: null,

      postContent: PropTypes.arrayOf(
        PropTypes.shape({
          src: null,
          alt: null,
          id: null,
          textTitle: null,
        })
      ),
    })
  ),
};

export default React.memo(Header);
