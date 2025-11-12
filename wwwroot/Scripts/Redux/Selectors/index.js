"use strict";

/**
 * Selectores para obtener datos del store de Redux
 */

var reduxSelectors = {
  // Selectores de Usuarios
  selectUsuarios: function selectUsuarios(state) {
    return state.usuarios.lista;
  },
  selectUsuariosFiltrados: function selectUsuariosFiltrados(state) {
    var _state$usuarios = state.usuarios,
      lista = _state$usuarios.lista,
      filtros = _state$usuarios.filtros;
    return lista.filter(function (usuario) {
      var coincideBusqueda = usuario.nombre.toLowerCase().includes(filtros.busqueda.toLowerCase()) || usuario.email.toLowerCase().includes(filtros.busqueda.toLowerCase());
      var coincedeEstado = filtros.estado === 'todos' || usuario.estado === filtros.estado;
      return coincideBusqueda && coincedeEstado;
    });
  },
  selectUsuariosCargando: function selectUsuariosCargando(state) {
    return state.usuarios.cargando;
  },
  selectUsuariosError: function selectUsuariosError(state) {
    return state.usuarios.error;
  },
  selectUsuariosFiltros: function selectUsuariosFiltros(state) {
    return state.usuarios.filtros;
  },
  // Selectores de Clientes
  selectClientes: function selectClientes(state) {
    return state.clientes.lista;
  },
  selectClientesFiltrados: function selectClientesFiltrados(state) {
    var _state$clientes = state.clientes,
      lista = _state$clientes.lista,
      filtros = _state$clientes.filtros;
    return lista.filter(function (cliente) {
      var _cliente$fnombre, _cliente$fcedulaRnc, _cliente$ftelefono;
      var coincideBusqueda = ((_cliente$fnombre = cliente.fnombre) === null || _cliente$fnombre === void 0 ? void 0 : _cliente$fnombre.toLowerCase().includes(filtros.busqueda.toLowerCase())) || ((_cliente$fcedulaRnc = cliente.fcedulaRnc) === null || _cliente$fcedulaRnc === void 0 ? void 0 : _cliente$fcedulaRnc.toLowerCase().includes(filtros.busqueda.toLowerCase())) || ((_cliente$ftelefono = cliente.ftelefono) === null || _cliente$ftelefono === void 0 ? void 0 : _cliente$ftelefono.toLowerCase().includes(filtros.busqueda.toLowerCase()));
      var coincedeEstado = filtros.estado === 'todos' || filtros.estado === 'activos' && cliente.factivo || filtros.estado === 'inactivos' && !cliente.factivo;
      return coincideBusqueda && coincedeEstado;
    });
  },
  selectClientesCargando: function selectClientesCargando(state) {
    return state.clientes.cargando;
  },
  selectClientesError: function selectClientesError(state) {
    return state.clientes.error;
  },
  selectClientesFiltros: function selectClientesFiltros(state) {
    return state.clientes.filtros;
  },
  selectClientesActivos: function selectClientesActivos(state) {
    return state.clientes.lista.filter(function (c) {
      return c.factivo;
    });
  },
  // Selectores de Ventas
  selectVentas: function selectVentas(state) {
    return state.ventas.lista;
  },
  selectResumenVentas: function selectResumenVentas(state) {
    return state.ventas.resumen;
  },
  selectVentasCargando: function selectVentasCargando(state) {
    return state.ventas.cargando;
  },
  selectVentasError: function selectVentasError(state) {
    return state.ventas.error;
  },
  // Selectores de Auditoría
  selectAuditorias: function selectAuditorias(state) {
    var _state$auditoria;
    return ((_state$auditoria = state.auditoria) === null || _state$auditoria === void 0 ? void 0 : _state$auditoria.lista) || [];
  },
  selectAuditoriasFiltradas: function selectAuditoriasFiltradas(state) {
    var _ref = state.auditoria || {
        lista: [],
        filtros: {}
      },
      lista = _ref.lista,
      filtros = _ref.filtros;
    return lista.filter(function (auditoria) {
      // Filtro por búsqueda
      if (filtros.busqueda) {
        var _auditoria$ftabla, _auditoria$faccion, _auditoria$fjustifica;
        var searchLower = filtros.busqueda.toLowerCase();
        var matchBusqueda = ((_auditoria$ftabla = auditoria.ftabla) === null || _auditoria$ftabla === void 0 ? void 0 : _auditoria$ftabla.toLowerCase().includes(searchLower)) || ((_auditoria$faccion = auditoria.faccion) === null || _auditoria$faccion === void 0 ? void 0 : _auditoria$faccion.toLowerCase().includes(searchLower)) || ((_auditoria$fjustifica = auditoria.fjustificacion) === null || _auditoria$fjustifica === void 0 ? void 0 : _auditoria$fjustifica.toLowerCase().includes(searchLower));
        if (!matchBusqueda) return false;
      }

      // Filtro por tipo de acción
      if (filtros.tipo && auditoria.faccion !== filtros.tipo) {
        return false;
      }

      // Filtro por usuario
      if (filtros.usuario) {
        var _auditoria$fkidUsuari;
        var matchUsuario = (_auditoria$fkidUsuari = auditoria.fkidUsuario) === null || _auditoria$fkidUsuari === void 0 ? void 0 : _auditoria$fkidUsuari.toString().includes(filtros.usuario);
        if (!matchUsuario) return false;
      }

      // Filtro por fecha desde
      if (filtros.fechaDesde && auditoria.ffecha < filtros.fechaDesde) {
        return false;
      }

      // Filtro por fecha hasta
      if (filtros.fechaHasta && auditoria.ffecha > filtros.fechaHasta) {
        return false;
      }
      return true;
    });
  },
  selectAuditoriasCargando: function selectAuditoriasCargando(state) {
    var _state$auditoria2;
    return ((_state$auditoria2 = state.auditoria) === null || _state$auditoria2 === void 0 ? void 0 : _state$auditoria2.cargando) || false;
  },
  selectAuditoriasError: function selectAuditoriasError(state) {
    var _state$auditoria3;
    return ((_state$auditoria3 = state.auditoria) === null || _state$auditoria3 === void 0 ? void 0 : _state$auditoria3.error) || null;
  },
  selectAuditoriasFiltros: function selectAuditoriasFiltros(state) {
    var _state$auditoria4;
    return ((_state$auditoria4 = state.auditoria) === null || _state$auditoria4 === void 0 ? void 0 : _state$auditoria4.filtros) || {};
  },
  selectAuditoriasPaginacion: function selectAuditoriasPaginacion(state) {
    var _state$auditoria5;
    return ((_state$auditoria5 = state.auditoria) === null || _state$auditoria5 === void 0 ? void 0 : _state$auditoria5.paginacion) || {
      paginaActual: 0,
      elementosPorPagina: 15,
      totalElementos: 0
    };
  },
  // Selectores de App
  selectUsuarioActual: function selectUsuarioActual(state) {
    return state.app.usuario;
  },
  selectSidebarAbierto: function selectSidebarAbierto(state) {
    return state.app.sidebarAbierto;
  },
  selectTema: function selectTema(state) {
    return state.app.tema;
  },
  selectNotificaciones: function selectNotificaciones(state) {
    return state.app.notificaciones;
  },
  selectCargandoGlobal: function selectCargandoGlobal(state) {
    return state.app.cargandoGlobal;
  },
  // Selectores combinados
  selectUsuariosActivos: function selectUsuariosActivos(state) {
    return state.usuarios.lista.filter(function (u) {
      return u.estado === 'activo';
    });
  },
  selectVentasDelDia: function selectVentasDelDia(state) {
    var hoy = new Date().toDateString();
    return state.ventas.lista.filter(function (venta) {
      return new Date(venta.fecha).toDateString() === hoy;
    });
  },
  selectTotalVentasHoy: function selectTotalVentasHoy(state) {
    var ventasHoy = reduxSelectors.selectVentasDelDia(state);
    return ventasHoy.reduce(function (total, venta) {
      return total + venta.monto;
    }, 0);
  },
  selectAuditoriasDeHoy: function selectAuditoriasDeHoy(state) {
    var _state$auditoria6;
    var hoy = new Date().toISOString().split('T')[0];
    return ((_state$auditoria6 = state.auditoria) === null || _state$auditoria6 === void 0 || (_state$auditoria6 = _state$auditoria6.lista) === null || _state$auditoria6 === void 0 ? void 0 : _state$auditoria6.filter(function (aud) {
      return aud.ffecha === hoy;
    })) || [];
  },
  selectAuditoriasPorAccion: function selectAuditoriasPorAccion(state, accion) {
    var _state$auditoria7;
    return ((_state$auditoria7 = state.auditoria) === null || _state$auditoria7 === void 0 || (_state$auditoria7 = _state$auditoria7.lista) === null || _state$auditoria7 === void 0 ? void 0 : _state$auditoria7.filter(function (aud) {
      return aud.faccion === accion;
    })) || [];
  },
  // Selectores de Autenticación
  selectAuthIsAuthenticated: function selectAuthIsAuthenticated(state) {
    var _state$auth;
    return ((_state$auth = state.auth) === null || _state$auth === void 0 ? void 0 : _state$auth.isAuthenticated) || false;
  },
  selectAuthToken: function selectAuthToken(state) {
    var _state$auth2;
    return ((_state$auth2 = state.auth) === null || _state$auth2 === void 0 ? void 0 : _state$auth2.token) || null;
  },
  selectAuthUserName: function selectAuthUserName(state) {
    var _state$auth3;
    return ((_state$auth3 = state.auth) === null || _state$auth3 === void 0 ? void 0 : _state$auth3.userName) || null;
  },
  selectAuthLoading: function selectAuthLoading(state) {
    var _state$auth4;
    return ((_state$auth4 = state.auth) === null || _state$auth4 === void 0 ? void 0 : _state$auth4.loading) || false;
  },
  selectAuthError: function selectAuthError(state) {
    var _state$auth5;
    return ((_state$auth5 = state.auth) === null || _state$auth5 === void 0 ? void 0 : _state$auth5.error) || null;
  },
  selectAuthMessage: function selectAuthMessage(state) {
    var _state$auth6;
    return ((_state$auth6 = state.auth) === null || _state$auth6 === void 0 ? void 0 : _state$auth6.message) || null;
  }
};

// Hacer disponible globalmente
window.ReduxSelectors = reduxSelectors;
console.log('🎯 Redux Selectors cargados correctamente');