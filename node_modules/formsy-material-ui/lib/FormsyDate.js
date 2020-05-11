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

var _DatePicker = require('material-ui/DatePicker');

var _DatePicker2 = _interopRequireDefault(_DatePicker);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var FormsyDate = (0, _createReactClass2.default)({

  propTypes: {
    defaultDate: _propTypes2.default.object,
    name: _propTypes2.default.string.isRequired,
    onChange: _propTypes2.default.func,
    requiredError: _propTypes2.default.string,
    validationError: _propTypes2.default.string,
    validationErrors: _propTypes2.default.object,
    validations: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),
    value: _propTypes2.default.object
  },

  mixins: [_formsyReact2.default.Mixin],

  componentDidMount: function componentDidMount() {
    var defaultDate = this.props.defaultDate;

    var value = this.getValue();

    if (typeof value === 'undefined' && typeof defaultDate !== 'undefined') {
      this.setValue(defaultDate);
    }
  },
  componentWillReceiveProps: function componentWillReceiveProps(newProps) {
    if (newProps.value) {
      if (!this.props.value || !datesEq(this.props.value, newProps.value)) {
        this.setValue(newProps.value);
      }
    } else if (!this.props.value && newProps.defaultDate) {
      if (!datesEq(this.props.defaultDate, newProps.defaultDate)) {
        this.setValue(newProps.defaultDate);
      }
    }

    /**
     * Check date equality by year, month and day
     * @param {Date} date1
     * @param {Date} date2
     */
    function datesEq(date1, date2) {
      return date1.getFullYear() === date2.getFullYear() && date1.getDate() === date2.getDate() && date1.getDay() === date2.getDay();
    }
  },
  handleChange: function handleChange(event, value) {
    this.setValue(value);
    if (this.props.onChange) this.props.onChange(event, value);
  },


  setMuiComponentAndMaybeFocus: _utils.setMuiComponentAndMaybeFocus,

  render: function render() {
    var _props = this.props,
        defaultDate = _props.defaultDate,
        validations = _props.validations,
        validationErrors = _props.validationErrors,
        validationError = _props.validationError,
        requiredError = _props.requiredError,
        rest = _objectWithoutProperties(_props, ['defaultDate', 'validations', 'validationErrors', 'validationError', 'requiredError']);

    var isRequired = this.isRequired,
        isPristine = this.isPristine,
        isValid = this.isValid,
        isFormSubmitted = this.isFormSubmitted;

    var isRequiredError = isRequired() && !isPristine() && !isValid() && isFormSubmitted() && requiredError;
    var errorText = this.getErrorMessage() || isRequiredError;
    return _react2.default.createElement(_DatePicker2.default, _extends({
      disabled: this.isFormDisabled()
    }, rest, {
      errorText: errorText,
      onChange: this.handleChange,
      ref: this.setMuiComponentAndMaybeFocus,
      value: this.getValue()
    }));
  }
});

exports.default = FormsyDate;