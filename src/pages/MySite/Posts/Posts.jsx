import React, { Fragment, useCallback, useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import classnames from 'classnames';

import { gsap, TweenMax } from 'gsap';

import Btn from 'components/Btn';
import InViewComp from 'components/InViewComp';
import Post from './Post';

import s from './Posts.scss';

const Posts = ({ content }) => {
  const [activItem, setActivItem] = useState(0);
  const [contentWithOrder, setContentWithOrder] = useState([]);
  const [eventPointerDisable, setEventPointerDisable] = useState(false);
  const [update, setUpdate] = useState(false);

  const handleChangItem = useCallback((position, inView) => {
    if (inView) {
      setActivItem(position);
    }
  }, []);

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

  const updateData = useCallback(value => {
    setUpdate(value);
  }, []);

  useEffect(() => {
    const newContent = content.map((el, i) => {
      return { ...el, order: i * 10 };
    });
    setContentWithOrder(newContent);
  }, [content]);

  useEffect(() => {
    gsap.from('#progressLine', {
      scrollTrigger: {
        trigger: '#triggerProgressLine',
        scrub: true,
        start: 'top center',
        end: 'bottom bottom',
      },
      scaleY: 0,
      transformOrigin: 'top center',
      ease: 'none',
    });
  }, []);

  return (
    <Fragment>
      <div
        className={classnames(s.wrapBtn, {
          [s.isDisable]: eventPointerDisable,
          [s.isOpacity]: update === false,
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
      <div className={s.postsWrapper} id="triggerProgressLine">
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
            <Post updateData={updateData} element={element} />
          </InViewComp>
        ))}
      </div>
    </Fragment>
  );
};

Posts.propTypes = {
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
