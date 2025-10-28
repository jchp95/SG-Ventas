"use strict";

function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
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

  // Redux hooks para tema
  var _window$ReduxProvider = window.ReduxProvider.useApp(),
    tema = _window$ReduxProvider.tema;
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
  var handleSaveUser = function handleSaveUser(user) {
    // Aquí puedes agregar lógica para guardar/actualizar el usuario
    setModalOpen(false);
    setModalUser(null);
  };
  var handleOpenPermissions = function handleOpenPermissions(user) {
    setSelectedUser(user);
    setShowOffCanvas(true);
  };
  var handleCloseOffCanvas = function handleCloseOffCanvas() {
    setShowOffCanvas(false);
    setSelectedUser(null);
  };
  return React.createElement('div', {
    className: "users-page ".concat(tema === 'dark' ? 'theme-dark' : 'theme-light')
  }, React.createElement('div', {
    className: 'parent users-content'
  }, React.createElement('div', {
    className: 'div1 main-container'
  }, React.createElement('div', {
    className: 'div2 users-header-section'
  }, React.createElement('div', {
    className: 'users-header-content d-flex justify-content-between align-items-center'
  }, React.createElement('div', {
    className: 'users-title-section justify-content-start'
  }, React.createElement('h2', {
    className: 'users-title fw-bold mb-0'
  }, 'Administrar datos de usuarios')), React.createElement('div', {
    className: 'users-actions d-flex justify-content-end gap-2'
  }, React.createElement('input', {
    type: 'text',
    className: "form-control input-light ".concat(tema === 'dark' ? 'input-dark' : ''),
    placeholder: 'Buscar usuario...',
    style: {
      maxWidth: 260
    },
    value: search,
    onChange: handleSearchChange
  }), React.createElement('button', {
    className: 'btn btn-primary',
    onClick: handleOpenCreate
  }, React.createElement('i', {
    className: 'bi bi-plus-circle me-2'
  }), 'Crear Usuario')))), React.createElement('div', {
    className: 'div3'
  }, window.TableUsers ? React.createElement(window.TableUsers, {
    search: search,
    page: page,
    pageSize: PAGE_SIZE,
    onPageChange: handlePageChange,
    onEditUser: handleOpenEdit,
    onPermissions: handleOpenPermissions
  }) : null))), window.Modal && window.CreateUserModal && React.createElement(window.Modal, {
    open: modalOpen,
    onClose: handleCloseModal
  }, React.createElement(window.CreateUserModal, {
    user: modalUser,
    onClose: handleCloseModal,
    onSave: handleSaveUser
  })), window.OffCanvasPermissions && React.createElement(window.OffCanvasPermissions, {
    show: showOffCanvas,
    user: selectedUser,
    onClose: handleCloseOffCanvas
  }));
}
window.UsersList = UsersList;