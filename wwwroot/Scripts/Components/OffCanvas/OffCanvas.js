"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/* jshint ignore:start */

/* global React */

var OffCanvas = function OffCanvas(_ref) {
  var show = _ref.show,
    onClose = _ref.onClose,
    _ref$width = _ref.width,
    width = _ref$width === void 0 ? '400px' : _ref$width,
    children = _ref.children,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? '' : _ref$className,
    _ref$style = _ref.style,
    style = _ref$style === void 0 ? {} : _ref$style;
  // Redux hook para tema
  var _window$ReduxProvider = window.ReduxProvider.useApp(),
    tema = _window$ReduxProvider.tema;
  if (!show) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: "offcanvas-actividad-reciente show ".concat(className, " ").concat(tema === 'dark' ? 'theme-dark' : ''),
    style: Object.assign(_objectSpread({
      display: 'block',
      position: 'fixed',
      right: 0,
      top: 0,
      width: width,
      height: '100%',
      background: tema === 'dark' ? '#2d2d2d' : '#fff',
      boxShadow: tema === 'dark' ? '-2px 0 24px rgba(0, 0, 0, 0.3)' : '-2px 0 24px rgba(67,97,238,0.10)',
      borderRadius: '16px 0 0 16px',
      borderLeft: tema === 'dark' ? '6px solid #4c7fff' : '6px solid var(--primary-light)',
      padding: '28px 22px 18px 22px',
      animation: 'scaleFadeIn 0.35s',
      zIndex: 1050,
      overflowY: 'auto'
    }, style))
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn-close float-end ".concat(tema === 'dark' ? 'theme-dark' : ''),
    onClick: onClose
  }), children);
};
window.OffCanvas = OffCanvas;

/* jshint ignore:end */