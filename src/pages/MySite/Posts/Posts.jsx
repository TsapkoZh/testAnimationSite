import React, { Fragment, useCallback, useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';

import classnames from 'classnames';
import ResizeObserver from 'rc-resize-observer';
import { gsap, TweenMax } from 'gsap';

import Btn from 'components/Btn';
import InViewComp from 'components/InViewComp';
import Post from './Post';

import s from './Posts.scss';

const Posts = ({ content, elementIdInView }) => {
  const [activItem, setActivItem] = useState(0);
  const [contentWithOrder, setContentWithOrder] = useState([]);
  const [eventPointerDisable, setEventPointerDisable] = useState(false);
  const [updateHidden, setUpdateHidden] = useState(false);
  const [idInView, setIdInView] = useState('');

  const handleChangItem = useCallback((position, inView) => {
    if (inView) {
      setActivItem(position);
    }
  }, []);

  const handleUpdateHidden = useCallback(value => {
    setUpdateHidden(value);
  }, []);

  const isId = useCallback(value => {
    setIdInView(value);
  }, []);

  const backToHeader = () => {
    TweenMax.to(window, {
      duration: 1,
      scrollTo: `#${idInView}`,
    });

    elementIdInView(idInView);
    setUpdateHidden(false);
  };

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

      TweenMax.to(window, {
        duration: 1,
        scrollTo: `#${anchor}`,
        onComplete: () => {
          setContentWithOrder(proxyElements);
          setEventPointerDisable(false);

          TweenMax.set(window, {
            scrollTo: `#${anchor}`,
          });
        },
      });
    },
    [contentWithOrder, activItem]
  );

  useEffect(() => {
    const newContent = content.map((el, i) => {
      return { ...el, order: i * 10 };
    });
    setContentWithOrder(newContent);
  }, [content]);

  // progress line scrollbar
  // ==================================
  useEffect(() => {
    gsap.from('#progressLine', {
      scrollTrigger: {
        trigger: 'body',
        scrub: true,
        start: 'top center',
        end: 'bottom bottom',
      },
      scaleY: 0,
      transformOrigin: 'top center',
      ease: 'none',
    });
  }, []);

  const handleResize = useCallback(() => {
    ScrollTrigger.refresh();
  }, []);

  return (
    <Fragment>
      <button className={s.btnReturn} onClick={backToHeader}>
        back
      </button>
      <div
        className={classnames(s.wrapBtn, {
          [s.isDisable]: eventPointerDisable,
          [s.isOpacity]: updateHidden === false,
        })}
      >
        <div className={s.progressLine} id="progressLine" />

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
              idInView={isId}
              element={element}
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
