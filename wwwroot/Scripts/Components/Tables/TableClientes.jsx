function TableClientes(props) {
    const data = props.data || [];
    const page = props.page || 0;
    const PAGE_SIZE = props.pageSize || 15;
    const onPageChange = props.onPageChange;

    // Redux hooks para tema
    const {tema} = window.ReduxProvider.useApp();

    // Calcular paginación
    var pageCount = Math.ceil(data.length / PAGE_SIZE);
    var pagedData = data.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

    React.useEffect(function () {
        if (page > 0 && page >= pageCount && onPageChange) onPageChange(0);
    }, [data.length, page, pageCount, onPageChange]);

    // Estado para el menú de acciones
    const [menuRow, setMenuRow] = React.useState(null);

    // Maneja el cierre del menú al hacer clic fuera
    React.useEffect(function () {
        function handleClick(e) {
            if (!e.target.closest('.table-action-menu')) setMenuRow(null);
        }

        if (menuRow !== null) {
            document.addEventListener('mousedown', handleClick);
            return () => document.removeEventListener('mousedown', handleClick);
        }
    }, [menuRow]);

    var columns = React.useMemo(function () {
        return [
            {Header: '#', accessor: 'fidCliente'},
            {Header: 'Nombre', accessor: 'nombre'},
            {Header: 'Email', accessor: 'email'},
            {Header: 'Teléfono', accessor: 'telefono'},
            {Header: 'Dirección', accessor: 'direccion'},
            {
                Header: 'Activo',
                accessor: 'activo',
                Cell: function ({value}) {
                    return React.createElement('span', {
                        className: `badge ${value ? 'bg-success' : 'bg-danger'}`
                    }, value ? 'Activo' : 'Inactivo');
                }
            },
            {
                Header: 'Acciones', Cell: function (cell) {
                    return React.createElement('div', {style: {position: 'relative'}},
                        React.createElement('button', {
                            className: `table-action-icon ${tema === 'dark' ? 'table-action-icon-dark' : ''}`,
                            onClick: function (e) {
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
                                onClick: function () {
                                    setMenuRow(null);
                                    if (props.onEditCliente) {
                                        props.onEditCliente(cell.row.original);
                                    }
                                }
                            }, 'Editar'),
                            cell.row.original.activo ? React.createElement('button', {
                                className: `dropdown-item text-danger ${tema === 'dark' ? 'dropdown-item-dark dropdown-item-danger-dark' : ''}`,
                                onClick: function () {
                                    setMenuRow(null);
                                    if (props.onDeleteCliente) {
                                        props.onDeleteCliente(cell.row.original.fidCliente);
                                    }
                                }
                            }, 'Desactivar') : React.createElement('button', {
                                className: `dropdown-item text-success ${tema === 'dark' ? 'dropdown-item-dark' : ''}`,
                                onClick: function () {
                                    setMenuRow(null);
                                    if (props.onActivateCliente) {
                                        props.onActivateCliente(cell.row.original.fidCliente);
                                    }
                                }
                            }, 'Activar')
                        )
                    );
                }
            }
        ];
    }, [menuRow, tema]);

    var {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = window.ReactTable.useTable({columns: columns, data: pagedData});

    // Mostrar mensaje si no hay datos
    if (data.length === 0) {
        return React.createElement('div', {className: 'text-center p-5'},
            React.createElement('p', {className: 'text-muted'}, 'No hay clientes para mostrar.')
        );
    }

    return (
        React.createElement(React.Fragment, null,
            React.createElement('div', {className: 'users-table-section'},
                React.createElement('table', Object.assign({className: 'react-table'}, getTableProps()),
                    React.createElement('thead', null,
                        headerGroups.map(function (headerGroup) {
                            return React.createElement('tr', Object.assign({key: headerGroup.id}, headerGroup.getHeaderGroupProps()),
                                headerGroup.headers.map(function (column) {
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
                        rows.map(function (row) {
                            prepareRow(row);
                            return React.createElement('tr', Object.assign({key: row.id}, row.getRowProps()),
                                row.cells.map(function (cell) {
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
                    style: {padding: '0 24px'}
                },
                React.createElement('button', {
                    className: `btn btn-primary ${page === 0 ? 'disabled' : ''}`,
                    style: {
                        borderRadius: '8px 0px 0px 8px',
                        minWidth: '100px',
                        opacity: page === 0 ? 0.6 : 1
                    },
                    disabled: page === 0,
                    onClick: function () {
                        if (onPageChange && page > 0) onPageChange(page - 1);
                    }
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
                    onClick: function () {
                        if (onPageChange && page < pageCount - 1) onPageChange(page + 1);
                    }
                }, 'Siguiente')
            )
        )
    );
}

window.TableClientes = TableClientes;
console.log('✅ TableClientes component loaded');
