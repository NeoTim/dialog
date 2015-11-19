define(['exports', './lifecycle', './util'], function (exports, _lifecycle, _util) {
  'use strict';

  exports.__esModule = true;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  var GLOBAL_ACTIVE_CLASS = 'ai-dialog-active';
  var ELEMENT_ACTIVE_CLASS = 'active';

  var DialogController = (function () {
    function DialogController(renderer, settings, resolve, reject) {
      _classCallCheck(this, DialogController);

      this._renderer = renderer;
      this.settings = settings;
      this._resolve = resolve;
      this._reject = reject;
    }

    DialogController.prototype.ok = function ok(result) {
      this.close(true, result);
    };

    DialogController.prototype.cancel = function cancel(result) {
      this.close(false, result);
    };

    DialogController.prototype.error = function error(message) {
      return this._renderer.deactivateLifecycle(this, message);
    };

    DialogController.prototype.close = function close(ok, result) {
      var returnResult = new DialogResult(!ok, result);
      return this._renderer.deactivateLifecycle(this, returnResult);
    };

    DialogController.prototype.showDialog = function showDialog() {
      return this.handleAnimations(true);
    };

    DialogController.prototype.hideDialog = function hideDialog() {
      return this.handleAnimations(false);
    };

    DialogController.prototype.handleAnimations = function handleAnimations(value) {
      var toggle = value ? 'add' : 'remove';
      var element = this.element;
      return _util.handleEventListeners(element, 'animationend', trigger);

      function trigger() {
        element.classList[toggle](ELEMENT_ACTIVE_CLASS);
        document.body.classList[toggle](GLOBAL_ACTIVE_CLASS);
      }
    };

    return DialogController;
  })();

  exports.DialogController = DialogController;

  var DialogResult = function DialogResult(cancelled, result) {
    _classCallCheck(this, DialogResult);

    this.wasCancelled = false;

    this.wasCancelled = cancelled;
    this.output = result;
  };
});