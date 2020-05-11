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

var _Toggle = require('material-ui/Toggle');

var _Toggle2 = _interopRequireDefault(_Toggle);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var FormsyToggle = (0, _createReactClass2.default)({

  propTypes: {
    defaultToggled: _propTypes2.default.bool,
    name: _propTypes2.default.string.isRequired,
    onChange: _propTypes2.default.func,
    validationError: _propTypes2.default.string,
    validationErrors: _propTypes2.default.object,
    validations: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object])
  },

  mixins: [_formsyReact2.default.Mixin],

  componentDidMount: function componentDidMount() {
    this.setValue(this.muiComponent.isToggled());
  },
  handleChange: function handleChange(event, value) {
    this.setValue(value);
    if (this.props.onChange) this.props.onChange(event, value);
  },


  setMuiComponentAndMaybeFocus: _utils.setMuiComponentAndMaybeFocus,

  render: function render() {
    var _props = this.props,
        defaultToggled = _props.defaultToggled,
        validations = _props.validations,
        validationError = _props.validationError,
        validationErrors = _props.validationErrors,
        rest = _objectWithoutProperties(_props, ['defaultToggled', 'validations', 'validationError', 'validationErrors']);

    var value = this.getValue();

    if (typeof value === 'undefined') {
      value = typeof defaultToggled !== 'undefined' ? defaultToggled : false;
    }

    return _react2.default.createElement(_Toggle2.default, _extends({
      disabled: this.isFormDisabled()
    }, rest, {
      onToggle: this.handleChange,
      ref: this.setMuiComponentAndMaybeFocus,
      toggled: value
    }));
  }
});

exports.default = FormsyToggle;