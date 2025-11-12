"use strict";

/// TableAuditoria.jsx
function TableAuditoria(props) {
  var data = props.data || [];
  var page = props.page || 0;
  var PAGE_SIZE = props.pageSize || 15;
  var onPageChange = props.onPageChange;
  var tipoAuditoria = props.tipoAuditoria || 'tenant'; // 'tenant' o 'usuarios'

  // ✅ Usar window.formatDate del utils
  var formatDate = window.formatDate;

  // Redux hooks para tema
  var _window$ReduxProvider = window.ReduxProvider.useApp(),
    tema = _window$ReduxProvider.tema;

  // Mapeo de IDs a nombres legibles
  var tablaMap = {
    1: "Usuario",
    2: "Producto",
    3: "Cliente",
    4: "Venta",
    5: "Sistema",
    6: "Inventario",
    7: "Categoría",
    8: "Proveedor"
  };
  var accionMap = {
    1: "CREAR",
    2: "EDITAR",
    3: "ELIMINAR",
    4: "PERMISOS",
    5: "LOGIN"
  };
  var usuarioMap = {
    1: "jperez",
    2: "agomez",
    3: "cgomez",
    4: "lfernandez",
    5: "pmartinez",
    6: "jlopez",
    7: "mrodriguez",
    8: "admin"
  };

  // Calcular paginación
  var pageCount = Math.ceil(data.length / PAGE_SIZE);
  var pagedData = data.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  React.useEffect(function () {
    if (page > 0 && page >= pageCount && onPageChange) onPageChange(0);
  }, [data.length, page, pageCount, onPageChange]);

  // Función para obtener el color según el tipo de acción
  function getActionColor(accionNombre) {
    switch (accionNombre) {
      case 'Creación':
      case 'CREAR':
        return 'success';
      case 'Modificación':
      case 'EDITAR':
        return 'warning';
      case 'Eliminación':
      case 'ELIMINAR':
        return 'danger';
      case 'LOGIN':
        return 'info';
      case 'PERMISOS':
        return 'primary';
      default:
        return 'secondary';
    }
  }
  var columns = React.useMemo(function () {
    return [{
      Header: 'Fecha y Hora',
      accessor: 'ffecha',
      Cell: function Cell(_ref) {
        var row = _ref.row;
        // Usar el utils para formatear fecha y hora
        return React.createElement('div', {
          className: 'fecha-cell'
        }, formatDate(row.original.ffecha, row.original.fhora));
      }
    }, {
      Header: 'Usuario',
      accessor: 'fkidUsuario',
      Cell: function Cell(_ref2) {
        var value = _ref2.value,
          row = _ref2.row;
        // Para auditoría de usuarios, mostrar nombre completo y nombre de usuario
        if (tipoAuditoria === 'usuarios' && row.original.nombre_completo) {
          return React.createElement('div', {
            className: 'd-flex flex-column'
          }, React.createElement('span', {
            className: 'fw-semibold'
          }, row.original.nombre_completo), React.createElement('small', {
            className: 'text-muted'
          }, "@".concat(row.original.nombre_usuario)));
        }
        // Para auditoría del tenant, usar el formato anterior
        return row.original.fnombreUsuario || usuarioMap[value] || value || 'N/A';
      }
    }, {
      Header: 'Acción',
      accessor: 'faccion',
      Cell: function Cell(_ref3) {
        var value = _ref3.value,
          row = _ref3.row;
        // Puede venir como string (faccion) o como ID (fkid_accion)
        var accionNombre = value || accionMap[row.original.fkid_accion] || 'Desconocida';
        return React.createElement('span', {
          className: "badge badge-".concat(getActionColor(accionNombre))
        }, accionNombre);
      }
    }, {
      Header: 'Entidad',
      accessor: 'ftabla',
      Cell: function Cell(_ref4) {
        var value = _ref4.value,
          row = _ref4.row;
        // Para auditoría de usuarios, mostrar nombre legible
        if (tipoAuditoria === 'usuarios' && value) {
          if (value === 'TbUsuarioCentral') return 'Usuario';
          if (value.includes('IdentityUser')) return 'Usuario (Auth)';
          return value;
        }
        // Para auditoría del tenant, usar el mapa
        return value || tablaMap[row.original.fkid_tabla] || 'N/A';
      }
    }, {
      Header: 'Descripción',
      accessor: tipoAuditoria === 'usuarios' ? 'fdetalles' : 'fjustificacion',
      Cell: function Cell(_ref5) {
        var value = _ref5.value;
        return React.createElement('div', {
          className: 'descripcion-cell',
          style: {
            maxWidth: '300px',
            whiteSpace: 'normal',
            wordWrap: 'break-word',
            lineHeight: '1.4'
          },
          title: value || 'Sin descripción' // Tooltip al pasar el mouse
        }, value || 'Sin descripción');
      }
    }, {
      Header: 'IP / PC',
      accessor: tipoAuditoria === 'usuarios' ? 'fdireccion_ip' : 'fnombrepc',
      Cell: function Cell(_ref6) {
        var value = _ref6.value;
        return React.createElement('div', {
          className: 'pc-cell'
        }, value || 'N/A');
      }
    }, {
      Header: 'Sincronizado',
      accessor: 'festado_sync',
      Cell: function Cell(_ref7) {
        var value = _ref7.value;
        return value === 'S' ? 'Sí' : 'No';
      }
    }];
  }, []);
  var _window$ReactTable$us = window.ReactTable.useTable({
      columns: columns,
      data: pagedData
    }),
    getTableProps = _window$ReactTable$us.getTableProps,
    getTableBodyProps = _window$ReactTable$us.getTableBodyProps,
    headerGroups = _window$ReactTable$us.headerGroups,
    rows = _window$ReactTable$us.rows,
    prepareRow = _window$ReactTable$us.prepareRow;

  /// Mostrar mensaje si no hay datos
  if (data.length === 0) {
    return React.createElement('div', {
      className: 'text-center p-5'
    }, React.createElement('p', {
      className: 'text-muted'
    }, 'No hay registros de auditoría para mostrar.'));
  }
  return React.createElement(React.Fragment, null, React.createElement('div', {
    className: 'auditoria-table-section'
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
window.TableAuditoria = TableAuditoria;