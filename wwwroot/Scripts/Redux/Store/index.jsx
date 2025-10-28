/**
 * Store principal de Redux
 * Combina todos los reducers y crea el store
 */

// Extraer Redux del objeto global
const { createStore, combineReducers } = Redux;

// Combinar todos los reducers
const rootReducer = combineReducers({
    usuarios: window.UsuariosReducer,
    ventas: window.VentasReducer,
    app: window.AppReducer
});

// Crear el store
const store = createStore(
    rootReducer,
    // Habilitar Redux DevTools si están disponibles
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// Hacer disponible globalmente
window.ReduxStore = {
    store,
    
    // Actions
    usuarios: window.UsuariosActions,
    ventas: window.VentasActions,
    app: window.AppActions,
    
    // Selectores
    selectors: window.ReduxSelectors,
    
    // Métodos de conveniencia
    getState: () => store.getState(),
    dispatch: (action) => store.dispatch(action),
    subscribe: (listener) => store.subscribe(listener)
};

// Log del estado inicial
console.log('🚀 Redux Store configurado correctamente');
console.log('📊 Estado inicial:', store.getState());
console.log('🛠️ Redux DevTools:', window.__REDUX_DEVTOOLS_EXTENSION__ ? 'Habilitado' : 'No disponible');
