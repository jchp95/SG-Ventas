"use strict";

function Modal(_ref) {
  var open = _ref.open,
    onClose = _ref.onClose,
    children = _ref.children;
  // Redux hooks para tema
  var _window$ReduxProvider = window.ReduxProvider.useApp(),
    tema = _window$ReduxProvider.tema;
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: "modal-backdrop-custom ".concat(tema === 'dark' ? 'modal-backdrop-dark' : '')
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-ventana ".concat(tema === 'dark' ? 'modal-ventana-dark' : '')
  }, /*#__PURE__*/React.createElement("button", {
    className: "modal-close-btn ".concat(tema === 'dark' ? 'modal-close-btn-dark' : ''),
    onClick: onClose,
    style: {
      position: 'absolute',
      top: 12,
      right: 18,
      fontSize: 22,
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      zIndex: 2
    }
  }, "\xD7"), children));
}
window.Modal = Modal;