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
  }
};

// Hacer disponible globalmente
window.ReduxSelectors = reduxSelectors;
console.log('🎯 Redux Selectors cargados correctamente');