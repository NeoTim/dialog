'use strict';

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _dialogController = require('../dialog-controller');

var _baseDialog = require('./baseDialog');

var Alert = (function (_BaseDialog) {
  _inherits(Alert, _BaseDialog);

  _createClass(Alert, null, [{
    key: 'inject',
    value: [_dialogController.DialogController],
    enumerable: true
  }]);

  function Alert(controller) {
    _classCallCheck(this, Alert);

    _BaseDialog.call(this, controller);
  }

  return Alert;
})(_baseDialog.BaseDialog);

exports.Alert = Alert;