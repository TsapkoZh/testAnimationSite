import React, { Fragment, useCallback, useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import classnames from 'classnames';

import { TweenMax } from 'gsap';

import Btn from 'components/Btn';
import InViewComp from 'components/InViewComp';
import Header from './Header';
import Post from './Post';

import s from './Navigation.scss';

const Navigation = ({ content }) => {
  const [activItem, setActivItem] = useState(0);
  const [contentWithOrder, setContentWithOrder] = useState([]);
  const [eventPointerDisable, setEventPointerDisable] = useState(false);
  const [update, setUpdate] = useState(false);

  const handleChangItem = useCallback((position, inView) => {
    if (inView) {
      setActivItem(position);
    }
  });

  const scrollToAnchor = useCallback(anchor => {
    const proxyElements = contentWithOrder;
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
  });

  const updateData = useCallback(value => {
    setUpdate(value);
    console.log(update, 'update');
  });

  useEffect(() => {
    const newContent = content.map((el, i) => {
      return { ...el, order: i * 10 };
    });
    setContentWithOrder(newContent);
  }, []);

  return (
    <Fragment>
      <Header content={contentWithOrder} />
      <div
        className={classnames(s.wrapBtn, {
          [s.isDisable]: eventPointerDisable,
          [s.isOpacity]: update === false,
        })}
      >
        {contentWithOrder.map((element, index) => (
          <Btn
            className={s.anchor}
            key={element.id}
            cbData={element.id}
            onClick={scrollToAnchor}
          >
            <div
              className={classnames(s.anchorCurrent, {
                [s.isCurrent]: activItem === index,
              })}
            />
          </Btn>
        ))}
      </div>
      <div className={s.postsWrapper}>
        {contentWithOrder.map((element, i) => (
          <InViewComp
            as="div"
            onChange={handleChangItem}
            id={element.id}
            key={element.id}
            cbData={i}
            style={{ order: element.order }}
          >
            <Post updateData={updateData} element={element} />
          </InViewComp>
        ))}
      </div>
    </Fragment>
  );
};

Navigation.propTypes = {
  content: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequred,
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

Navigation.defaultProps = {
  content: PropTypes.arrayOf(
    PropTypes.shape({
      src: null,
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

export default React.memo(Navigation);
