'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _formsyReact = require('formsy-react');

var _formsyReact2 = _interopRequireDefault(_formsyReact);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FormsyRadio = (0, _createReactClass2.default)({

  mixins: [_formsyReact2.default.Mixin],

  // Material-UI replaces any component inside RadioButtonGroup with RadioButton, so no need to render it here
  render: function render() {}
});

exports.default = FormsyRadio;