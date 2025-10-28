"use strict";

function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
/* jshint ignore:start */

/* global React */

var ActividadesRecientes = function ActividadesRecientes() {
  // Redux hooks para tema
  var _window$ReduxProvider = window.ReduxProvider.useApp(),
    tema = _window$ReduxProvider.tema;

  // Simulación de muchas actividades para paginación
  var actividades = React.useMemo(function () {
    var acts = [];
    for (var i = 1; i <= 50; i++) {
      acts.push({
        id: i,
        tipo: i % 3 === 0 ? 'Producto' : i % 2 === 0 ? 'Cliente' : 'Venta',
        descripcion: "Actividad ".concat(i, " realizada"),
        fecha: "21 Oct 2025 ".concat(10 - Math.floor(i / 6), ":0").concat(i % 6, "h"),
        detalleAdicional: i % 4 === 0 ? "Detalle extra ".concat(i) : '',
        esUrgente: i % 7 === 0
      });
    }
    return acts;
  }, []);

  // Estados locales
  var _React$useState = React.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    mostrarOffCanvas = _React$useState2[0],
    setMostrarOffCanvas = _React$useState2[1];
  var _React$useState3 = React.useState(0),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    offCanvasPage = _React$useState4[0],
    setOffCanvasPage = _React$useState4[1];
  var _React$useState5 = React.useState(null),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    actividadSeleccionada = _React$useState6[0],
    setActividadSeleccionada = _React$useState6[1];
  var getIconClass = function getIconClass(tipo) {
    switch (tipo) {
      case 'Venta':
        return 'bi bi-bar-chart-line';
      case 'Cliente':
        return 'bi bi-person-plus';
      case 'Producto':
        return 'bi bi-box-seam';
      default:
        return 'bi bi-info-circle';
    }
  };
  var abrirOffCanvasActividad = function abrirOffCanvasActividad(actividad) {
    setMostrarOffCanvas(true);
    setActividadSeleccionada(actividad);
    if (window.OffCanvasActRecientes && window.OffCanvasActRecientes.open) {
      window.OffCanvasActRecientes.open();
    }
  };
  var abrirOffCanvasLista = function abrirOffCanvasLista() {
    setMostrarOffCanvas(true);
    setOffCanvasPage(0);
    setActividadSeleccionada(null);
    if (window.OffCanvasActRecientes && window.OffCanvasActRecientes.open) {
      window.OffCanvasActRecientes.open();
    }
  };
  var cerrarOffCanvas = function cerrarOffCanvas() {
    setMostrarOffCanvas(false);
    setActividadSeleccionada(null);
    if (window.OffCanvasActRecientes && window.OffCanvasActRecientes.close) {
      window.OffCanvasActRecientes.close();
    }
  };
  var verMasOffCanvas = function verMasOffCanvas() {
    setOffCanvasPage(function (prev) {
      return prev + 1;
    });
  };
  var ultimas5 = actividades.slice(-5).reverse();
  // Para el offcanvas: 20 por página, paginación simple
  var offCanvasActividades = actividades.slice().reverse().slice(0, 20 * (offCanvasPage + 1));
  var hayMas = actividades.length > offCanvasActividades.length;
  return /*#__PURE__*/React.createElement("div", {
    className: "actividades-recientes-section ".concat(tema === 'dark' ? 'theme-dark' : '')
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-title mb-2"
  }, "Actividades recientes"), /*#__PURE__*/React.createElement("div", {
    className: "actividades-list"
  }, ultimas5.map(function (act) {
    return /*#__PURE__*/React.createElement("div", {
      key: act.id,
      className: "activity-item mb-3 ".concat(act.esUrgente ? 'urgent' : ''),
      style: {
        cursor: 'pointer'
      },
      onClick: function onClick() {
        return abrirOffCanvasActividad(act);
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "d-flex"
    }, /*#__PURE__*/React.createElement("div", {
      className: "activity-icon me-3 ".concat(act.tipo.toLowerCase())
    }, /*#__PURE__*/React.createElement("i", {
      className: getIconClass(act.tipo)
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "act-tipo"
    }, act.tipo), /*#__PURE__*/React.createElement("div", {
      className: "act-description"
    }, act.descripcion), /*#__PURE__*/React.createElement("small", {
      className: "act-fecha"
    }, act.fecha))), /*#__PURE__*/React.createElement("hr", {
      className: "my-2"
    }));
  })), /*#__PURE__*/React.createElement("div", {
    className: "text-end"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "show-more-link",
    onClick: function onClick(e) {
      e.preventDefault();
      abrirOffCanvasLista();
    }
  }, "Mostrar m\xE1s")), /*#__PURE__*/React.createElement(OffCanvasActRecientes, {
    show: mostrarOffCanvas,
    onClose: cerrarOffCanvas,
    actividades: offCanvasActividades,
    verMas: hayMas ? verMasOffCanvas : null,
    actividad: actividadSeleccionada
  }));
};
window.ActividadesRecientes = ActividadesRecientes;

/* jshint ignore:end */