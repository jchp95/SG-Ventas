"use strict";

function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function TableUsers(props) {
  var search = props.search || "";
  var page = props.page || 0;
  var PAGE_SIZE = props.pageSize || 15;
  var onPageChange = props.onPageChange;
  var data = [{
    fid_usuario: 1,
    fnombre: "Juan Pérez",
    fnombre_usuario: "jperez",
    femail: "juan@ejemplo.com",
    fnivel: 1,
    factivo: true
  }, {
    fid_usuario: 2,
    fnombre: "Ana Gómez",
    fnombre_usuario: "agomez",
    femail: "ana@ejemplo.com",
    fnivel: 2,
    factivo: false
  }, {
    fid_usuario: 3,
    fnombre: "Camila Gómez",
    fnombre_usuario: "cgomez",
    femail: "camila@ejemplo.com",
    fnivel: 2,
    factivo: true
  }, {
    fid_usuario: 4,
    fnombre: "Pedro Martínez",
    fnombre_usuario: "pmartinez",
    femail: "pedro@ejemplo.com",
    fnivel: 2,
    factivo: false
  }, {
    fid_usuario: 5,
    fnombre: "Laura Fernández",
    fnombre_usuario: "lfernandez",
    femail: "laura@ejemplo.com",
    fnivel: 2,
    factivo: false
  }, {
    fid_usuario: 6,
    fnombre: "Javier López",
    fnombre_usuario: "jlopez",
    femail: "javier@ejemplo.com",
    fnivel: 2,
    factivo: true
  }, {
    fid_usuario: 7,
    fnombre: "Malena Torres",
    fnombre_usuario: "matorres",
    femail: "malena@ejemplo.com",
    fnivel: 2,
    factivo: false
  }, {
    fid_usuario: 8,
    fnombre: "Javier Torres",
    fnombre_usuario: "storres",
    femail: "sofia@ejemplo.com",
    fnivel: 2,
    factivo: false
  }, {
    fid_usuario: 9,
    fnombre: "Carlos Torres",
    fnombre_usuario: "storres",
    femail: "sofia@ejemplo.com",
    fnivel: 2,
    factivo: false
  }, {
    fid_usuario: 10,
    fnombre: "Juan Torres",
    fnombre_usuario: "storres",
    femail: "sofia@ejemplo.com",
    fnivel: 2,
    factivo: false
  }, {
    fid_usuario: 11,
    fnombre: "Juan Torres",
    fnombre_usuario: "storres",
    femail: "sofia@ejemplo.com",
    fnivel: 2,
    factivo: false
  }, {
    fid_usuario: 12,
    fnombre: "Juan Torres",
    fnombre_usuario: "storres",
    femail: "sofia@ejemplo.com",
    fnivel: 2,
    factivo: false
  }, {
    fid_usuario: 13,
    fnombre: "Juan Torres",
    fnombre_usuario: "storres",
    femail: "sofia@ejemplo.com",
    fnivel: 2,
    factivo: false
  }, {
    fid_usuario: 14,
    fnombre: "Juan Torres",
    fnombre_usuario: "storres",
    femail: "sofia@ejemplo.com",
    fnivel: 2,
    factivo: false
  }, {
    fid_usuario: 15,
    fnombre: "Juan Torres",
    fnombre_usuario: "storres",
    femail: "sofia@ejemplo.com",
    fnivel: 2,
    factivo: false
  }, {
    fid_usuario: 16,
    fnombre: "Juan Torres",
    fnombre_usuario: "storres",
    femail: "sofia@ejemplo.com",
    fnivel: 2,
    factivo: false
  }];
  var filteredData = search ? data.filter(function (u) {
    return u.fnombre.toLowerCase().indexOf(search.toLowerCase()) !== -1 || u.fnombre_usuario.toLowerCase().indexOf(search.toLowerCase()) !== -1 || u.femail.toLowerCase().indexOf(search.toLowerCase()) !== -1;
  }) : data;
  var pageCount = Math.ceil(filteredData.length / PAGE_SIZE);
  var pagedData = filteredData.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  React.useEffect(function () {
    if (page > 0 && page >= pageCount && onPageChange) onPageChange(0);
  }, [search, filteredData.length]);

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
      accessor: 'fid_usuario'
    }, {
      Header: 'Nombre',
      accessor: 'fnombre'
    }, {
      Header: 'Usuario',
      accessor: 'fnombre_usuario'
    }, {
      Header: 'Email',
      accessor: 'femail'
    }, {
      Header: 'Nivel',
      accessor: 'fnivel'
    }, {
      Header: 'Activo',
      accessor: 'factivo',
      Cell: function Cell(_ref) {
        var value = _ref.value;
        return value ? 'Sí' : 'No';
      }
    }, {
      Header: 'Acciones',
      Cell: function Cell(cell) {
        return React.createElement('div', {
          style: {
            position: 'relative'
          }
        }, React.createElement('button', {
          className: 'table-action-icon',
          onClick: function onClick(e) {
            e.stopPropagation();
            setMenuRow(cell.row.id);
          }
        }, React.createElement('i', {
          className: 'bi bi-three-dots-vertical'
        })), menuRow === cell.row.id && React.createElement('div', {
          className: 'table-action-menu card shadow-sm',
          style: {
            position: 'absolute',
            top: 0,
            right: 90,
            zIndex: 10,
            minWidth: 120
          }
        }, React.createElement('button', {
          className: 'dropdown-item',
          onClick: function onClick() {
            setMenuRow(null);
            if (props.onEditUser) {
              props.onEditUser(cell.row.original);
            }
          }
        }, 'Editar'), React.createElement('button', {
          className: 'dropdown-item',
          onClick: function onClick() {
            setMenuRow(null);
            if (props.onPermissions) {
              props.onPermissions(cell.row.original);
            }
          }
        }, 'Permisos'), React.createElement('button', {
          className: 'dropdown-item',
          onClick: function onClick() {
            /* lógica anular */setMenuRow(null);
          }
        }, 'Anular'), React.createElement('button', {
          className: 'dropdown-item text-danger',
          onClick: function onClick() {
            /* lógica eliminar */setMenuRow(null);
          }
        }, 'Eliminar')));
      }
    }];
  }, [menuRow]);
  var _window$ReactTable$us = window.ReactTable.useTable({
      columns: columns,
      data: pagedData
    }),
    getTableProps = _window$ReactTable$us.getTableProps,
    getTableBodyProps = _window$ReactTable$us.getTableBodyProps,
    headerGroups = _window$ReactTable$us.headerGroups,
    rows = _window$ReactTable$us.rows,
    prepareRow = _window$ReactTable$us.prepareRow;
  return React.createElement(React.Fragment, null, React.createElement('div', {
    className: 'card shadow-sm'
  }, React.createElement('div', {
    className: 'card-body p-0'
  }, React.createElement('table', Object.assign({
    className: 'table table-hover mb-0'
  }, getTableProps()), React.createElement('thead', {
    className: 'table-light'
  }, headerGroups.map(function (headerGroup) {
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
  }))))), pageCount > 1 && React.createElement('div', {
    className: 'd-flex justify-content-end align-items-center mt-3'
  }, React.createElement('button', {
    style: {
      borderRadius: '8px 0px 0px 8px',
      transition: 'none',
      transform: 'none',
      boxShadow: 'none'
    },
    className: 'register-button',
    disabled: page === 0,
    onClick: function onClick() {
      if (onPageChange) onPageChange(page - 1);
    }
  }, 'Anterior'), React.createElement('span', {
    style: {
      padding: 10,
      background: 'white',
      boxShadow: 'none',
      minWidth: 80,
      textAlign: 'center'
    }
  }, "P\xE1gina ".concat(page + 1, " de ").concat(pageCount)), React.createElement('button', {
    style: {
      borderRadius: '0px 8px 8px 0px',
      transition: 'none',
      transform: 'none',
      boxShadow: 'none'
    },
    className: 'register-button',
    disabled: page >= pageCount - 1,
    onClick: function onClick() {
      if (onPageChange) onPageChange(page + 1);
    }
  }, 'Siguiente')));
}
window.TableUsers = TableUsers;