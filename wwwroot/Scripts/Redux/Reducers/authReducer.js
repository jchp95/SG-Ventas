"use strict";

function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
      _defineProperty(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}
function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}
function _toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
/**
 * Reducer para la gestión del estado de autenticación
 */

// Cargar el estado inicial desde localStorage
var getInitialAuthState = function getInitialAuthState() {
  var token = localStorage.getItem('authToken');
  var userName = localStorage.getItem('userName');

  // Extraer el rol del token si existe (NO del localStorage)
  var userRole = null;
  var roleCode = null;
  if (token && window.JwtUtils) {
    userRole = window.JwtUtils.getRoleFromToken(token);
    roleCode = userRole && window.RoleConstants ? window.RoleConstants.getRoleCode(userRole) : null;
  }
  console.log('🔍 [AuthReducer] Inicializando estado desde localStorage:', {
    token: token ? "".concat(token.substring(0, 20), "...") : 'null',
    userName: userName || 'null',
    userRole: userRole || 'null (extraído del token)',
    isAuthenticated: !!token
  });
  return {
    isAuthenticated: !!token,
    token: token || null,
    userName: userName || null,
    userRole: userRole,
    roleCode: roleCode,
    loading: false,
    error: null,
    message: null
  };
};
var authReducer = function authReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getInitialAuthState();
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var _ref = window.AuthActions || {},
    TYPES = _ref.TYPES;
  switch (action.type) {
    case TYPES === null || TYPES === void 0 ? void 0 : TYPES.LOGIN_REQUEST:
    case TYPES === null || TYPES === void 0 ? void 0 : TYPES.REGISTER_REQUEST:
    case TYPES === null || TYPES === void 0 ? void 0 : TYPES.CHANGE_PASSWORD_REQUEST:
    case TYPES === null || TYPES === void 0 ? void 0 : TYPES.LOGOUT_REQUEST:
      return _objectSpread(_objectSpread({}, state), {}, {
        loading: true,
        error: null,
        message: null
      });
    case TYPES === null || TYPES === void 0 ? void 0 : TYPES.LOGIN_SUCCESS:
    case TYPES === null || TYPES === void 0 ? void 0 : TYPES.REGISTER_SUCCESS:
      console.log('✅ [AuthReducer] Login/Register exitoso, guardando token y rol');
      console.log('📦 [AuthReducer] Payload recibido:', action.payload);
      return _objectSpread(_objectSpread({}, state), {}, {
        isAuthenticated: true,
        token: action.payload.token,
        userName: action.payload.userName,
        userRole: action.payload.role || null,
        roleCode: action.payload.roleCode || null,
        loading: false,
        error: null,
        message: action.payload.message
      });
    case TYPES === null || TYPES === void 0 ? void 0 : TYPES.LOGIN_FAILURE:
    case TYPES === null || TYPES === void 0 ? void 0 : TYPES.REGISTER_FAILURE:
      console.log('❌ [AuthReducer] Login/Register fallido');
      return _objectSpread(_objectSpread({}, state), {}, {
        isAuthenticated: false,
        token: null,
        userName: null,
        loading: false,
        error: action.payload,
        message: null
      });
    case TYPES === null || TYPES === void 0 ? void 0 : TYPES.LOGOUT_SUCCESS:
      console.log('🚪 [AuthReducer] Logout exitoso, limpiando token y rol');
      return _objectSpread(_objectSpread({}, state), {}, {
        isAuthenticated: false,
        token: null,
        userName: null,
        userRole: null,
        roleCode: null,
        loading: false,
        error: null,
        message: 'Sesión cerrada correctamente'
      });
    case TYPES === null || TYPES === void 0 ? void 0 : TYPES.LOGOUT_FAILURE:
      return _objectSpread(_objectSpread({}, state), {}, {
        loading: false,
        error: action.payload,
        message: null
      });
    case TYPES === null || TYPES === void 0 ? void 0 : TYPES.CHANGE_PASSWORD_SUCCESS:
      return _objectSpread(_objectSpread({}, state), {}, {
        loading: false,
        error: null,
        message: action.payload
      });
    case TYPES === null || TYPES === void 0 ? void 0 : TYPES.CHANGE_PASSWORD_FAILURE:
      return _objectSpread(_objectSpread({}, state), {}, {
        loading: false,
        error: action.payload,
        message: null
      });
    case TYPES === null || TYPES === void 0 ? void 0 : TYPES.SET_AUTH_LOADING:
      return _objectSpread(_objectSpread({}, state), {}, {
        loading: action.payload
      });
    case TYPES === null || TYPES === void 0 ? void 0 : TYPES.CLEAR_AUTH_ERROR:
      return _objectSpread(_objectSpread({}, state), {}, {
        error: null,
        message: null
      });
    default:
      return state;
  }
};

// Hacer disponible globalmente
window.AuthReducer = authReducer;
console.log('🔐 Auth Reducer cargado correctamente');