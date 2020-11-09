import React, { Fragment, useCallback, useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';

import ResizeObserver from 'rc-resize-observer';
import { TweenMax } from 'gsap';

import Btn from 'components/Btn';
import InViewComp from 'components/InViewComp';
import ProgressLine from 'components/ProgressLine';
import Post from './Post';

import { disableScroll, enableScroll } from 'utils/eventScroll';
import { getIndex } from 'utils/getIndex';

import classnames from 'classnames';
import s from './Posts.scss';

const Posts = ({ content, elementIdInView }) => {
  const [activItem, setActivItem] = useState(0);
  const [contentWithOrder, setContentWithOrder] = useState([]);
  const [eventPointerDisable, setEventPointerDisable] = useState(false);
  const [updateHidden, setUpdateHidden] = useState(true);
  const [isEnable, setIsEnamble] = useState(true);

  const handleChangItem = useCallback((position, inView) => {
    if (inView) {
      setActivItem(position);
    }
  }, []);

  const handleUpdateHidden = useCallback(value => {
    setUpdateHidden(value);
  }, []);

  const getIdInView = useCallback(
    value => {
      elementIdInView(value);
    },
    [elementIdInView]
  );
  const scrollToAnchor = useCallback(
    anchor => {
      const proxyElements = [...contentWithOrder];
      const newContent = contentWithOrder.map((el, i) => {
        if (anchor === el.id) {
          return {
            ...el,
            order: activItem * 10 + (i < activItem ? -5 : 5),
          };
        }
        return el;
      });

      setContentWithOrder(newContent);
      setEventPointerDisable(true);
      disableScroll();
      setIsEnamble(false);

      TweenMax.to(window, {
        duration: 0.9,
        scrollTo: {
          y: `#${anchor}`,
          offsetY: `${getIndex(anchor, content) === 0 ? 0 : -350}`,
        },
        onComplete: () => {
          setContentWithOrder(proxyElements);
          setEventPointerDisable(false);

          TweenMax.set(window, {
            scrollTo: {
              y: `#${anchor}`,
              offsetY: `${getIndex(anchor, content) === 0 ? 0 : -350}`,
            },
            onComplete: () => {
              setTimeout(() => {
                enableScroll();
                setIsEnamble(true);
              }, 60);
            },
          });
        },
      });
    },
    [contentWithOrder, activItem, content]
  );

  useEffect(() => {
    const newContent = content.map((el, i) => {
      return { ...el, order: i * 10 };
    });
    setContentWithOrder(newContent);
  }, [content]);

  const handleResize = useCallback(() => {
    window.ScrollTrigger.refresh();
  }, []);

  return (
    <Fragment>
      <div
        className={classnames(s.wrapBtn, {
          [s.isDisable]: eventPointerDisable,
          [s.isOpacity]: !updateHidden,
        })}
      >
        <ProgressLine />
        {contentWithOrder.map((element, index) => (
          <div className={s.wrapAnchor} key={element.id}>
            <Btn
              className={classnames(s.anchor, {
                [s.isCurrent]: activItem === index,
              })}
              cbData={element.id}
              onClick={scrollToAnchor}
            />
          </div>
        ))}
      </div>
      <ResizeObserver onResize={handleResize}>
        <div className={s.postsWrapper}>
          {contentWithOrder.map((element, i) => (
            <InViewComp
              as="div"
              onChange={handleChangItem}
              id={element.id}
              cbData={i}
              threshold={[0.1, 0.2]}
              style={{ order: element.order }}
              key={element.id}
            >
              <Post
                updateHidden={handleUpdateHidden}
                getIdInView={getIdInView}
                element={element}
                isEnable={isEnable}
                i={i}
              />
            </InViewComp>
          ))}
        </div>
      </ResizeObserver>
    </Fragment>
  );
};
Posts.propTypes = {
  elementIdInView: PropTypes.func,
  content: PropTypes.arrayOf(
    PropTypes.shape({
      mainImg: PropTypes.shape({
        desktop: PropTypes.string,
        tablet: PropTypes.string,
        mobile: PropTypes.string,
      }),
      alt: PropTypes.string,
      id: PropTypes.string.isRequred,
      title: PropTypes.string.isRequred,
      textTitle: PropTypes.string.isRequred,
      postContent: PropTypes.arrayOf(
        PropTypes.shape({
          contentImg: PropTypes.shape({
            desktop: PropTypes.string,
            tablet: PropTypes.string,
            mobile: PropTypes.string,
          }),
          alt: PropTypes.string,
          id: PropTypes.string.isRequred,
          title: PropTypes.string.isRequred,
          textTitle: PropTypes.string.isRequred,
        })
      ),
    })
  ),
};
Posts.defaultProps = {
  elementIdInView: null,
  content: PropTypes.arrayOf(
    PropTypes.shape({
      mainImg: PropTypes.shape({
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
    })
  ),
};
export default React.memo(Posts);
