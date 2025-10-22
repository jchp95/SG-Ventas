"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var UsersList = /*#__PURE__*/function (_React$Component) {
  function UsersList(props) {
    var _this;
    _classCallCheck(this, UsersList);
    _this = _callSuper(this, UsersList, [props]);
    _defineProperty(_this, "handleSearchChange", function (e) {
      _this.setState({
        search: e.target.value,
        page: 0
      });
    });
    _defineProperty(_this, "handlePageChange", function (newPage) {
      _this.setState({
        page: newPage
      });
    });
    _defineProperty(_this, "handleOpenCreate", function () {
      _this.setState({
        modalOpen: true,
        modalUser: null
      });
    });
    _defineProperty(_this, "handleOpenEdit", function (user) {
      _this.setState({
        modalOpen: true,
        modalUser: user
      });
    });
    _defineProperty(_this, "handleCloseModal", function () {
      _this.setState({
        modalOpen: false,
        modalUser: null
      });
    });
    _defineProperty(_this, "handleSaveUser", function (user) {
      // Aquí puedes agregar lógica para guardar/actualizar el usuario
      _this.setState({
        modalOpen: false,
        modalUser: null
      });
    });
    _defineProperty(_this, "handleOpenPermissions", function (user) {
      _this.setState({
        selectedUser: user,
        showOffCanvas: true
      });
    });
    _defineProperty(_this, "handleCloseOffCanvas", function () {
      _this.setState({
        showOffCanvas: false,
        selectedUser: null
      });
    });
    _this.PAGE_SIZE = 15;
    _this.state = {
      search: "",
      page: 0,
      modalOpen: false,
      modalUser: null,
      // null = crear, objeto = editar
      showOffCanvas: false,
      selectedUser: null
    };
    return _this;
  }
  _inherits(UsersList, _React$Component);
  return _createClass(UsersList, [{
    key: "render",
    value: function render() {
      var _this$state = this.state,
        search = _this$state.search,
        page = _this$state.page,
        modalOpen = _this$state.modalOpen,
        modalUser = _this$state.modalUser,
        showOffCanvas = _this$state.showOffCanvas,
        selectedUser = _this$state.selectedUser;
      return /*#__PURE__*/React.createElement("div", {
        className: "users-page"
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
      }, "Administrar datos de usuarios")), /*#__PURE__*/React.createElement("div", {
        className: "users-actions d-flex justify-content-end gap-2"
      }, /*#__PURE__*/React.createElement("input", {
        type: "text",
        className: "form-control input-light",
        placeholder: "Buscar usuario...",
        style: {
          maxWidth: 260
        },
        value: search,
        onChange: this.handleSearchChange
      }), /*#__PURE__*/React.createElement("button", {
        className: "register-button",
        onClick: this.handleOpenCreate
      }, "Crear Usuario")))), /*#__PURE__*/React.createElement("div", {
        className: "div3 users-table-section mt-3"
      }, window.TableUsers ? React.createElement(window.TableUsers, {
        search: search,
        page: page,
        pageSize: this.PAGE_SIZE,
        onPageChange: this.handlePageChange,
        onEditUser: this.handleOpenEdit,
        onPermissions: this.handleOpenPermissions
      }) : null))), window.Modal && window.CreateUserModal && React.createElement(window.Modal, {
        open: modalOpen,
        onClose: this.handleCloseModal
      }, React.createElement(window.CreateUserModal, {
        user: modalUser,
        onClose: this.handleCloseModal,
        onSave: this.handleSaveUser
      })), window.OffCanvasPermissions && React.createElement(window.OffCanvasPermissions, {
        show: showOffCanvas,
        user: selectedUser,
        onClose: this.handleCloseOffCanvas
      }));
    }
  }]);
}(React.Component);
window.UsersList = UsersList;