'use strict';

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _aureliaMetadata = require('aurelia-metadata');

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _aureliaTemplating = require('aurelia-templating');

var _dialogController = require('./dialog-controller');

var _dialogRenderer = require('./dialog-renderer');

var _lifecycle = require('./lifecycle');

var _modelsAlert = require('./models/alert');

var DialogService = (function () {
  _createClass(DialogService, null, [{
    key: 'inject',
    value: [_aureliaDependencyInjection.Container, _aureliaTemplating.CompositionEngine, _dialogRenderer.DialogRenderer],
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
      instruction.viewModel = _aureliaMetadata.Origin.get(instruction.viewModel).moduleId;
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
    return this.createViewModel(_dialogController.DialogController, settings, instruction);
  };

  DialogService.prototype.alert = function alert(_settings) {
    return this.open({
      viewModel: _modelsAlert.Alert,
      model: _settings
    });
  };

  DialogService.prototype.close = function close() {};

  return DialogService;
})();

exports.DialogService = DialogService;