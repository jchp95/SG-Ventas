"use strict";

function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
window.Sidebar = function Sidebar() {
  var _React$useState = React.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    expanded = _React$useState2[0],
    setExpanded = _React$useState2[1];
  var Link = window.ReactRouterDOM.Link;
  var toggleSidebar = function toggleSidebar() {
    setExpanded(function (prev) {
      return !prev;
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "sidebar".concat(expanded ? ' sidebar-expanded' : ' sidebar-collapsed')
  }, /*#__PURE__*/React.createElement("div", {
    className: "sidebar-header"
  }, /*#__PURE__*/React.createElement("span", {
    className: "sidebar-toggle-icon bi ".concat(expanded ? 'bi-chevron-left' : 'bi-list'),
    tabIndex: 0,
    role: "button",
    "aria-label": "Expandir/collapse sidebar",
    onClick: toggleSidebar,
    onKeyPress: function onKeyPress(e) {
      if (e.key === 'Enter' || e.key === ' ') toggleSidebar();
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "sidebar-menu-title"
  }, "Men\xFA")), /*#__PURE__*/React.createElement("div", {
    className: "sidebar-content"
  }, /*#__PURE__*/React.createElement("ul", {
    className: "nav flex-column"
  }, /*#__PURE__*/React.createElement("li", {
    className: "sidebar-nav-item nav-item"
  }, /*#__PURE__*/React.createElement(Link, {
    className: "nav-link",
    to: "/"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-house"
  }), /*#__PURE__*/React.createElement("span", {
    className: "sidebar-text"
  }, "Inicio"))), /*#__PURE__*/React.createElement("li", {
    className: "sidebar-nav-item nav-item"
  }, /*#__PURE__*/React.createElement("a", {
    className: "nav-link",
    href: "#"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-people"
  }), /*#__PURE__*/React.createElement("span", {
    className: "sidebar-text"
  }, "Clientes"))), /*#__PURE__*/React.createElement("li", {
    className: "sidebar-nav-item nav-item"
  }, /*#__PURE__*/React.createElement("a", {
    className: "nav-link",
    href: "#"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-cart"
  }), /*#__PURE__*/React.createElement("span", {
    className: "sidebar-text"
  }, "Ventas"))), /*#__PURE__*/React.createElement("li", {
    className: "sidebar-nav-item nav-item"
  }, /*#__PURE__*/React.createElement("a", {
    className: "nav-link",
    href: "#"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-bar-chart"
  }), /*#__PURE__*/React.createElement("span", {
    className: "sidebar-text"
  }, "Reportes"))), /*#__PURE__*/React.createElement("li", {
    className: "sidebar-nav-item nav-item"
  }, /*#__PURE__*/React.createElement(Link, {
    className: "nav-link",
    to: "/usuarios"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-person-badge"
  }), /*#__PURE__*/React.createElement("span", {
    className: "sidebar-text"
  }, "Usuarios"))))));
};