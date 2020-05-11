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

var _TimePicker = require('material-ui/TimePicker');

var _TimePicker2 = _interopRequireDefault(_TimePicker);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var FormsyTime = (0, _createReactClass2.default)({

  propTypes: {
    defaultTime: _propTypes2.default.object,
    name: _propTypes2.default.string.isRequired,
    onChange: _propTypes2.default.func,
    validationError: _propTypes2.default.string,
    validationErrors: _propTypes2.default.object,
    validations: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),
    value: _propTypes2.default.object
  },

  mixins: [_formsyReact2.default.Mixin],

  componentDidMount: function componentDidMount() {
    var defaultTime = this.props.defaultTime;

    var value = this.getValue();

    if (typeof value === 'undefined' && typeof defaultTime !== 'undefined') {
      this.setValue(defaultTime);
    }
  },
  componentWillReceiveProps: function componentWillReceiveProps(newProps) {
    if (newProps.value) {
      if (!this.props.value || !timesEq(this.props.value, newProps.value)) {
        this.setValue(newProps.value);
      }
    } else if (!this.props.value && newProps.defaultTime) {
      if (!timesEq(this.props.defaultTime, newProps.defaultTime)) {
        this.setValue(newProps.defaultTime);
      }
    }

    /**
     * Check time equality by hours and minutes
     * @param {Date} date1
     * @param {Date} date2
     */
    function timesEq(date1, date2) {
      return date1.getHours() === date2.getHours() && date1.getMinutes() === date2.getMinutes();
    }
  },
  handleChange: function handleChange(event, value) {
    this.setValue(value);
    if (this.props.onChange) this.props.onChange(event, value);
  },


  setMuiComponentAndMaybeFocus: _utils.setMuiComponentAndMaybeFocus,

  render: function render() {
    var _props = this.props,
        defaultTime = _props.defaultTime,
        validations = _props.validations,
        validationError = _props.validationError,
        validationErrors = _props.validationErrors,
        rest = _objectWithoutProperties(_props, ['defaultTime', 'validations', 'validationError', 'validationErrors']);

    return _react2.default.createElement(_TimePicker2.default, _extends({
      disabled: this.isFormDisabled()
    }, rest, {
      errorText: this.getErrorMessage(),
      onChange: this.handleChange,
      ref: this.setMuiComponentAndMaybeFocus,
      value: this.getValue()
    }));
  }
});

exports.default = FormsyTime;