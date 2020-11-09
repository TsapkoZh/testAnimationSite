import React, { useEffect, useState, useCallback, Fragment } from 'react';
import { PropTypes } from 'prop-types';

import { TweenMax } from 'gsap';

import Btn from 'components/Btn';
import Picture from 'components/Picture';
import { disableScroll, enableScroll } from 'utils/eventScroll';
import { getIndex } from 'utils/getIndex';
import useBrowser from 'hooks/useBrowser';

import back from 'images/back.svg';

import s from './Header.scss';
import classnames from 'classnames';

const Header = ({ content, idInView }) => {
  const [currentItem, setCurrentitem] = useState(false);
  const [currentItemZindex, setCurrentitemZindex] = useState(false);
  const [visibilityHeader, setVisibilityHeader] = useState(false);
  const [isMobile, setMobile] = useState(false);
  const [isEnableBtn, setEnableBtn] = useState(true);
  const [onEnter, setEnter] = useState('');
  console.log(onEnter, 'onEnter');

  const {
    platform: { type },
  } = useBrowser();

  useEffect(() => {
    const handleResize = () => {
      setMobile(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  let transformVector = 'X';
  if (type !== 'desktop' || isMobile) {
    transformVector = 'Y';
  } else {
    transformVector = 'X';
  }

  const toggleClass = useCallback(
    id => {
      if (!isEnableBtn) {
        return;
      }

      setEnableBtn(false);
      disableScroll();
      setCurrentitem(id);
      setCurrentitemZindex(id);

      TweenMax.to(window, {
        duration: 1,
        scrollTo: {
          y: `#${id}`,
          offsetY: `${getIndex(id, content) === 0 ? 0 : -350}`,
        },
        onComplete: () => {
          enableScroll();
          setVisibilityHeader(true);
          setEnableBtn(true);
        },
      });
    },
    [content, isEnableBtn]
  );

  const backToHeader = useCallback(() => {
    setCurrentitemZindex(idInView);
    setCurrentitem(idInView);
    disableScroll();
    setEnableBtn(false);

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
        setEnableBtn(true);
      },
    });
  }, [idInView, content]);

  const transDistance = (i, id) => {
    if (currentItem === id) {
      return 0;
    }
    return (100 / content.length) * i - (100 - 100 / content.length) / 2;
  };

  const handleMouseEnter = event => {
    setEnter(`img${JSON.parse(event.target.dataset.info)}`);
  };

  return (
    <Fragment>
      <Btn onClick={backToHeader} className={s.btnReturn}>
        <img className={s.imgBack} src={back} alt="back" role="presentation" />
      </Btn>
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
              className={s.btn}
            >
              <div
                onMouseEnter={handleMouseEnter}
                data-info={JSON.stringify(element.id)}
                style={{ width: '100%', height: '100%' }}
              />
            </Btn>
          ))}
        </div>
        {content.map((el, i) => (
          <div
            key={el.id}
            className={classnames(s.imgWrapper, {
              [s.activeZindex]: el.id === currentItemZindex,
            })}
            style={{
              transform: `translate${transformVector}(${transDistance(
                i,
                el.id
              )}%)`,
            }}
          >
            <div
              className={s.div}
              style={{
                transform: `translate${transformVector}(${transDistance(
                  content.length - 1,
                  el.id
                )}%)`,
              }}
            >
              <div
                className={s.div}
                style={{
                  transform: `translate${transformVector}(-${transDistance(
                    content.length - 1,
                    el.id
                  )}%)`,
                }}
              >
                <div
                  className={s.div}
                  style={{
                    transform: `translate${transformVector}(-${transDistance(
                      content.length - 1,
                      el.id
                    )}%)`,
                  }}
                >
                  <div
                    className={s.div}
                    style={{
                      transform: `translate${transformVector}(${transDistance(
                        content.length - 1,
                        el.id
                      )}%)`,
                    }}
                  >
                    <Picture
                      src={el.mainImg.desktop}
                      srcSet={el.mainImg}
                      className={classnames(s.post, {
                        [s.postHover]:
                          `img${el.id}` === onEnter && !currentItem,
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
