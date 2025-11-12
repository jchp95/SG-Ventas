"use strict";

/**
 * Store principal de Redux
 * Combina todos los reducers y crea el store
 */

// Extraer Redux del objeto global
var _Redux = Redux,
  createStore = _Redux.createStore,
  combineReducers = _Redux.combineReducers,
  applyMiddleware = _Redux.applyMiddleware;

// Middleware thunk simple para manejar acciones asíncronas
var thunkMiddleware = function thunkMiddleware(_ref) {
  var dispatch = _ref.dispatch,
    getState = _ref.getState;
  return function (next) {
    return function (action) {
      if (typeof action === 'function') {
        return action(dispatch, getState);
      }
      return next(action);
    };
  };
};

// Reducer por defecto para casos donde los reducers no están cargados
var defaultReducer = function defaultReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return state;
};

// Combinar todos los reducers con verificaciones de seguridad
var rootReducer = combineReducers({
  usuarios: window.UsuariosReducer || defaultReducer,
  ventas: window.VentasReducer || defaultReducer,
  clientes: window.ClientesReducer || defaultReducer,
  app: window.AppReducer || defaultReducer,
  auth: window.AuthReducer || defaultReducer,
  auditoria: window.AuditoriaReducer || defaultReducer
});

// Crear el store con middleware thunk
var store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

// Hacer disponible globalmente
window.ReduxStore = {
  store: store,
  // Actions
  usuarios: window.UsuariosActions,
  ventas: window.VentasActions,
  clientes: window.ClientesActions,
  app: window.AppActions,
  auth: window.AuthActions,
  auditoria: window.AuditoriaActions,
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
console.log('🚀 Redux Store configurado correctamente con Thunk middleware');
console.log('📊 Estado inicial:', store.getState());
console.log('🛠️ Redux DevTools:', window.__REDUX_DEVTOOLS_EXTENSION__ ? 'Habilitado' : 'No disponible');