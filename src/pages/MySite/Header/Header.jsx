import React, { useState, useCallback } from 'react';
import { PropTypes } from 'prop-types';
import disableScroll from 'disable-scroll';

import Btn from 'components/Btn';
import Picture from 'components/Picture';

import styles from './Header.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Header = ({ content, idInView }) => {
  const [currentItem, setCurrentitem] = useState(false);
  const [visibilityHeader, setVisibilityHeader] = useState(false);

  if (idInView !== 0) {
    setTimeout(() => {
      setCurrentitem(false);
      setVisibilityHeader(false);
    }, 1005);
  }

  const toggleClass = useCallback(id => {
    setTimeout(() => {
      disableScroll.on();
    }, 5);
    setCurrentitem(id);
    setTimeout(() => {
      disableScroll.off();
    }, 2000);
    setVisibilityHeader(true);
  }, []);

  return (
    <div
      className={cx(styles.header, {
        isVisibility: visibilityHeader,
      })}
    >
      {content.map(element => (
        <Btn
          className={cx(styles.imgWrapper, {
            isHiden: element.id !== currentItem && currentItem,
          })}
          key={element.id}
          cbData={element.id}
          onClick={toggleClass}
        >
          <a href={`#${element.id}`}>
            <Picture
              src={element.mainImg.desktop}
              srcSet={element.mainImg}
              className={styles.post}
            />
          </a>
        </Btn>
      ))}
    </div>
  );
};

Header.propTypes = {
  idInView: PropTypes.number,
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
