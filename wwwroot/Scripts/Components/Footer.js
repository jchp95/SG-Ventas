"use strict";

var Footer = function Footer() {
  // Redux hook para tema
  var _window$ReduxProvider = window.ReduxProvider.useApp(),
    tema = _window$ReduxProvider.tema;
  return /*#__PURE__*/React.createElement("footer", {
    className: "footer mt-auto py-3 ".concat(tema === 'dark' ? 'bg-dark-footer text-light' : 'bg-light')
  }, /*#__PURE__*/React.createElement("div", {
    className: "d-flex justify-content-center"
  }, /*#__PURE__*/React.createElement("span", {
    className: tema === 'dark' ? 'text-light' : 'text-muted'
  }, "\xA9 2025 Ventas. Todos los derechos reservados.")));
};