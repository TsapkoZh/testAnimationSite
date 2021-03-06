/* eslint-disable */

let supportsPassive = false;

const keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

const preventDefault = e => {
  e.preventDefault();
};

const preventDefaultForScrollKeys = e => {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }

  return preventDefaultForScrollKeys;
};

try {
  window.addEventListener(
    'test',
    null,
    Object.defineProperty({}, 'passive', {
      get: function() {
        supportsPassive = true;
      },
    })
  );
} catch (e) {}

const wheelOpt = supportsPassive ? { passive: false } : false;

export const disableScroll = () => {
  window.addEventListener('DOMMouseScroll', preventDefault, false);
  window.addEventListener('wheel', preventDefault, wheelOpt);
  window.addEventListener('mousewheel', preventDefault, wheelOpt);
  window.addEventListener('touchmove', preventDefault, wheelOpt);
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
};
export const enableScroll = () => {
  window.removeEventListener('DOMMouseScroll', preventDefault, false);
  window.removeEventListener('wheel', preventDefault, wheelOpt);
  window.removeEventListener('mousewheel', preventDefault, wheelOpt);
  window.removeEventListener('touchmove', preventDefault, wheelOpt);
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
};
