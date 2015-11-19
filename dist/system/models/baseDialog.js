System.register(['../dialog-controller'], function (_export) {
  'use strict';

  var DialogController, BaseDialog;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_dialogController) {
      DialogController = _dialogController.DialogController;
    }],
    execute: function () {
      BaseDialog = (function () {
        _createClass(BaseDialog, null, [{
          key: 'inject',
          value: [DialogController],
          enumerable: true
        }]);

        function BaseDialog(controller) {
          _classCallCheck(this, BaseDialog);

          this.controller = controller;
          controller.settings.lock = false;
        }

        BaseDialog.prototype.activate = function activate(model) {
          this.model = model;
        };

        return BaseDialog;
      })();

      _export('BaseDialog', BaseDialog);
    }
  };
});