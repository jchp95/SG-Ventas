/**
 * Store principal de Redux
 * Combina todos los reducers y crea el store
 */

// Extraer Redux del objeto global
const {createStore, combineReducers, applyMiddleware} = Redux;

// Middleware thunk simple para manejar acciones asíncronas
const thunkMiddleware = ({dispatch, getState}) => next => action => {
    if (typeof action === 'function') {
        return action(dispatch, getState);
    }
    return next(action);
};

// Reducer por defecto para casos donde los reducers no están cargados
const defaultReducer = (state = {}) => state;

// Combinar todos los reducers con verificaciones de seguridad
const rootReducer = combineReducers({
    usuarios: window.UsuariosReducer || defaultReducer,
    ventas: window.VentasReducer || defaultReducer,
    clientes: window.ClientesReducer || defaultReducer,
    app: window.AppReducer || defaultReducer,
    auth: window.AuthReducer || defaultReducer,
    auditoria: window.AuditoriaReducer || defaultReducer,
   
});

// Crear el store con middleware thunk
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

// Hacer disponible globalmente
window.ReduxStore = {
    store,

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
    getState: () => store.getState(),
    dispatch: (action) => store.dispatch(action),
    subscribe: (listener) => store.subscribe(listener)
};

// Log del estado inicial
console.log('🚀 Redux Store configurado correctamente con Thunk middleware');
console.log('📊 Estado inicial:', store.getState());
console.log('🛠️ Redux DevTools:', window.__REDUX_DEVTOOLS_EXTENSION__ ? 'Habilitado' : 'No disponible');
