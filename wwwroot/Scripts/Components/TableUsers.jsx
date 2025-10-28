function TableUsers(props) {
    const search = props.search || "";
    const page = props.page || 0;
    const PAGE_SIZE = props.pageSize || 15;
    const onPageChange = props.onPageChange;
    
    // Redux hooks para tema
    const { tema } = window.ReduxProvider.useApp();

    var data = [
        { fid_usuario: 1, fnombre: "Juan Pérez", fnombre_usuario: "jperez", femail: "juan@ejemplo.com", fnivel: 1, factivo: true },
        { fid_usuario: 2, fnombre: "Ana Gómez", fnombre_usuario: "agomez", femail: "ana@ejemplo.com", fnivel: 2, factivo: false },
        { fid_usuario: 3, fnombre: "Camila Gómez", fnombre_usuario: "cgomez", femail: "camila@ejemplo.com", fnivel: 2, factivo: true },
        { fid_usuario: 4, fnombre: "Pedro Martínez", fnombre_usuario: "pmartinez", femail: "pedro@ejemplo.com", fnivel: 2, factivo: false },
        { fid_usuario: 5, fnombre: "Laura Fernández", fnombre_usuario: "lfernandez", femail: "laura@ejemplo.com", fnivel: 2, factivo: false },
        { fid_usuario: 6, fnombre: "Javier López", fnombre_usuario: "jlopez", femail: "javier@ejemplo.com", fnivel: 2, factivo: true },
        { fid_usuario: 7, fnombre: "Malena Torres", fnombre_usuario: "matorres", femail: "malena@ejemplo.com", fnivel: 2, factivo: false },
        { fid_usuario: 8, fnombre: "Javier Torres", fnombre_usuario: "storres", femail: "sofia@ejemplo.com", fnivel: 2, factivo: false },
        { fid_usuario: 9, fnombre: "Carlos Torres", fnombre_usuario: "storres", femail: "sofia@ejemplo.com", fnivel: 2, factivo: false },
        { fid_usuario: 10, fnombre: "Juan Torres", fnombre_usuario: "storres", femail: "sofia@ejemplo.com", fnivel: 2, factivo: false },
        { fid_usuario: 11, fnombre: "Juan Torres", fnombre_usuario: "storres", femail: "sofia@ejemplo.com", fnivel: 2, factivo: false },
        { fid_usuario: 12, fnombre: "Juan Torres", fnombre_usuario: "storres", femail: "sofia@ejemplo.com", fnivel: 2, factivo: false },
        { fid_usuario: 13, fnombre: "Juan Torres", fnombre_usuario: "storres", femail: "sofia@ejemplo.com", fnivel: 2, factivo: false },
        { fid_usuario: 14, fnombre: "Juan Torres", fnombre_usuario: "storres", femail: "sofia@ejemplo.com", fnivel: 2, factivo: false },
        { fid_usuario: 15, fnombre: "Juan Torres", fnombre_usuario: "storres", femail: "sofia@ejemplo.com", fnivel: 2, factivo: false },
        { fid_usuario: 16, fnombre: "Juan Torres", fnombre_usuario: "storres", femail: "sofia@ejemplo.com", fnivel: 2, factivo: false },
        
    ];

    var filteredData = search ? data.filter(function(u) {
        return u.fnombre.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
            u.fnombre_usuario.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
            u.femail.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    }) : data;

    var pageCount = Math.ceil(filteredData.length / PAGE_SIZE);
    var pagedData = filteredData.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

    React.useEffect(function() {
        if (page > 0 && page >= pageCount && onPageChange) onPageChange(0);
    }, [search, filteredData.length]);

    // Estado para el menú de acciones
    const [menuRow, setMenuRow] = React.useState(null);

    // Maneja el cierre del menú al hacer clic fuera
    React.useEffect(function() {
        function handleClick(e) {
            if (!e.target.closest('.table-action-menu')) setMenuRow(null);
        }
        if (menuRow !== null) {
            document.addEventListener('mousedown', handleClick);
            return () => document.removeEventListener('mousedown', handleClick);
        }
    }, [menuRow]);

    var columns = React.useMemo(function() {
        return [
            { Header: '#', accessor: 'fid_usuario' },
            { Header: 'Nombre', accessor: 'fnombre' },
            { Header: 'Usuario', accessor: 'fnombre_usuario' },
            { Header: 'Email', accessor: 'femail' },
            { Header: 'Nivel', accessor: 'fnivel' },
            { Header: 'Activo', accessor: 'factivo', Cell: function({ value }) { return value ? 'Sí' : 'No'; } },
            { Header: 'Acciones', Cell: function(cell) {
                return React.createElement('div', {style: {position: 'relative'}},
                    React.createElement('button', {
                        className: `table-action-icon ${tema === 'dark' ? 'table-action-icon-dark' : ''}`,
                        onClick: function(e) {
                            e.stopPropagation();
                            setMenuRow(cell.row.id);
                        }
                    }, React.createElement('i', {className: 'bi bi-three-dots-vertical'})),
                    menuRow === cell.row.id && React.createElement('div', {
                        className: `table-action-menu card shadow-sm ${tema === 'dark' ? 'table-action-menu-dark' : ''}`,
                        style: {position: 'absolute', top: 0, right: 90, zIndex: 10, minWidth: 120}
                    },
                        React.createElement('button', {
                            className: `dropdown-item ${tema === 'dark' ? 'dropdown-item-dark' : ''}`,
                            onClick: function() {
                                setMenuRow(null);
                                if (props.onEditUser) {
                                    props.onEditUser(cell.row.original);
                                }
                            }
                        }, 'Editar'),
                        React.createElement('button', {
                            className: `dropdown-item ${tema === 'dark' ? 'dropdown-item-dark' : ''}`,
                            onClick: function() {
                                setMenuRow(null);
                                if (props.onPermissions) {
                                    props.onPermissions(cell.row.original);
                                }
                            }
                        }, 'Permisos'),
                        React.createElement('button', {
                            className: `dropdown-item ${tema === 'dark' ? 'dropdown-item-dark' : ''}`,
                            onClick: function() {
                                setMenuRow(null);
                                if (window.Toats) window.Toats.show('accent', 'Usuario anulado');
                            }
                        }, 'Anular'),
                        React.createElement('button', {
                            className: `dropdown-item text-danger ${tema === 'dark' ? 'dropdown-item-dark dropdown-item-danger-dark' : ''}`,
                            onClick: function() {
                                setMenuRow(null);
                                if (window.Toats) window.Toats.show('danger', 'Usuario eliminado');
                            }
                        }, 'Eliminar')
                    )
                );
            } }
        ];
    }, [menuRow]);

    var {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = window.ReactTable.useTable({ columns: columns, data: pagedData });

    return (
        React.createElement(React.Fragment, null,
            React.createElement('div', {className: 'users-table-section'},
                React.createElement('table', Object.assign({className: 'react-table'}, getTableProps()),
                    React.createElement('thead', null,
                        headerGroups.map(function(headerGroup) {
                            return React.createElement('tr', Object.assign({key: headerGroup.id}, headerGroup.getHeaderGroupProps()),
                                headerGroup.headers.map(function(column) {
                                    return React.createElement('th', Object.assign({key: column.id}, column.getHeaderProps()),
                                        typeof column.render === 'function'
                                            ? column.render('Header')
                                            : column.Header
                                    );
                                })
                            );
                        })
                    ),
                    React.createElement('tbody', getTableBodyProps(),
                        rows.map(function(row) {
                            prepareRow(row);
                            return React.createElement('tr', Object.assign({key: row.id}, row.getRowProps()),
                                row.cells.map(function(cell) {
                                    return React.createElement('td', Object.assign({key: cell.column.id}, cell.getCellProps()),
                                        typeof cell.render === 'function'
                                            ? cell.render('Cell')
                                            : cell.value
                                    );
                                })
                            );
                        })
                    )
                )
            ),
            pageCount > 1 && React.createElement('div', {
                className: 'd-flex justify-content-end align-items-center mt-3',
                style: { padding: '0 24px' }
            },
                React.createElement('button', {
                    className: `btn btn-primary ${page === 0 ? 'disabled' : ''}`,
                    style: { 
                        borderRadius: '8px 0px 0px 8px', 
                        minWidth: '100px',
                        opacity: page === 0 ? 0.6 : 1
                    },
                    disabled: page === 0,
                    onClick: function() { if (onPageChange && page > 0) onPageChange(page - 1); }
                }, 'Anterior'),
                React.createElement('span', {
                    className: tema === 'dark' ? 'text-light' : 'text-dark',
                    style: { 
                        padding: '8px 16px', 
                        background: tema === 'dark' ? 'rgba(15, 20, 35, 0.8)' : '#fff',
                        border: tema === 'dark' ? '1px solid rgba(67, 97, 238, 0.3)' : '1px solid #e0e0e0',
                        minWidth: '140px', 
                        textAlign: 'center',
                        fontSize: '0.9rem'
                    }
                }, `Página ${page + 1} de ${pageCount}`),
                React.createElement('button', {
                    className: `btn btn-primary ${page >= pageCount - 1 ? 'disabled' : ''}`,
                    style: { 
                        borderRadius: '0px 8px 8px 0px', 
                        minWidth: '100px',
                        opacity: page >= pageCount - 1 ? 0.6 : 1
                    },
                    disabled: page >= pageCount - 1,
                    onClick: function() { if (onPageChange && page < pageCount - 1) onPageChange(page + 1); }
                }, 'Siguiente')
            )
        )
    );
}

window.TableUsers = TableUsers;