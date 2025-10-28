"use strict";

/* jshint ignore:start */

/* global React */

var OffCanvasActRecientes = function OffCanvasActRecientes(_ref) {
  var show = _ref.show,
    onClose = _ref.onClose,
    _ref$actividades = _ref.actividades,
    actividades = _ref$actividades === void 0 ? [] : _ref$actividades,
    verMas = _ref.verMas,
    actividad = _ref.actividad;
  // Redux hook para tema
  var _window$ReduxProvider = window.ReduxProvider.useApp(),
    tema = _window$ReduxProvider.tema;
  var openOffcanvas = function openOffcanvas() {
    var offcanvas = document.getElementById('offcanvas-actividad-reciente');
    if (offcanvas) {
      offcanvas.classList.add('show');
      offcanvas.style.display = 'block';
    }
  };
  var closeOffcanvas = function closeOffcanvas() {
    var offcanvas = document.getElementById('offcanvas-actividad-reciente');
    if (offcanvas) {
      offcanvas.classList.remove('show');
      offcanvas.style.display = 'none';
    }
  };
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
  if (!show) return null;

  // Si hay actividad seleccionada, mostrar solo el detalle
  if (actividad) {
    return /*#__PURE__*/React.createElement(window.OffCanvas, {
      show: show,
      onClose: onClose,
      width: "350px",
      className: tema === 'dark' ? 'theme-dark' : ''
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'start',
        width: '100%',
        marginBottom: '16px'
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h5", {
      className: "mb-3"
    }, "Detalle de actividad"))), /*#__PURE__*/React.createElement("div", {
      className: "act-description mb-2"
    }, /*#__PURE__*/React.createElement("b", null, "Tipo:"), " ", actividad.tipo), /*#__PURE__*/React.createElement("div", {
      className: "act-description mb-2"
    }, /*#__PURE__*/React.createElement("b", null, "Descripci\xF3n:"), " ", actividad.descripcion), /*#__PURE__*/React.createElement("div", {
      className: "act-description mb-2"
    }, /*#__PURE__*/React.createElement("b", null, "Fecha:"), " ", actividad.fecha), actividad.detalleAdicional && /*#__PURE__*/React.createElement("div", {
      className: "act-detalle mb-2"
    }, /*#__PURE__*/React.createElement("b", null, "Detalle:"), " ", actividad.detalleAdicional), actividad.esUrgente && /*#__PURE__*/React.createElement("span", {
      className: "badge bg-danger"
    }, "\xA1Urgente!"));
  }

  // Si no, mostrar la lista paginada
  return /*#__PURE__*/React.createElement(window.OffCanvas, {
    show: show,
    onClose: onClose,
    width: "350px",
    className: tema === 'dark' ? 'theme-dark' : ''
  }, /*#__PURE__*/React.createElement("h5", {
    className: "mb-3"
  }, "Actividades recientes"), /*#__PURE__*/React.createElement("div", {
    className: "actividades-list"
  }, actividades.length === 0 && /*#__PURE__*/React.createElement("div", {
    className: "text-muted"
  }, "No hay actividades."), actividades.map(function (act) {
    return /*#__PURE__*/React.createElement("div", {
      key: act.id,
      className: "activity-item mb-3 ".concat(act.esUrgente ? 'urgent' : ''),
      style: {
        cursor: 'default'
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
    }, act.fecha), act.detalleAdicional && /*#__PURE__*/React.createElement("div", {
      className: "act-detalle"
    }, act.detalleAdicional), act.esUrgente && /*#__PURE__*/React.createElement("span", {
      className: "badge bg-danger ms-2"
    }, "\xA1Urgente!"))), /*#__PURE__*/React.createElement("hr", {
      className: "my-2"
    }));
  })), verMas && /*#__PURE__*/React.createElement("div", {
    className: "text-center mt-3"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary register-button",
    onClick: verMas
  }, "Ver m\xE1s")));
};

// Funciones estáticas para compatibilidad
OffCanvasActRecientes.open = function () {
  var offcanvas = document.getElementById('offcanvas-actividad-reciente');
  if (offcanvas) {
    offcanvas.classList.add('show');
    offcanvas.style.display = 'block';
  }
};
OffCanvasActRecientes.close = function () {
  var offcanvas = document.getElementById('offcanvas-actividad-reciente');
  if (offcanvas) {
    offcanvas.classList.remove('show');
    offcanvas.style.display = 'none';
  }
};
window.OffCanvasActRecientes = OffCanvasActRecientes;

/* jshint ignore:end */