"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
// AuditoriaList.jsx

function Auditoria() {
  var PAGE_SIZE = 15;

  // Redux hooks para auditoría y tema
  var _window$ReduxProvider = window.ReduxProvider.useApp(),
    tema = _window$ReduxProvider.tema;
  var _window$ReduxProvider2 = window.ReduxProvider.useAuditoria(),
    auditoriasFiltradas = _window$ReduxProvider2.auditoriasFiltradas,
    cargando = _window$ReduxProvider2.cargando,
    error = _window$ReduxProvider2.error,
    filtros = _window$ReduxProvider2.filtros,
    paginacion = _window$ReduxProvider2.paginacion,
    setFiltros = _window$ReduxProvider2.setFiltros,
    setPaginacion = _window$ReduxProvider2.setPaginacion,
    limpiarFiltros = _window$ReduxProvider2.limpiarFiltros,
    fetchAuditorias = _window$ReduxProvider2.fetchAuditorias,
    fetchAuditoriasByFilter = _window$ReduxProvider2.fetchAuditoriasByFilter,
    auditoriasUsuarios = _window$ReduxProvider2.auditoriasUsuarios,
    cargandoUsuarios = _window$ReduxProvider2.cargandoUsuarios,
    errorUsuarios = _window$ReduxProvider2.errorUsuarios,
    fetchUsuariosAuditoria = _window$ReduxProvider2.fetchUsuariosAuditoria;

  // Estado local para el tipo de auditoría
  var _React$useState = React.useState('tenant'),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    tipoAuditoria = _React$useState2[0],
    setTipoAuditoria = _React$useState2[1]; // 'tenant' o 'usuarios'

  // Cargar auditorías al montar el componente o cuando cambia el tipo
  React.useEffect(function () {
    if (tipoAuditoria === 'tenant') {
      fetchAuditorias();
    } else {
      fetchUsuariosAuditoria(filtros);
    }
  }, [tipoAuditoria]);
  var handleTipoChange = function handleTipoChange(tipo) {
    setTipoAuditoria(tipo);
    limpiarFiltros();
  };
  var handleSearchChange = function handleSearchChange(e) {
    setFiltros({
      busqueda: e.target.value
    });
    // Si estamos viendo usuarios, recargar automáticamente con debounce
    if (tipoAuditoria === 'usuarios') {
      var nuevosFiltros = _objectSpread(_objectSpread({}, filtros), {}, {
        busqueda: e.target.value
      });
      setTimeout(function () {
        return fetchUsuariosAuditoria(nuevosFiltros);
      }, 500);
    }
  };
  var handlePageChange = function handlePageChange(newPage) {
    setPaginacion({
      paginaActual: newPage
    });
  };
  var handleFilterChange = function handleFilterChange(filterName, value) {
    var nuevosFiltros = _objectSpread(_objectSpread({}, filtros), {}, _defineProperty({}, filterName, value));
    setFiltros(_defineProperty({}, filterName, value));
    // Si estamos viendo usuarios, recargar automáticamente con debounce
    if (tipoAuditoria === 'usuarios') {
      setTimeout(function () {
        return fetchUsuariosAuditoria(nuevosFiltros);
      }, 500);
    }
  };
  var clearFilters = function clearFilters() {
    limpiarFiltros();
    if (tipoAuditoria === 'usuarios') {
      setTimeout(function () {
        return fetchUsuariosAuditoria({});
      }, 100);
    }
  };

  // Determinar datos y estado de carga según el tipo
  var datosActuales = tipoAuditoria === 'tenant' ? auditoriasFiltradas : auditoriasUsuarios;
  var cargandoActual = tipoAuditoria === 'tenant' ? cargando : cargandoUsuarios;
  var errorActual = tipoAuditoria === 'tenant' ? error : errorUsuarios;
  return /*#__PURE__*/React.createElement("div", {
    className: "auditoria-page ".concat(tema === 'dark' ? 'theme-dark' : 'theme-light')
  }, /*#__PURE__*/React.createElement("div", {
    className: "parent auditoria-content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "div1 main-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "div2 auditoria-header-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "auditoria-header-content d-flex justify-content-between align-items-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "auditoria-title-section justify-content-start"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "auditoria-title fw-bold mb-0"
  }, "Registro de Auditor\xEDa"), /*#__PURE__*/React.createElement("p", {
    className: "auditoria-subtitle"
  }, "Seguimiento de cambios en el sistema")), /*#__PURE__*/React.createElement("div", {
    className: "auditoria-actions d-flex justify-content-end gap-2"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "form-control input-light ".concat(tema === 'dark' ? 'input-dark' : ''),
    placeholder: "Buscar en auditor\xEDa...",
    style: {
      maxWidth: 260
    },
    value: filtros.busqueda || '',
    onChange: handleSearchChange
  }))), /*#__PURE__*/React.createElement("div", {
    className: "d-flex gap-2 mt-3"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn ".concat(tipoAuditoria === 'tenant' ? 'btn-primary' : 'btn-outline-primary'),
    onClick: function onClick() {
      return handleTipoChange('tenant');
    },
    style: {
      minWidth: '150px'
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-database me-2"
  }), "Datos del Sistema"), /*#__PURE__*/React.createElement("button", {
    className: "btn ".concat(tipoAuditoria === 'usuarios' ? 'btn-primary' : 'btn-outline-primary'),
    onClick: function onClick() {
      return handleTipoChange('usuarios');
    },
    style: {
      minWidth: '150px'
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-people me-2"
  }), "Gesti\xF3n de Usuarios"))), /*#__PURE__*/React.createElement("div", {
    className: "auditoria-filters-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "filters-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "filter-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "filter-label"
  }, "Tipo de acci\xF3n"), /*#__PURE__*/React.createElement("select", {
    className: "form-control input-light ".concat(tema === 'dark' ? 'input-dark' : ''),
    value: filtros.tipo || '',
    onChange: function onChange(e) {
      return handleFilterChange('tipo', e.target.value);
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Todos los tipos"), /*#__PURE__*/React.createElement("option", {
    value: "Creaci\xF3n"
  }, "Creaci\xF3n"), /*#__PURE__*/React.createElement("option", {
    value: "Modificaci\xF3n"
  }, "Modificaci\xF3n"), /*#__PURE__*/React.createElement("option", {
    value: "Eliminaci\xF3n"
  }, "Eliminaci\xF3n"))), /*#__PURE__*/React.createElement("div", {
    className: "filter-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "filter-label"
  }, "Usuario"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "form-control input-light ".concat(tema === 'dark' ? 'input-dark' : ''),
    placeholder: "Filtrar por usuario",
    value: filtros.usuario || '',
    onChange: function onChange(e) {
      return handleFilterChange('usuario', e.target.value);
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "filter-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "filter-label"
  }, "Desde"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    className: "form-control input-light ".concat(tema === 'dark' ? 'input-dark' : ''),
    value: filtros.fechaDesde || '',
    onChange: function onChange(e) {
      return handleFilterChange('fechaDesde', e.target.value);
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "filter-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "filter-label"
  }, "Hasta"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    className: "form-control input-light ".concat(tema === 'dark' ? 'input-dark' : ''),
    value: filtros.fechaHasta || '',
    onChange: function onChange(e) {
      return handleFilterChange('fechaHasta', e.target.value);
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "filter-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "filter-label invisible"
  }, "Limpiar"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-outline-secondary",
    onClick: clearFilters
  }, "Limpiar filtros")))), /*#__PURE__*/React.createElement("div", {
    className: "div3"
  }, cargandoActual ? /*#__PURE__*/React.createElement("div", {
    className: "text-center p-5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "spinner-border text-primary",
    role: "status"
  }, /*#__PURE__*/React.createElement("span", {
    className: "visually-hidden"
  }, "Cargando...")), /*#__PURE__*/React.createElement("p", {
    className: "mt-2"
  }, tipoAuditoria === 'tenant' ? 'Cargando datos del sistema...' : 'Cargando auditoría de usuarios...')) : errorActual ? /*#__PURE__*/React.createElement("div", {
    className: "alert alert-danger m-3"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-exclamation-triangle me-2"
  }), "Error al cargar auditor\xEDas: ", errorActual) : datosActuales && datosActuales.length === 0 ? /*#__PURE__*/React.createElement("div", {
    className: "alert alert-info m-3"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-info-circle me-2"
  }), "No se encontraron registros de auditor\xEDa", tipoAuditoria === 'usuarios' ? ' de usuarios' : '', ".") : window.TableAuditoria ? /*#__PURE__*/React.createElement(window.TableAuditoria, {
    data: datosActuales,
    page: paginacion.paginaActual,
    pageSize: PAGE_SIZE,
    onPageChange: handlePageChange,
    tipoAuditoria: tipoAuditoria
  }) : null))));
}
window.Auditoria = Auditoria;
console.log('✅ Auditoria component loaded');