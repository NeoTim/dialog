System.register(['aurelia-metadata', 'aurelia-dependency-injection', 'aurelia-templating', './dialog-controller', './dialog-renderer', './lifecycle', './models/alert'], function (_export) {
  'use strict';

  var Origin, Container, CompositionEngine, DialogController, DialogRenderer, invokeLifecycle, Alert, DialogService;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_aureliaMetadata) {
      Origin = _aureliaMetadata.Origin;
    }, function (_aureliaDependencyInjection) {
      Container = _aureliaDependencyInjection.Container;
    }, function (_aureliaTemplating) {
      CompositionEngine = _aureliaTemplating.CompositionEngine;
    }, function (_dialogController) {
      DialogController = _dialogController.DialogController;
    }, function (_dialogRenderer) {
      DialogRenderer = _dialogRenderer.DialogRenderer;
    }, function (_lifecycle) {
      invokeLifecycle = _lifecycle.invokeLifecycle;
    }, function (_modelsAlert) {
      Alert = _modelsAlert.Alert;
    }],
    execute: function () {
      DialogService = (function () {
        _createClass(DialogService, null, [{
          key: 'inject',
          value: [Container, CompositionEngine, DialogRenderer],
          enumerable: true
        }]);

        function DialogService(container, compositionEngine, renderer) {
          _classCallCheck(this, DialogService);

          this.container = container;
          this.compositionEngine = compositionEngine;
          this.renderer = renderer;
        }

        DialogService.prototype._getViewModel = function _getViewModel(instruction) {
          if (typeof instruction.viewModel === 'function') {
            instruction.viewModel = Origin.get(instruction.viewModel).moduleId;
          }

          if (typeof instruction.viewModel === 'string') {
            return this.compositionEngine.ensureViewModel(instruction);
          }

          return Promise.resolve(instruction);
        };

        DialogService.prototype.createViewModel = function createViewModel(Controller, settings, instruction) {
          var _this = this;

          var controller;
          return new Promise(function (resolve, reject) {
            controller = new Controller(_this.renderer, settings, resolve, reject);
            instruction.childContainer.registerInstance(Controller, controller);

            return _this._getViewModel(instruction).then(function (returnedInstruction) {
              return _this.renderer.activateLifecycle(controller, returnedInstruction, instruction.model, resolve);
            });
          });
        };

        DialogService.prototype.open = function open(_settings) {
          var viewModel = _settings.viewModel;
          var model = _settings.model;
          var container = this.container;
          var settings = Object.assign({}, this.defaultSettings, _settings, this.config);
          var instruction = {
            viewModel: _settings.viewModel,
            container: this.container,
            childContainer: this.container.createChild(),
            model: _settings.model
          };
          return this.createViewModel(DialogController, settings, instruction);
        };

        DialogService.prototype.alert = function alert(_settings) {
          return this.open({
            viewModel: Alert,
            model: _settings
          });
        };

        DialogService.prototype.close = function close() {};

        return DialogService;
      })();

      _export('DialogService', DialogService);
    }
  };
});