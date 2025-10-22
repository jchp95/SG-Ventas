"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Navbar = /*#__PURE__*/function (_React$Component) {
  function Navbar(props) {
    var _this;
    _classCallCheck(this, Navbar);
    _this = _callSuper(this, Navbar, [props]);
    _defineProperty(_this, "showDropdown", function () {
      clearTimeout(_this.hideTimeout);
      _this.setState({
        adminDropdownOpen: true
      });
    });
    _defineProperty(_this, "hideDropdown", function () {
      var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 200;
      clearTimeout(_this.hideTimeout);
      _this.hideTimeout = setTimeout(function () {
        _this.setState({
          adminDropdownOpen: false
        });
      }, delay);
    });
    _defineProperty(_this, "clearHideTimeout", function () {
      clearTimeout(_this.hideTimeout);
    });
    _defineProperty(_this, "handleLogout", function (e) {
      e.preventDefault();
      alert('Sesión cerrada. Aquí va la lógica de logout.');
    });
    _this.state = {
      adminDropdownOpen: false
    };
    _this.hideTimeout = null;
    return _this;
  }
  _inherits(Navbar, _React$Component);
  return _createClass(Navbar, [{
    key: "render",
    value: function render() {
      var _this2 = this;
      var adminDropdownOpen = this.state.adminDropdownOpen;
      var Link = window.ReactRouterDOM.Link;
      return /*#__PURE__*/React.createElement("nav", {
        className: "navbar navbar-expand-lg navbar-light"
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
        className: "navbar-link dropdown d-none d-lg-block me-4"
      }, /*#__PURE__*/React.createElement("a", {
        className: "navbar-link dropdown-toggle admin-dropdown-toggle".concat(adminDropdownOpen ? ' show' : ''),
        href: "#",
        id: "adminDropdown",
        role: "button",
        onMouseEnter: this.showDropdown,
        onMouseLeave: function onMouseLeave() {
          return _this2.hideDropdown(200);
        }
      }, /*#__PURE__*/React.createElement("i", {
        className: "fas fa-cog me-1"
      }), " Administraci\xF3n"), /*#__PURE__*/React.createElement("ul", {
        className: "dropdown-menu admin-dropdown-menu dropdown-menu-end".concat(adminDropdownOpen ? ' show' : ''),
        "aria-labelledby": "adminDropdown",
        onMouseEnter: this.clearHideTimeout,
        onMouseLeave: function onMouseLeave() {
          return _this2.hideDropdown(200);
        }
      }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
        className: "dropdown-item mb-2",
        href: "#"
      }, /*#__PURE__*/React.createElement("i", {
        className: "fas fa-clipboard-list me-2"
      }), " Auditor\xEDa")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
        className: "dropdown-item mb-2",
        href: "#"
      }, /*#__PURE__*/React.createElement("i", {
        className: "fas fa-building me-2"
      }), " Datos Empresa")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Link, {
        className: "dropdown-item",
        to: "/usuarios"
      }, /*#__PURE__*/React.createElement("i", {
        className: "fas fa-plus me-2"
      }), " Administrar usuarios")))), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
        className: "navbar-link",
        href: "#",
        onClick: this.handleLogout
      }, "Cerrar Sesi\xF3n")), /*#__PURE__*/React.createElement("div", {
        className: "d-flex flex-column px-3 d-lg-none"
      }, /*#__PURE__*/React.createElement("a", {
        className: "nav-link text-dark d-flex align-items-center mb-3",
        href: "#"
      }, /*#__PURE__*/React.createElement("div", {
        className: "me-3",
        style: {
          width: '30px',
          textAlign: 'center'
        }
      }, /*#__PURE__*/React.createElement("i", {
        className: "fas fa-clipboard-list"
      })), /*#__PURE__*/React.createElement("span", null, "Auditor\xEDa")), /*#__PURE__*/React.createElement("a", {
        className: "nav-link text-dark d-flex align-items-center mb-3",
        href: "#"
      }, /*#__PURE__*/React.createElement("div", {
        className: "me-3",
        style: {
          width: '30px',
          textAlign: 'center'
        }
      }, /*#__PURE__*/React.createElement("i", {
        className: "fas fa-user-shield"
      })), /*#__PURE__*/React.createElement("span", null, "Permisos")), /*#__PURE__*/React.createElement("a", {
        className: "nav-link text-dark d-flex align-items-center mb-3",
        href: "#"
      }, /*#__PURE__*/React.createElement("div", {
        className: "me-3",
        style: {
          width: '30px',
          textAlign: 'center'
        }
      }, /*#__PURE__*/React.createElement("i", {
        className: "fas fa-building"
      })), /*#__PURE__*/React.createElement("span", null, "Datos Empresa")), /*#__PURE__*/React.createElement(Link, {
        className: "nav-link text-dark d-flex align-items-center mb-3",
        to: "/usuarios"
      }, /*#__PURE__*/React.createElement("div", {
        className: "me-3",
        style: {
          width: '30px',
          textAlign: 'center'
        }
      }, /*#__PURE__*/React.createElement("i", {
        className: "fas fa-user-plus"
      })), /*#__PURE__*/React.createElement("span", null, "Administrar usuarios")))))));
    }
  }]);
}(React.Component);
window.Navbar = Navbar;