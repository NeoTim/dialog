'use strict';

exports.__esModule = true;
exports.handleEventListeners = handleEventListeners;

var transitionEvent = (function () {
  var t = undefined;
  var el = document.createElement('fakeelement');

  var transitions = {
    'transition': 'transitionend',
    'OTransition': 'oTransitionEnd',
    'MozTransition': 'transitionend',
    'WebkitTransition': 'webkitTransitionEnd'
  };

  for (t in transitions) {
    if (el.style[t] !== undefined) {
      return transitions[t];
    }
  }
})();

function handleEventListeners(element, eventName, trigger, validate) {
  return new Promise(function (resolve) {
    element.addEventListener(eventName, _handler, true);
    trigger && trigger();

    function _handler($event) {
      if (validate && validate(event)) return done();
      return done($event);
    }

    function done($event) {
      element.removeEventListener(eventName, _handler, true);
      resolve($event);
    }
  });
}