/**
 * Actions para la gestión de autenticación
 */

// Action Types
const AUTH_ACTIONS = {
    LOGIN_REQUEST: 'auth/loginRequest',
    LOGIN_SUCCESS: 'auth/loginSuccess',
    LOGIN_FAILURE: 'auth/loginFailure',
    LOGOUT_REQUEST: 'auth/logoutRequest',
    LOGOUT_SUCCESS: 'auth/logoutSuccess',
    LOGOUT_FAILURE: 'auth/logoutFailure',
    REGISTER_REQUEST: 'auth/registerRequest',
    REGISTER_SUCCESS: 'auth/registerSuccess',
    REGISTER_FAILURE: 'auth/registerFailure',
    CHANGE_PASSWORD_REQUEST: 'auth/changePasswordRequest',
    CHANGE_PASSWORD_SUCCESS: 'auth/changePasswordSuccess',
    CHANGE_PASSWORD_FAILURE: 'auth/changePasswordFailure',
    SET_AUTH_LOADING: 'auth/setAuthLoading',
    CLEAR_AUTH_ERROR: 'auth/clearAuthError'
};

// Action Creators
const authActions = {
    // Login Actions (simples)
    loginRequest: () => ({
        type: AUTH_ACTIONS.LOGIN_REQUEST
    }),

    loginSuccess: (payload) => ({
        type: AUTH_ACTIONS.LOGIN_SUCCESS,
        payload
    }),

    loginFailure: (error) => ({
        type: AUTH_ACTIONS.LOGIN_FAILURE,
        payload: error
    }),

    // Login Thunk (asíncrono)
    login: (credentials) => async (dispatch) => {
        dispatch(authActions.loginRequest());

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });

            const result = await response.json();

            if (response.ok && result.success) {
                console.log('================== INICIO DEBUG LOGIN ==================');
                console.log('📋 Token recibido:', result.data.token);
                
                // Obtener el rol directamente del token JWT ANTES de guardar
                let redirectPath = '/home'; // Por defecto
                let userRole = null;
                let roleCode = null;
                
                console.log('🔍 Verificando disponibilidad de JwtUtils:', typeof window.JwtUtils !== 'undefined');
                
                if (window.JwtUtils) {
                    console.log('✅ JwtUtils disponible');
                    
                    const role = window.JwtUtils.getRoleFromToken(result.data.token);
                    console.log('🎭 Rol extraído del token:', role);
                    console.log('🎭 Tipo de dato del rol:', typeof role);
                    
                    if (role) {
                        userRole = role; // Guardar para Redux
                        console.log('🔍 Verificando RoleConstants:', typeof window.RoleConstants !== 'undefined');
                        
                        if (window.RoleConstants) {
                            // Obtener el código del rol usando RoleConstants
                            roleCode = window.RoleConstants.getRoleCode(role);
                            console.log('🔐 Código del rol obtenido:', roleCode);
                            console.log('🔐 Códigos disponibles:', {
                                ADMIN_CODE: window.RoleConstants.ADMIN_CODE,
                                USER_CODE: window.RoleConstants.USER_CODE
                            });
                            
                            // Verificar si es admin
                            const isAdminResult = window.RoleConstants.isAdmin(roleCode);
                            console.log('👤 ¿Es administrador?:', isAdminResult);
                            console.log('👤 Comparación:', roleCode, '===', window.RoleConstants.ADMIN_CODE, '=', isAdminResult);
                            
                            // Redirigir según el rol
                            if (isAdminResult) {
                                redirectPath = '/home';
                                console.log('✅ Usuario administrador detectado (rol:', role, ', código:', roleCode, ')');
                                console.log('➡️ Redirigiendo a:', redirectPath);
                            } else {
                                redirectPath = '/comun-home';
                                console.log('✅ Usuario común detectado (rol:', role, ', código:', roleCode, ')');
                                console.log('➡️ Redirigiendo a:', redirectPath);
                            }
                        } else {
                            console.error('❌ RoleConstants NO disponible');
                        }
                    } else {
                        console.warn('⚠️ No se pudo extraer el rol del token, usando ruta por defecto');
                        console.warn('⚠️ Ruta por defecto:', redirectPath);
                    }
                } else {
                    console.warn('⚠️ JwtUtils no disponible, usando ruta por defecto');
                    console.warn('⚠️ Ruta por defecto:', redirectPath);
                }

                // Guardar solo token y userName en localStorage (NO el rol por seguridad)
                localStorage.setItem('authToken', result.data.token);
                localStorage.setItem('userName', result.data.userName);
                console.log('💾 Token y userName guardados en localStorage');

                // Dispatch success con el rol incluido
                dispatch(authActions.loginSuccess({
                    token: result.data.token,
                    userName: result.data.userName,
                    role: userRole,
                    roleCode: roleCode,
                    message: 'Login exitoso'
                }));

                console.log('🎯 REDIRECCIÓN FINAL:', redirectPath);
                console.log('================== FIN DEBUG LOGIN ==================');

                // Retornar éxito con la ruta de redirección
                return {
                    success: true,
                    redirectPath: redirectPath
                };
            } else {
                // Dispatch error
                dispatch(authActions.loginFailure(result.message || 'Error en login'));

                // Mostrar notificación de error
                if (window.ToastUtils) {
                    window.ToastUtils.show('error', result.message || 'Error en login', 'Error');
                }

                return {success: false, error: result.message};
            }
        } catch (error) {
            console.error('Error inesperado en login:', error);

            // Dispatch error
            dispatch(authActions.loginFailure('Error de conexión'));

            // Mostrar notificación de error
            if (window.ToastUtils) {
                window.ToastUtils.show('error', 'Error inesperado durante el login', 'Error');
            }

            return {success: false, error: 'Error de conexión'};
        }
    },

    // Register Actions (simples)
    registerRequest: () => ({
        type: AUTH_ACTIONS.REGISTER_REQUEST
    }),

    registerSuccess: (payload) => ({
        type: AUTH_ACTIONS.REGISTER_SUCCESS,
        payload
    }),

    registerFailure: (error) => ({
        type: AUTH_ACTIONS.REGISTER_FAILURE,
        payload: error
    }),

    // Register Thunk (asíncrono)
    register: (userData) => async (dispatch) => {
        dispatch(authActions.registerRequest());

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            const result = await response.json();

            if (response.ok && result.success) {
                // Guardar en localStorage
                localStorage.setItem('authToken', result.data.token);
                localStorage.setItem('userName', result.data.userName);

                // Dispatch success
                dispatch(authActions.registerSuccess({
                    token: result.data.token,
                    userName: result.data.userName,
                    message: 'Registro exitoso'
                }));

                // Mostrar notificación
                if (window.ToastUtils) {
                    window.ToastUtils.show('success', 'Registro exitoso', 'Éxito');
                }

                // Obtener información del usuario para determinar el rol
                const userInfoResponse = await fetch('/api/usuario/me', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${result.data.token}`,
                        'Content-Type': 'application/json'
                    }
                });

                let redirectPath = '/home'; // Por defecto

                if (userInfoResponse.ok) {
                    const userInfo = await userInfoResponse.json();
                    if (userInfo.success && userInfo.data) {
                        // Obtener el código del rol usando RoleConstants
                        const roleCode = window.RoleConstants.getUserRoleCode(userInfo.data);
                        
                        // Redirigir según el rol
                        if (window.RoleConstants.isAdmin(roleCode)) {
                            redirectPath = '/home';
                            console.log('🔑 Usuario administrador detectado, redirigiendo a dashboard admin');
                        } else {
                            redirectPath = '/comun-home';
                            console.log('🔑 Usuario común detectado, redirigiendo a dashboard usuario');
                        }
                    }
                }

                // Redirigir después de un breve delay
                setTimeout(() => {
                    window.location.href = redirectPath;
                }, 1000);

                return {success: true};
            } else {
                // Manejar diferentes códigos de error
                let errorMessage = result.message || 'Error en registro';

                // Si es un 409 (Conflict), personalizar el mensaje
                if (response.status === 409) {
                    errorMessage = result.message || 'El usuario o email ya existe';
                }

                // Si es un 400 (Bad Request) con detalles
                if (response.status === 400 && result.details) {
                    console.error('Detalles de validación:', result.details);
                    errorMessage = result.message || 'Datos inválidos';
                }

                // Dispatch error
                dispatch(authActions.registerFailure(errorMessage));

                // Mostrar notificación de error
                if (window.ToastUtils) {
                    window.ToastUtils.show('error', errorMessage, 'Error');
                }

                return {success: false, error: errorMessage};
            }
        } catch (error) {
            console.error('Error inesperado en registro:', error);

            // Dispatch error
            dispatch(authActions.registerFailure('Error de conexión'));

            // Mostrar notificación de error
            if (window.ToastUtils) {
                window.ToastUtils.show('error', 'Error inesperado durante el registro', 'Error');
            }

            return {success: false, error: 'Error de conexión'};
        }
    },

    // Logout Actions (simples)
    logoutRequest: () => ({
        type: AUTH_ACTIONS.LOGOUT_REQUEST
    }),

    logoutSuccess: () => {
        // Limpiar localStorage
        localStorage.removeItem('authToken');
        localStorage.removeItem('userName');
        console.log('🧹 [AuthActions] LocalStorage limpiado (token, userName)');
        return {
            type: AUTH_ACTIONS.LOGOUT_SUCCESS
        };
    },

    logoutFailure: (error) => ({
        type: AUTH_ACTIONS.LOGOUT_FAILURE,
        payload: error
    }),

    // Logout Thunk (asíncrono)
    logout: () => async (dispatch) => {
        dispatch(authActions.logoutRequest());

        try {
            const token = localStorage.getItem('authToken');

            // Llamar al endpoint de logout
            const response = await fetch('/api/auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token ? `Bearer ${token}` : ''
                }
            });

            if (response.ok) {
                dispatch(authActions.logoutSuccess());

                // Agregar notificación de éxito
                if (window.AppActions) {
                    dispatch(window.AppActions.agregarNotificacion({
                        tipo: 'success',
                        mensaje: 'Sesión cerrada correctamente',
                        autoClose: true
                    }));
                }

                // Redirigir al login después de un breve delay
                setTimeout(() => {
                    window.location.href = '/';
                }, 1000);
            } else {
                // Aunque falle el backend, igual cerramos sesión localmente
                dispatch(authActions.logoutSuccess());
                window.location.href = '/';
            }
        } catch (error) {
            console.error('Error en logout:', error);
            // Aunque falle, igual cerramos sesión localmente
            dispatch(authActions.logoutSuccess());
            window.location.href = '/';
        }
    },

    // Change Password Actions (simples)
    changePasswordRequest: () => ({
        type: AUTH_ACTIONS.CHANGE_PASSWORD_REQUEST
    }),

    changePasswordSuccess: (message) => ({
        type: AUTH_ACTIONS.CHANGE_PASSWORD_SUCCESS,
        payload: message
    }),

    changePasswordFailure: (error) => ({
        type: AUTH_ACTIONS.CHANGE_PASSWORD_FAILURE,
        payload: error
    }),

    // Change Password Thunk (asíncrono)
    changePassword: (passwordData) => async (dispatch) => {
        dispatch(authActions.changePasswordRequest());

        try {
            const token = localStorage.getItem('authToken');

            const response = await fetch('/api/auth/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token ? `Bearer ${token}` : ''
                },
                body: JSON.stringify(passwordData)
            });

            const result = await response.json();

            if (response.ok && result.success) {
                // Dispatch success
                dispatch(authActions.changePasswordSuccess('Contraseña cambiada exitosamente'));

                // Mostrar notificación
                if (window.ToastUtils) {
                    window.ToastUtils.show('success', 'Contraseña cambiada exitosamente', 'Éxito');
                }

                return {success: true};
            } else {
                // Dispatch error
                dispatch(authActions.changePasswordFailure(result.message || 'Error al cambiar contraseña'));

                // Mostrar notificación de error
                if (window.ToastUtils) {
                    window.ToastUtils.show('error', result.message || 'Error al cambiar contraseña', 'Error');
                }

                return {success: false, error: result.message};
            }
        } catch (error) {
            console.error('Error inesperado en cambio de contraseña:', error);

            // Dispatch error
            dispatch(authActions.changePasswordFailure('Error de conexión'));

            // Mostrar notificación de error
            if (window.ToastUtils) {
                window.ToastUtils.show('error', 'Error inesperado al cambiar contraseña', 'Error');
            }

            return {success: false, error: 'Error de conexión'};
        }
    },

    // Utility Actions
    setAuthLoading: (loading) => ({
        type: AUTH_ACTIONS.SET_AUTH_LOADING,
        payload: loading
    }),

    clearAuthError: () => ({
        type: AUTH_ACTIONS.CLEAR_AUTH_ERROR
    }),

    // Action que verifica token y hace login automático
    checkAuthToken: () => {
        const token = localStorage.getItem('authToken');
        const userName = localStorage.getItem('userName');
        if (token && userName) {
            return {
                type: AUTH_ACTIONS.LOGIN_SUCCESS,
                payload: {
                    token,
                    userName,
                    message: 'Sesión restaurada'
                }
            };
        }
        return {type: 'auth/noToken'};
    }
};

// Hacer disponible globalmente
window.AuthActions = authActions;
window.AuthActions.TYPES = AUTH_ACTIONS;

console.log('🔐 Auth Actions cargadas correctamente con Thunks');
