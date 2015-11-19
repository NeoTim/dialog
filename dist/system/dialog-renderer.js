System.register(['aurelia-templating', './lifecycle', 'aurelia-metadata', './util'], function (_export) {
  'use strict';

  var ViewSlot, CompositionEngine, invokeLifecycle, Origin, handleEventListeners, OVERLAY_SETTINGS, globalSettings, DialogRenderer;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function getNextZIndex() {
    return ++globalSettings.currentZIndex;
  }

  return {
    setters: [function (_aureliaTemplating) {
      ViewSlot = _aureliaTemplating.ViewSlot;
      CompositionEngine = _aureliaTemplating.CompositionEngine;
    }, function (_lifecycle) {
      invokeLifecycle = _lifecycle.invokeLifecycle;
    }, function (_aureliaMetadata) {
      Origin = _aureliaMetadata.Origin;
    }, function (_util) {
      handleEventListeners = _util.handleEventListeners;
    }],
    execute: function () {
      OVERLAY_SETTINGS = {
        tagName: 'ai-dialog-overlay',
        activeClass: 'active'
      };
      globalSettings = {
        lock: true,
        centerHorizontalOnly: false,
        currentZIndex: 5000,
        overlay: OVERLAY_SETTINGS
      };

      _export('globalSettings', globalSettings);

      DialogRenderer = (function () {
        _createClass(DialogRenderer, null, [{
          key: 'inject',
          value: [CompositionEngine],
          enumerable: true
        }]);

        function DialogRenderer(compositionEngine) {
          _classCallCheck(this, DialogRenderer);

          this.fragment = document.createDocumentFragment();
          this.overlay = document.createElement(OVERLAY_SETTINGS.tagName);
          this.defaultSettings = globalSettings;
          this.dialogControllers = [];

          this.compositionEngine = compositionEngine;
          this._eventHandler = this._eventHandler.bind(this);

          this.overlay.style.zIndex = getNextZIndex();
        }

        DialogRenderer.prototype.getOverlay = function getOverlay() {
          if (!this.overlay && this.dialogControllers.length) {
            this.overlay = document.createElement(OVERLAY_SETTINGS.tagName);
            document.body.appendChild(this.overlay);
          }
          return this.overlay;
        };

        DialogRenderer.prototype._eventHandler = function _eventHandler(e) {
          if (e.type === 'keyup' && e.keyCode === 27) {
            this.cancelTop();
          } else if (e.type === 'click' || e.type === 'touchstart') {
            this.cancelTop();
          }
        };

        DialogRenderer.prototype.bindEventListeners = function bindEventListeners() {
          if (this.isListening) return;
          var overlay = this.getOverlay();

          document.addEventListener('keyup', this._eventHandler);
          this.isListening = true;
        };

        DialogRenderer.prototype.unbindEventListeners = function unbindEventListeners() {
          if (this.dialogControllers.length) return;
          if (!this.isListening) return;
          var overlay = this.getOverlay();

          document.removeEventListener('keyup', this._eventHandler);
          this.isListening = false;
        };

        DialogRenderer.prototype.cancelTop = function cancelTop() {
          var top = this.dialogControllers[this.dialogControllers.length - 1];
          if (top && top.settings.lock !== true) {
            top.cancel();
          }
        };

        DialogRenderer.prototype.showOverlay = function showOverlay() {
          if (!this.overlayAttached) this.overlayAttached = true;
          this.overlay.classList.add(OVERLAY_SETTINGS.activeClass);
        };

        DialogRenderer.prototype.hideOverlay = function hideOverlay() {
          var _this = this;

          if (this.dialogControllers.length) {
            return;
          }
          return handleEventListeners(this.overlay, 'transitionend', function () {
            _this.overlay.classList.remove(OVERLAY_SETTINGS.activeClass);
          }).then(function () {
            return _this.overlayAttached = false;
          });
        };

        DialogRenderer.prototype.activateLifecycle = function activateLifecycle(dialogController, instruction, model, resolve) {
          var _this2 = this;

          dialogController.viewModel = instruction.viewModel;
          return invokeLifecycle(dialogController.viewModel, 'canActivate', model).then(function (canActivate) {
            if (canActivate) {
              return invokeLifecycle(dialogController.viewModel, 'activate').then(function () {
                return _this2.createController(dialogController, instruction);
              }).then(function () {
                return _this2.createHost(_this2, dialogController);
              }).then(function () {
                return _this2.showDialog(dialogController);
              });
            }
          });
        };

        DialogRenderer.prototype.deactivateLifecycle = function deactivateLifecycle(dialogController, returnResult) {
          var _this3 = this;

          return invokeLifecycle(dialogController.viewModel, 'canDeactivate').then(function (canDeactivate) {
            if (canDeactivate) {
              return invokeLifecycle(dialogController.viewModel, 'deactivate').then(function () {
                return _this3.hideDialog(dialogController);
              }).then(function () {
                return _this3.destroyHost(dialogController);
              }).then(function () {
                return _this3.destroyController(dialogController, returnResult);
              });
            }
          });
        };

        DialogRenderer.prototype.createController = function createController(dialogController, instruction) {
          return this.compositionEngine.createController(instruction).then(function (controller) {
            dialogController.controller = controller;
            dialogController.view = controller.view;
            controller.automate();
            return dialogController;
          });
        };

        DialogRenderer.prototype.destroyController = function destroyController(dialogController, returnResult) {
          dialogController.controller.unbind();
          dialogController._resolve(returnResult);
          return Promise.resolve(dialogController);
        };

        DialogRenderer.prototype.createHost = function createHost(service, dialogController) {
          var element = document.createElement('ai-dialog-container');
          element.style.zIndex = getNextZIndex();
          document.body.appendChild(element);

          dialogController.slot = new ViewSlot(element, true);
          dialogController.slot.add(dialogController.view);
          dialogController.element = element;
          return Promise.resolve(dialogController);
        };

        DialogRenderer.prototype.destroyHost = function destroyHost(dialogController) {
          dialogController.element.remove();
          dialogController.slot.detached();
          return Promise.resolve(dialogController);
        };

        DialogRenderer.prototype.showDialog = function showDialog(dialogController) {
          this.showOverlay();
          this.bindEventListeners();
          this.dialogControllers.push(dialogController);
          dialogController.slot.attached();
          return dialogController.showDialog();
        };

        DialogRenderer.prototype.hideDialog = function hideDialog(dialogController) {
          var i = this.dialogControllers.indexOf(dialogController);
          if (i !== -1) {
            this.dialogControllers.splice(i, 1);
          }
          dialogController.hideDialog();
          this.hideOverlay();
          this.unbindEventListeners();
          return dialogController;
        };

        return DialogRenderer;
      })();

      _export('DialogRenderer', DialogRenderer);
    }
  };
});