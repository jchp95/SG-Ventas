"use strict";

function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var Navbar = function Navbar() {
  // Estado local
  var _React$useState = React.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    adminDropdownOpen = _React$useState2[0],
    setAdminDropdownOpen = _React$useState2[1];
  var hideTimeoutRef = React.useRef(null);

  // Redux hooks
  var _window$ReduxProvider = window.ReduxProvider.useApp(),
    tema = _window$ReduxProvider.tema,
    setTema = _window$ReduxProvider.setTema,
    usuario = _window$ReduxProvider.usuario;
  var _window$ReduxProvider2 = window.ReduxProvider.useAuth(),
    logout = _window$ReduxProvider2.logout,
    authLoading = _window$ReduxProvider2.loading;
  var Link = window.ReactRouterDOM.Link;

  // Funciones para dropdown
  var showDropdown = function showDropdown() {
    clearTimeout(hideTimeoutRef.current);
    setAdminDropdownOpen(true);
  };
  var hideDropdown = function hideDropdown() {
    var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 200;
    clearTimeout(hideTimeoutRef.current);
    hideTimeoutRef.current = setTimeout(function () {
      setAdminDropdownOpen(false);
    }, delay);
  };
  var clearHideTimeout = function clearHideTimeout() {
    clearTimeout(hideTimeoutRef.current);
  };

  // Función para cambiar tema
  var toggleTheme = function toggleTheme() {
    var nuevoTema = tema === 'light' ? 'dark' : 'light';
    setTema(nuevoTema);

    // Agregar clase de animación temporalmente
    var btn = document.querySelector('.theme-toggle-btn');
    if (btn) {
      btn.classList.add('changing');
      setTimeout(function () {
        return btn.classList.remove('changing');
      }, 600);
    }
  };
  var handleLogout = function handleLogout(e) {
    e.preventDefault();
    if (authLoading) return; // Prevenir múltiples clics

    // Llamar al logout de Redux que hace la solicitud al backend
    logout();
  };
  return /*#__PURE__*/React.createElement("nav", {
    className: "navbar navbar-expand-lg ".concat(tema === 'dark' ? 'theme-dark' : 'navbar-light')
  }, /*#__PURE__*/React.createElement("div", {
    className: "container-fluid justify-content-space-between align-items-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "d-flex justify-content-start"
  }, /*#__PURE__*/React.createElement(Link, {
    className: "navbar-brand",
    to: "/"
  }, "Ventas"), /*#__PURE__*/React.createElement("button", {
    className: "navbar-toggler",
    type: "button",
    "data-bs-toggle": "collapse",
    "data-bs-target": "#navbarNav",
    "aria-controls": "navbarNav",
    "aria-expanded": "false",
    "aria-label": "Toggle navigation"
  }, /*#__PURE__*/React.createElement("span", {
    className: "navbar-toggler-icon"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "collapse navbar-collapse justify-content-end",
    id: "navbarNav"
  }, /*#__PURE__*/React.createElement("ul", {
    className: "navbar-nav"
  }, /*#__PURE__*/React.createElement("li", {
    className: "nav-item me-3"
  }, /*#__PURE__*/React.createElement("button", {
    className: "theme-toggle-btn",
    onClick: toggleTheme,
    title: "Cambiar a tema ".concat(tema === 'light' ? 'oscuro' : 'claro')
  }, tema === 'light' ? /*#__PURE__*/React.createElement("i", {
    className: "bi bi-moon-stars"
  }) : /*#__PURE__*/React.createElement("i", {
    className: "bi bi-sun"
  }))), /*#__PURE__*/React.createElement("li", {
    className: "navbar-link dropdown d-none d-lg-block me-4"
  }, /*#__PURE__*/React.createElement("button", {
    className: "theme-toggle-btn dropdown-toggle admin-dropdown-toggle".concat(adminDropdownOpen ? ' show' : ''),
    id: "adminDropdown",
    role: "button",
    onMouseEnter: showDropdown,
    onMouseLeave: function onMouseLeave() {
      return hideDropdown(200);
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-gear me-1"
  })), /*#__PURE__*/React.createElement("ul", {
    className: "dropdown-menu admin-dropdown-menu dropdown-menu-end".concat(adminDropdownOpen ? ' show' : ''),
    "aria-labelledby": "adminDropdown",
    onMouseEnter: clearHideTimeout,
    onMouseLeave: function onMouseLeave() {
      return hideDropdown(200);
    }
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Link, {
    className: "dropdown-item mb-2",
    to: "/auditoria"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-clipboard-data me-2"
  }), " Auditor\xEDa")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Link, {
    className: "dropdown-item mb-2",
    to: "/settings"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-building me-2"
  }), " Datos Empresa")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Link, {
    className: "dropdown-item",
    to: "/usuarios"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-person-plus me-2"
  }), " Administrar usuarios")))), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("button", {
    className: "theme-toggle-btn",
    onClick: handleLogout,
    disabled: authLoading,
    title: "Cerrar Sesi\xF3n"
  }, authLoading ? /*#__PURE__*/React.createElement("i", {
    className: "bi bi-hourglass-split"
  }) : /*#__PURE__*/React.createElement("i", {
    className: "bi bi-box-arrow-right"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "d-flex flex-column px-3 d-lg-none"
  }, /*#__PURE__*/React.createElement("button", {
    className: "nav-link d-flex align-items-center mb-3 btn ".concat(tema === 'dark' ? 'text-white' : 'text-dark'),
    onClick: toggleTheme,
    style: {
      border: 'none',
      background: 'transparent',
      textAlign: 'left'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "me-3",
    style: {
      width: '30px',
      textAlign: 'center'
    }
  }, tema === 'light' ? /*#__PURE__*/React.createElement("i", {
    className: "bi bi-moon-stars"
  }) : /*#__PURE__*/React.createElement("i", {
    className: "bi bi-sun"
  })), /*#__PURE__*/React.createElement("span", null, tema === 'light' ? 'Tema Oscuro' : 'Tema Claro')), /*#__PURE__*/React.createElement(Link, {
    className: "nav-link d-flex align-items-center mb-3 ".concat(tema === 'dark' ? 'text-white' : 'text-dark'),
    to: "/auditoria"
  }, /*#__PURE__*/React.createElement("div", {
    className: "me-3",
    style: {
      width: '30px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-clipboard-data"
  })), /*#__PURE__*/React.createElement("span", null, "Auditor\xEDa")), /*#__PURE__*/React.createElement(Link, {
    className: "nav-link d-flex align-items-center mb-3 ".concat(tema === 'dark' ? 'text-white' : 'text-dark'),
    to: "/settings"
  }, /*#__PURE__*/React.createElement("div", {
    className: "me-3",
    style: {
      width: '30px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-building"
  })), /*#__PURE__*/React.createElement("span", null, "Datos Empresa")), /*#__PURE__*/React.createElement(Link, {
    className: "nav-link d-flex align-items-center mb-3 ".concat(tema === 'dark' ? 'text-white' : 'text-dark'),
    to: "/usuarios"
  }, /*#__PURE__*/React.createElement("div", {
    className: "me-3",
    style: {
      width: '30px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-person-plus"
  })), /*#__PURE__*/React.createElement("span", null, "Administrar usuarios")), /*#__PURE__*/React.createElement("button", {
    className: "nav-link d-flex align-items-center mb-3 btn ".concat(tema === 'dark' ? 'text-white' : 'text-dark'),
    onClick: handleLogout,
    disabled: authLoading,
    style: {
      border: 'none',
      background: 'transparent',
      textAlign: 'left'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "me-3",
    style: {
      width: '30px',
      textAlign: 'center'
    }
  }, authLoading ? /*#__PURE__*/React.createElement("i", {
    className: "bi bi-hourglass-split"
  }) : /*#__PURE__*/React.createElement("i", {
    className: "bi bi-box-arrow-right"
  })), /*#__PURE__*/React.createElement("span", null, "Cerrar Sesi\xF3n")))))));
};
window.Navbar = Navbar;