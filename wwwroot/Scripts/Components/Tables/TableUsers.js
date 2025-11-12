"use strict";

function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function TableUsers(props) {
  var data = props.data || [];
  var page = props.page || 0;
  var PAGE_SIZE = props.pageSize || 15;
  var onPageChange = props.onPageChange;

  // Redux hooks para tema
  var _window$ReduxProvider = window.ReduxProvider.useApp(),
    tema = _window$ReduxProvider.tema;

  // Calcular paginación
  var pageCount = Math.ceil(data.length / PAGE_SIZE);
  var pagedData = data.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  React.useEffect(function () {
    if (page > 0 && page >= pageCount && onPageChange) onPageChange(0);
  }, [data.length, page, pageCount, onPageChange]);

  // Estado para el menú de acciones
  var _React$useState = React.useState(null),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    menuRow = _React$useState2[0],
    setMenuRow = _React$useState2[1];

  // Maneja el cierre del menú al hacer clic fuera
  React.useEffect(function () {
    function handleClick(e) {
      if (!e.target.closest('.table-action-menu')) setMenuRow(null);
    }
    if (menuRow !== null) {
      document.addEventListener('mousedown', handleClick);
      return function () {
        return document.removeEventListener('mousedown', handleClick);
      };
    }
  }, [menuRow]);
  var columns = React.useMemo(function () {
    return [{
      Header: '#',
      accessor: 'fidUsuario'
    }, {
      Header: 'Nombre',
      accessor: 'nombre'
    }, {
      Header: 'Usuario',
      accessor: 'nombreUsuario'
    }, {
      Header: 'Email',
      accessor: 'email'
    }, {
      Header: 'Rol',
      accessor: 'roles',
      Cell: function Cell(_ref) {
        var value = _ref.value,
          row = _ref.row;
        var rol = value && value.length > 0 ? value[0] : 'Usuario';
        var nivel = row.original.nivel;
        return React.createElement('span', {
          className: "badge ".concat(rol === 'Administrador' ? 'bg-primary' : 'bg-info'),
          title: "Nivel ".concat(nivel)
        }, rol);
      }
    }, {
      Header: 'Activo',
      accessor: 'activo',
      Cell: function Cell(_ref2) {
        var value = _ref2.value;
        return React.createElement('span', {
          className: "badge ".concat(value ? 'bg-success' : 'bg-danger')
        }, value ? 'Activo' : 'Inactivo');
      }
    }, {
      Header: 'Acciones',
      Cell: function Cell(cell) {
        return React.createElement('div', {
          style: {
            position: 'relative'
          }
        }, React.createElement('button', {
          className: "table-action-icon ".concat(tema === 'dark' ? 'table-action-icon-dark' : ''),
          onClick: function onClick(e) {
            e.stopPropagation();
            setMenuRow(cell.row.id);
          }
        }, React.createElement('i', {
          className: 'bi bi-three-dots-vertical'
        })), menuRow === cell.row.id && React.createElement('div', {
          className: "table-action-menu card shadow-sm ".concat(tema === 'dark' ? 'table-action-menu-dark' : ''),
          style: {
            position: 'absolute',
            top: 0,
            right: 90,
            zIndex: 10,
            minWidth: 120
          }
        }, React.createElement('button', {
          className: "dropdown-item ".concat(tema === 'dark' ? 'dropdown-item-dark' : ''),
          onClick: function onClick() {
            setMenuRow(null);
            if (props.onEditUser) {
              props.onEditUser(cell.row.original);
            }
          }
        }, 'Editar'), React.createElement('button', {
          className: "dropdown-item ".concat(tema === 'dark' ? 'dropdown-item-dark' : ''),
          onClick: function onClick() {
            setMenuRow(null);
            if (props.onPermissions) {
              props.onPermissions(cell.row.original);
            }
          }
        }, 'Permisos'), cell.row.original.activo ? React.createElement('button', {
          className: "dropdown-item text-danger ".concat(tema === 'dark' ? 'dropdown-item-dark dropdown-item-danger-dark' : ''),
          onClick: function onClick() {
            setMenuRow(null);
            if (props.onDeleteUser) {
              props.onDeleteUser(cell.row.original.fidUsuario);
            }
          }
        }, 'Desactivar') : React.createElement('button', {
          className: "dropdown-item text-success ".concat(tema === 'dark' ? 'dropdown-item-dark' : ''),
          onClick: function onClick() {
            setMenuRow(null);
            if (props.onActivateUser) {
              props.onActivateUser(cell.row.original.fidUsuario);
            }
          }
        }, 'Activar')));
      }
    }];
  }, [menuRow, tema]);
  var _window$ReactTable$us = window.ReactTable.useTable({
      columns: columns,
      data: pagedData
    }),
    getTableProps = _window$ReactTable$us.getTableProps,
    getTableBodyProps = _window$ReactTable$us.getTableBodyProps,
    headerGroups = _window$ReactTable$us.headerGroups,
    rows = _window$ReactTable$us.rows,
    prepareRow = _window$ReactTable$us.prepareRow;

  // Mostrar mensaje si no hay datos
  if (data.length === 0) {
    return React.createElement('div', {
      className: 'text-center p-5'
    }, React.createElement('p', {
      className: 'text-muted'
    }, 'No hay usuarios para mostrar.'));
  }
  return React.createElement(React.Fragment, null, React.createElement('div', {
    className: 'users-table-section'
  }, React.createElement('table', Object.assign({
    className: 'react-table'
  }, getTableProps()), React.createElement('thead', null, headerGroups.map(function (headerGroup) {
    return React.createElement('tr', Object.assign({
      key: headerGroup.id
    }, headerGroup.getHeaderGroupProps()), headerGroup.headers.map(function (column) {
      return React.createElement('th', Object.assign({
        key: column.id
      }, column.getHeaderProps()), typeof column.render === 'function' ? column.render('Header') : column.Header);
    }));
  })), React.createElement('tbody', getTableBodyProps(), rows.map(function (row) {
    prepareRow(row);
    return React.createElement('tr', Object.assign({
      key: row.id
    }, row.getRowProps()), row.cells.map(function (cell) {
      return React.createElement('td', Object.assign({
        key: cell.column.id
      }, cell.getCellProps()), typeof cell.render === 'function' ? cell.render('Cell') : cell.value);
    }));
  })))), pageCount > 1 && React.createElement('div', {
    className: 'd-flex justify-content-end align-items-center mt-3',
    style: {
      padding: '0 24px'
    }
  }, React.createElement('button', {
    className: "btn btn-primary ".concat(page === 0 ? 'disabled' : ''),
    style: {
      borderRadius: '8px 0px 0px 8px',
      minWidth: '100px',
      opacity: page === 0 ? 0.6 : 1
    },
    disabled: page === 0,
    onClick: function onClick() {
      if (onPageChange && page > 0) onPageChange(page - 1);
    }
  }, 'Anterior'), React.createElement('span', {
    className: tema === 'dark' ? 'text-light' : 'text-dark',
    style: {
      padding: '8px 16px',
      background: tema === 'dark' ? 'rgba(15, 20, 35, 0.8)' : '#fff',
      border: tema === 'dark' ? '1px solid rgba(67, 97, 238, 0.3)' : '1px solid #e0e0e0',
      minWidth: '140px',
      textAlign: 'center',
      fontSize: '0.9rem'
    }
  }, "P\xE1gina ".concat(page + 1, " de ").concat(pageCount)), React.createElement('button', {
    className: "btn btn-primary ".concat(page >= pageCount - 1 ? 'disabled' : ''),
    style: {
      borderRadius: '0px 8px 8px 0px',
      minWidth: '100px',
      opacity: page >= pageCount - 1 ? 0.6 : 1
    },
    disabled: page >= pageCount - 1,
    onClick: function onClick() {
      if (onPageChange && page < pageCount - 1) onPageChange(page + 1);
    }
  }, 'Siguiente')));
}
window.TableUsers = TableUsers;