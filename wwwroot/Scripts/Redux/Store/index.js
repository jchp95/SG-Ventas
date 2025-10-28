"use strict";

/**
 * Store principal de Redux
 * Combina todos los reducers y crea el store
 */

// Extraer Redux del objeto global
var _Redux = Redux,
  createStore = _Redux.createStore,
  combineReducers = _Redux.combineReducers;

// Combinar todos los reducers
var rootReducer = combineReducers({
  usuarios: window.UsuariosReducer,
  ventas: window.VentasReducer,
  app: window.AppReducer
});

// Crear el store
var store = createStore(rootReducer,
// Habilitar Redux DevTools si están disponibles
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// Hacer disponible globalmente
window.ReduxStore = {
  store: store,
  // Actions
  usuarios: window.UsuariosActions,
  ventas: window.VentasActions,
  app: window.AppActions,
  // Selectores
  selectors: window.ReduxSelectors,
  // Métodos de conveniencia
  getState: function getState() {
    return store.getState();
  },
  dispatch: function dispatch(action) {
    return store.dispatch(action);
  },
  subscribe: function subscribe(listener) {
    return store.subscribe(listener);
  }
};

// Log del estado inicial
console.log('🚀 Redux Store configurado correctamente');
console.log('📊 Estado inicial:', store.getState());
console.log('🛠️ Redux DevTools:', window.__REDUX_DEVTOOLS_EXTENSION__ ? 'Habilitado' : 'No disponible');