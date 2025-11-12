"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
// filepath: /Users/julio/Documents/Proyectos de Programacion/Anthony trabajo RD/Ventas/wwwroot/Scripts/Pages/Users/UsersList.jsx
function UsersList() {
  var PAGE_SIZE = 15;
  var _React$useState = React.useState(""),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    search = _React$useState2[0],
    setSearch = _React$useState2[1];
  var _React$useState3 = React.useState(0),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    page = _React$useState4[0],
    setPage = _React$useState4[1];
  var _React$useState5 = React.useState(false),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    modalOpen = _React$useState6[0],
    setModalOpen = _React$useState6[1];
  var _React$useState7 = React.useState(null),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    modalUser = _React$useState8[0],
    setModalUser = _React$useState8[1]; // null = crear, objeto = editar
  var _React$useState9 = React.useState(false),
    _React$useState0 = _slicedToArray(_React$useState9, 2),
    showOffCanvas = _React$useState0[0],
    setShowOffCanvas = _React$useState0[1];
  var _React$useState1 = React.useState(null),
    _React$useState10 = _slicedToArray(_React$useState1, 2),
    selectedUser = _React$useState10[0],
    setSelectedUser = _React$useState10[1];
  var _React$useState11 = React.useState('todos'),
    _React$useState12 = _slicedToArray(_React$useState11, 2),
    filterEstado = _React$useState12[0],
    setFilterEstado = _React$useState12[1];

  /// Redux hooks
  var _window$ReduxProvider = window.ReduxProvider.useApp(),
    tema = _window$ReduxProvider.tema;
  var _window$ReduxProvider2 = window.ReduxProvider.useUsuarios(),
    usuarios = _window$ReduxProvider2.usuarios,
    cargando = _window$ReduxProvider2.cargando;
  var dispatch = window.ReduxProvider.useDispatch();

  // Cargar usuarios al montar el componente
  React.useEffect(function () {
    dispatch(window.UsuariosActions.fetchUsuarios());
  }, []);

  // Filtrar usuarios
  var usuariosFiltrados = React.useMemo(function () {
    var filtered = usuarios || [];

    // Filtrar por búsqueda
    if (search) {
      var searchLower = search.toLowerCase();
      filtered = filtered.filter(function (u) {
        return u.nombre.toLowerCase().includes(searchLower) || u.nombreUsuario.toLowerCase().includes(searchLower) || u.email.toLowerCase().includes(searchLower);
      });
    }

    // Filtrar por estado
    if (filterEstado === 'activos') {
      filtered = filtered.filter(function (u) {
        return u.activo;
      });
    } else if (filterEstado === 'inactivos') {
      filtered = filtered.filter(function (u) {
        return !u.activo;
      });
    }
    return filtered;
  }, [usuarios, search, filterEstado]);
  var handleSearchChange = function handleSearchChange(e) {
    setSearch(e.target.value);
    setPage(0);
  };
  var handlePageChange = function handlePageChange(newPage) {
    setPage(newPage);
  };
  var handleOpenCreate = function handleOpenCreate() {
    setModalOpen(true);
    setModalUser(null);
  };
  var handleOpenEdit = function handleOpenEdit(user) {
    setModalOpen(true);
    setModalUser(user);
  };
  var handleCloseModal = function handleCloseModal() {
    setModalOpen(false);
    setModalUser(null);
  };
  var handleSaveUser = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(userData) {
      var result, _window$ToastUtils, _result, errorMessage, fieldErrors, _window$ToastUtils2, _window$ToastUtils3, _window$ToastUtils4, _result2, _errorMessage, _fieldErrors, _window$ToastUtils5, _window$ToastUtils6;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            if (!modalUser) {
              _context.n = 5;
              break;
            }
            _context.n = 1;
            return dispatch(window.UsuariosActions.editarUsuario(_objectSpread(_objectSpread({}, userData), {}, {
              fidUsuario: modalUser.fidUsuario
            })));
          case 1:
            result = _context.v;
            if (!(result && result.success)) {
              _context.n = 2;
              break;
            }
            (_window$ToastUtils = window.ToastUtils) === null || _window$ToastUtils === void 0 || _window$ToastUtils.success('Usuario actualizado correctamente', 'Éxito');
            handleCloseModal();
            _context.n = 4;
            break;
          case 2:
            errorMessage = ((_result = result) === null || _result === void 0 ? void 0 : _result.error) || 'Error al actualizar el usuario'; // Detectar errores específicos del mensaje
            fieldErrors = {};
            if (errorMessage.includes('nombre de usuario') && errorMessage.includes('ya está en uso')) {
              fieldErrors.nombreUsuario = errorMessage;
            } else if (errorMessage.includes('email') && errorMessage.includes('ya está en uso')) {
              fieldErrors.email = errorMessage;
            }

            // Si hay errores de campo, mostrar toast genérico y devolver errores específicos
            if (!(Object.keys(fieldErrors).length > 0)) {
              _context.n = 3;
              break;
            }
            (_window$ToastUtils2 = window.ToastUtils) === null || _window$ToastUtils2 === void 0 || _window$ToastUtils2.error('El usuario no pudo ser actualizado. Revise los campos marcados.', 'Error de validación');
            return _context.a(2, {
              success: false,
              fieldErrors: fieldErrors
            });
          case 3:
            (_window$ToastUtils3 = window.ToastUtils) === null || _window$ToastUtils3 === void 0 || _window$ToastUtils3.error(errorMessage, 'Error');
          case 4:
            _context.n = 9;
            break;
          case 5:
            _context.n = 6;
            return dispatch(window.UsuariosActions.crearUsuario(userData));
          case 6:
            result = _context.v;
            if (!(result && result.success)) {
              _context.n = 7;
              break;
            }
            (_window$ToastUtils4 = window.ToastUtils) === null || _window$ToastUtils4 === void 0 || _window$ToastUtils4.success('Usuario creado correctamente', 'Éxito');
            handleCloseModal();
            _context.n = 9;
            break;
          case 7:
            _errorMessage = ((_result2 = result) === null || _result2 === void 0 ? void 0 : _result2.error) || 'Error al crear el usuario'; // Detectar errores específicos del mensaje
            _fieldErrors = {};
            if (_errorMessage.includes('nombre de usuario') && _errorMessage.includes('ya está en uso')) {
              _fieldErrors.nombreUsuario = _errorMessage;
            } else if (_errorMessage.includes('email') && _errorMessage.includes('ya está en uso')) {
              _fieldErrors.email = _errorMessage;
            }

            // Si hay errores de campo, mostrar toast genérico y devolver errores específicos
            if (!(Object.keys(_fieldErrors).length > 0)) {
              _context.n = 8;
              break;
            }
            (_window$ToastUtils5 = window.ToastUtils) === null || _window$ToastUtils5 === void 0 || _window$ToastUtils5.error('El usuario no pudo ser creado. Revise los campos marcados.', 'Error de validación');
            return _context.a(2, {
              success: false,
              fieldErrors: _fieldErrors
            });
          case 8:
            (_window$ToastUtils6 = window.ToastUtils) === null || _window$ToastUtils6 === void 0 || _window$ToastUtils6.error(_errorMessage, 'Error');
          case 9:
            return _context.a(2, result);
        }
      }, _callee);
    }));
    return function handleSaveUser(_x) {
      return _ref.apply(this, arguments);
    };
  }();
  var handleDeleteUser = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(userId) {
      var result, _window$ToastUtils7, _window$ToastUtils8;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.n) {
          case 0:
            if (!confirm('¿Está seguro de que desea desactivar este usuario?')) {
              _context2.n = 2;
              break;
            }
            _context2.n = 1;
            return dispatch(window.UsuariosActions.eliminarUsuarioById(userId));
          case 1:
            result = _context2.v;
            if (result && result.success) {
              (_window$ToastUtils7 = window.ToastUtils) === null || _window$ToastUtils7 === void 0 || _window$ToastUtils7.success('Usuario desactivado correctamente', 'Éxito');
            } else {
              (_window$ToastUtils8 = window.ToastUtils) === null || _window$ToastUtils8 === void 0 || _window$ToastUtils8.error((result === null || result === void 0 ? void 0 : result.error) || 'Error al desactivar el usuario', 'Error');
            }
          case 2:
            return _context2.a(2);
        }
      }, _callee2);
    }));
    return function handleDeleteUser(_x2) {
      return _ref2.apply(this, arguments);
    };
  }();
  var handleActivateUser = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(userId) {
      var result, _window$ToastUtils9, _window$ToastUtils0;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.n) {
          case 0:
            if (!confirm('¿Está seguro de que desea activar este usuario?')) {
              _context3.n = 2;
              break;
            }
            _context3.n = 1;
            return dispatch(window.UsuariosActions.activarUsuario(userId));
          case 1:
            result = _context3.v;
            if (result && result.success) {
              (_window$ToastUtils9 = window.ToastUtils) === null || _window$ToastUtils9 === void 0 || _window$ToastUtils9.success('Usuario activado correctamente', 'Éxito');
            } else {
              (_window$ToastUtils0 = window.ToastUtils) === null || _window$ToastUtils0 === void 0 || _window$ToastUtils0.error((result === null || result === void 0 ? void 0 : result.error) || 'Error al activar el usuario', 'Error');
            }
          case 2:
            return _context3.a(2);
        }
      }, _callee3);
    }));
    return function handleActivateUser(_x3) {
      return _ref3.apply(this, arguments);
    };
  }();
  var handleOpenPermissions = function handleOpenPermissions(user) {
    setSelectedUser(user);
    setShowOffCanvas(true);
  };
  var handleCloseOffCanvas = function handleCloseOffCanvas() {
    setShowOffCanvas(false);
    setSelectedUser(null);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "users-page ".concat(tema === 'dark' ? 'theme-dark' : 'theme-light')
  }, /*#__PURE__*/React.createElement("div", {
    className: "parent users-content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "div1 main-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "div2 users-header-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "users-header-content d-flex justify-content-between align-items-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "users-title-section justify-content-start"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "users-title fw-bold mb-0"
  }, "Gesti\xF3n de Usuarios"), /*#__PURE__*/React.createElement("p", {
    className: "users-subtitle"
  }, "Administre los usuarios de su empresa")), /*#__PURE__*/React.createElement("div", {
    className: "users-actions d-flex justify-content-end gap-2"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "form-control input-light ".concat(tema === 'dark' ? 'input-dark' : ''),
    placeholder: "Buscar usuarios...",
    style: {
      maxWidth: 260
    },
    value: search,
    onChange: handleSearchChange
  }), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: handleOpenCreate,
    style: {
      whiteSpace: 'nowrap'
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-plus-circle me-2"
  }), "Nuevo Usuario")))), /*#__PURE__*/React.createElement("div", {
    className: "users-filters-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "filters-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "filter-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "filter-label"
  }, "Estado"), /*#__PURE__*/React.createElement("select", {
    className: "form-control input-light ".concat(tema === 'dark' ? 'input-dark' : ''),
    value: filterEstado,
    onChange: function onChange(e) {
      setFilterEstado(e.target.value);
      setPage(0);
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: "todos"
  }, "Todos los estados"), /*#__PURE__*/React.createElement("option", {
    value: "activos"
  }, "Activos"), /*#__PURE__*/React.createElement("option", {
    value: "inactivos"
  }, "Inactivos"))), /*#__PURE__*/React.createElement("div", {
    className: "filter-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "filter-label"
  }, "Resultados"), /*#__PURE__*/React.createElement("div", {
    className: "form-control input-light ".concat(tema === 'dark' ? 'input-dark' : ''),
    style: {
      backgroundColor: 'transparent',
      border: 'none',
      paddingTop: '0.5rem'
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-funnel me-2"
  }), usuariosFiltrados.length, " usuario(s) encontrado(s)")), /*#__PURE__*/React.createElement("div", {
    className: "filter-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "filter-label invisible"
  }, "Limpiar"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-outline-secondary",
    onClick: function onClick() {
      setSearch("");
      setFilterEstado('todos');
      setPage(0);
    }
  }, "Limpiar filtros")))), /*#__PURE__*/React.createElement("div", {
    className: "div3"
  }, cargando ? /*#__PURE__*/React.createElement("div", {
    className: "text-center p-5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "spinner-border text-primary",
    role: "status"
  }, /*#__PURE__*/React.createElement("span", {
    className: "visually-hidden"
  }, "Cargando..."))) : window.TableUsers ? React.createElement(window.TableUsers, {
    data: usuariosFiltrados,
    page: page,
    pageSize: PAGE_SIZE,
    onPageChange: handlePageChange,
    onEditUser: handleOpenEdit,
    onDeleteUser: handleDeleteUser,
    onActivateUser: handleActivateUser,
    onPermissions: handleOpenPermissions
  }) : null))), modalOpen && /*#__PURE__*/React.createElement(window.CreateUserModal, {
    show: modalOpen,
    onClose: handleCloseModal,
    onSave: handleSaveUser,
    usuario: modalUser
  }), showOffCanvas && selectedUser && /*#__PURE__*/React.createElement(window.OffCanvasPermissions, {
    show: showOffCanvas,
    onClose: handleCloseOffCanvas,
    usuario: selectedUser
  }));
}
window.UsersList = UsersList;
console.log('✅ UsersList component loaded');