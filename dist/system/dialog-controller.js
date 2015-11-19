System.register(['./lifecycle', './util'], function (_export) {
  'use strict';

  var invokeLifecycle, handleEventListeners, GLOBAL_ACTIVE_CLASS, ELEMENT_ACTIVE_CLASS, DialogController, DialogResult;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_lifecycle) {
      invokeLifecycle = _lifecycle.invokeLifecycle;
    }, function (_util) {
      handleEventListeners = _util.handleEventListeners;
    }],
    execute: function () {
      GLOBAL_ACTIVE_CLASS = 'ai-dialog-active';
      ELEMENT_ACTIVE_CLASS = 'active';

      DialogController = (function () {
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
          return handleEventListeners(element, 'animationend', trigger);

          function trigger() {
            element.classList[toggle](ELEMENT_ACTIVE_CLASS);
            document.body.classList[toggle](GLOBAL_ACTIVE_CLASS);
          }
        };

        return DialogController;
      })();

      _export('DialogController', DialogController);

      DialogResult = function DialogResult(cancelled, result) {
        _classCallCheck(this, DialogResult);

        this.wasCancelled = false;

        this.wasCancelled = cancelled;
        this.output = result;
      };
    }
  };
});