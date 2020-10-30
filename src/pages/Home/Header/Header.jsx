import React, { useState, useCallback, Fragment } from 'react';
import { PropTypes } from 'prop-types';

import { TweenMax } from 'gsap';

import Btn from 'components/Btn';
import Picture from 'components/Picture';
import { disableScroll, enableScroll } from 'utils/eventScroll';
import { getIndex } from 'utils/getIndex';

import back from 'images/back.svg';

import s from './Header.scss';
import classnames from 'classnames';

const Header = ({ content, idInView }) => {
  const [currentItem, setCurrentitem] = useState(false);
  const [currentItemZindex, setCurrentitemZindex] = useState(false);
  const [visibilityHeader, setVisibilityHeader] = useState(false);

  const toggleClass = useCallback(
    id => {
      TweenMax.to(window, {
        duration: 1,
        scrollTo: {
          y: `#${id}`,
          offsetY: `${getIndex(id, content) === 0 ? 0 : -350}`,
        },
        onComplete: () => {
          enableScroll();
          setVisibilityHeader(true);
        },
      });

      disableScroll();
      setCurrentitem(id);
      setCurrentitemZindex(id);
    },
    [content]
  );

  const backToHeader = useCallback(() => {
    TweenMax.to(window, {
      duration: 1,
      scrollTo: {
        y: `#${idInView}`,
        offsetY: `${getIndex(idInView, content) === 0 ? 0 : -350}`,
      },
      onComplete: () => {
        setCurrentitem(false);
        setVisibilityHeader(false);
        setTimeout(() => {
          setCurrentitemZindex(false);
        }, 1000);
        enableScroll();
      },
    });

    setCurrentitemZindex(idInView);
    setCurrentitem(idInView);
    disableScroll();
  }, [idInView, content]);

  const transDistance = (i, id) => {
    if (currentItem === id) {
      return 0;
    }
    return (100 / content.length) * i - (100 - 100 / content.length) / 2;
  };

  return (
    <Fragment>
      <button className={s.btnReturn} onClick={backToHeader}>
        <img className={s.imgBack} src={back} alt="back" role="presentation" />
      </button>
      <div
        className={classnames(s.header, {
          [s.isVisibility]: visibilityHeader,
        })}
      >
        <div className={s.wrapperBtn}>
          {content.map(element => (
            <Btn
              key={element.id}
              cbData={element.id}
              onClick={toggleClass}
              id={`#${element.id}`}
              className={s.click}
            />
          ))}
        </div>
        {content.map((el, i) => (
          <div
            key={el.id}
            className={classnames(s.imgWrapper, {
              [s.active]: el.id === currentItem && currentItem,
              [s.activeZindex]:
                el.id === currentItemZindex && currentItemZindex,
            })}
            style={{
              transform: `translateX(${transDistance(i, el.id)}%)`,
            }}
          >
            <div className={`${s.div} ${s.div1}`}>
              <div className={`${s.div} ${s.div2}`}>
                <div className={`${s.div} ${s.div3}`}>
                  <div className={`${s.div} ${s.div4}`}>
                    <Picture
                      src={el.mainImg.desktop}
                      srcSet={el.mainImg}
                      className={classnames(s.post, {
                        [s.active]: el.id === currentItem && currentItem,
                      })}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
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
