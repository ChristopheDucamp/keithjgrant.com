import {removeNode} from '../util/dom';

export default function scrollRightTo(oldEl, newEl) {
  const width = document.documentElement.clientWidth;
  const tl = new TimelineLite({
    onComplete: () => {
      removeNode(oldEl);
    },
  });
  tl.set(oldEl, {position: 'absolute', left: 0, right: 0});
  tl.set(newEl, {position: 'relative'});
  tl.set(oldEl.parentNode, {minHeight: '100vh'});
  tl.addLabel('start');
  tl.to(oldEl, 1.5, {x: width * -1, ease: Power2.easeInOut}, 'start');
  tl.from(newEl, 1.5, {x: width, ease: Power2.easeInOut}, 'start');
  tl.set(newEl, {position: 'static'});
  tl.set(oldEl.parentNode, {minHeight: 'auto'});
  tl.to(oldEl, 0.2, {opacity: 0});
  tl.addLabel('ready');
  tl.play();
  return tl;
}
