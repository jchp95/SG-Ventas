"use strict";

function App(_ref) {
  var children = _ref.children;
  // Componentes
  var Navbar = window.Navbar;
  var Sidebar = window.Sidebar;
  var Footer = window.Footer;
  var Toasts = window.Toasts;

  // Redux hooks
  var _window$ReduxProvider = window.ReduxProvider.useApp(),
    sidebarAbierto = _window$ReduxProvider.sidebarAbierto,
    tema = _window$ReduxProvider.tema,
    notificaciones = _window$ReduxProvider.notificaciones,
    cargandoGlobal = _window$ReduxProvider.cargandoGlobal;

  // Aplicar tema al body
  React.useEffect(function () {
    document.body.className = tema === 'dark' ? 'theme-dark' : 'theme-light';
  }, [tema]);
  return /*#__PURE__*/React.createElement("div", {
    className: "app-layout d-flex flex-column min-vh-100 ".concat(tema === 'dark' ? 'theme-dark' : ''),
    style: {
      minHeight: '100vh'
    }
  }, cargandoGlobal && /*#__PURE__*/React.createElement("div", {
    className: "position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50",
    style: {
      zIndex: 9999
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "spinner-border text-primary",
    role: "status"
  }, /*#__PURE__*/React.createElement("span", {
    className: "visually-hidden"
  }, "Cargando..."))), /*#__PURE__*/React.createElement("div", {
    className: "flex-shrink-0"
  }, /*#__PURE__*/React.createElement(Navbar, null)), /*#__PURE__*/React.createElement("div", {
    className: "flex-grow-1 d-flex main-row",
    style: {
      flex: 1,
      minHeight: 0
    }
  }, /*#__PURE__*/React.createElement(Sidebar, null), /*#__PURE__*/React.createElement("main", {
    className: "flex-grow-1 transition-all ".concat(sidebarAbierto ? 'sidebar-open' : 'sidebar-closed'),
    style: {
      overflowY: 'auto'
    }
  }, children)), /*#__PURE__*/React.createElement("div", {
    className: "flex-shrink-0"
  }, /*#__PURE__*/React.createElement(Footer, null)), Toasts && /*#__PURE__*/React.createElement(Toasts, null));
}
window.App = App;