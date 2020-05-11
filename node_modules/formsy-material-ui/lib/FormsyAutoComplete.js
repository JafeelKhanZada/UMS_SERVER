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

var _keycode = require('keycode');

var _keycode2 = _interopRequireDefault(_keycode);

var _formsyReact = require('formsy-react');

var _formsyReact2 = _interopRequireDefault(_formsyReact);

var _AutoComplete = require('material-ui/AutoComplete');

var _AutoComplete2 = _interopRequireDefault(_AutoComplete);

var _utils = require('formsy-react/src/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var FormsyAutoComplete = (0, _createReactClass2.default)({

  propTypes: {
    defaultValue: _propTypes2.default.any,
    name: _propTypes2.default.string.isRequired,
    onBlur: _propTypes2.default.func,
    onChange: _propTypes2.default.func,
    onFocus: _propTypes2.default.func,
    onKeyDown: _propTypes2.default.func,
    validationError: _propTypes2.default.string,
    validationErrors: _propTypes2.default.object,
    validations: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),
    value: _propTypes2.default.any
  },

  mixins: [_formsyReact2.default.Mixin],

  getInitialState: function getInitialState() {
    return {
      value: this.props.defaultValue || this.props.value || ''
    };
  },
  componentWillMount: function componentWillMount() {
    this.setValue(this.props.defaultValue || this.props.value || '');
  },


  handleBlur: function handleBlur(event) {
    this.setValue(event.currentTarget.value);
    if (this.props.onBlur) this.props.onBlur(event);
  },

  handleChange: function handleChange(event) {
    this.setState({
      value: event.currentTarget.value
    });
    if (this.props.onChange) this.props.onChange(event);
  },

  handleUpdateInput: function handleUpdateInput(value) {
    this.setState({
      value: value
    });
    if (this.props.onChange) this.props.onChange(null, value);
  },

  handleKeyDown: function handleKeyDown(event) {
    if ((0, _keycode2.default)(event) === 'enter') this.setValue(event.currentTarget.value);
    if (this.props.onKeyDown) this.props.onKeyDown(event, event.currentTarget.value);
  },

  setMuiComponentAndMaybeFocus: _utils.setMuiComponentAndMaybeFocus,

  render: function render() {
    var _props = this.props,
        defaultValue = _props.defaultValue,
        onFocus = _props.onFocus,
        value = _props.value,
        validations = _props.validations,
        validationError = _props.validationError,
        validationErrors = _props.validationErrors,
        rest = _objectWithoutProperties(_props, ['defaultValue', 'onFocus', 'value', 'validations', 'validationError', 'validationErrors']);

    return _react2.default.createElement(_AutoComplete2.default, _extends({
      disabled: this.isFormDisabled()
    }, rest, {
      errorText: this.getErrorMessage(),
      onBlur: this.handleBlur,
      onChange: this.handleChange,
      onUpdateInput: this.handleUpdateInput,
      onFocus: onFocus,
      onKeyDown: this.handleKeyDown,
      ref: this.setMuiComponentAndMaybeFocus,
      value: this.state.value
    }));
  }
});

exports.default = FormsyAutoComplete;