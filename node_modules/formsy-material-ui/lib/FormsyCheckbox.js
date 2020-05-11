'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _formsyReact = require('formsy-react');

var _formsyReact2 = _interopRequireDefault(_formsyReact);

var _Checkbox = require('material-ui/Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var FormsyCheckbox = (0, _createReactClass2.default)({

  propTypes: {
    defaultChecked: _propTypes2.default.bool,
    name: _propTypes2.default.string.isRequired,
    onChange: _propTypes2.default.func,
    validationError: _propTypes2.default.string,
    validationErrors: _propTypes2.default.object,
    validations: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object])
  },

  mixins: [_formsyReact2.default.Mixin],

  componentDidMount: function componentDidMount() {
    this.setValue(this.muiComponent.isChecked());
  },
  handleChange: function handleChange(event, value) {
    this.setValue(value);
    if (this.props.onChange) this.props.onChange(event, value);
  },


  setMuiComponentAndMaybeFocus: _utils.setMuiComponentAndMaybeFocus,

  render: function render() {
    var _props = this.props,
        defaultChecked = _props.defaultChecked,
        validations = _props.validations,
        validationErrors = _props.validationErrors,
        validationError = _props.validationError,
        rest = _objectWithoutProperties(_props, ['defaultChecked', 'validations', 'validationErrors', 'validationError']);

    var value = this.getValue();

    if (typeof value === 'undefined') {
      value = typeof defaultChecked !== 'undefined' ? defaultChecked : false;
    }
    return _react2.default.createElement(_Checkbox2.default, _extends({
      disabled: this.isFormDisabled()
    }, rest, {
      checked: value,
      onCheck: this.handleChange,
      ref: this.setMuiComponentAndMaybeFocus
    }));
  }
});

exports.default = FormsyCheckbox;