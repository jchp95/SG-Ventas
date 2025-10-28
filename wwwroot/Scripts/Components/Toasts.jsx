/**
 * Componente de Toasts usando Redux y SweetAlert2
 */
const Toasts = () => {
    const { notificaciones, eliminarNotificacion } = window.ReduxProvider.useApp();

    React.useEffect(() => {
        // Procesar notificaciones pendientes
        notificaciones.forEach((notificacion) => {
            if (!notificacion.mostrada) {
                mostrarToast(notificacion);
                
                // Eliminar después del timer si tiene autoClose
                if (notificacion.autoClose) {
                    setTimeout(() => {
                        eliminarNotificacion(notificacion.id);
                    }, notificacion.duracion || 3000);
                }
            }
        });
    }, [notificaciones, eliminarNotificacion]);

    const mostrarToast = (notificacion) => {
        // Colores y títulos según tipo
        const config = {
            success: {icon: 'success', title: 'Éxito', color: '#198754'},
            warning: {icon: 'warning', title: 'Advertencia', color: '#ffc107'},
            info: {icon: 'info', title: 'Información', color: '#0dcaf0'},
            error: {icon: 'error', title: 'Error', color: '#dc3545'}
        };
        
        const c = config[notificacion.tipo] || config.info;
        
        window.Swal.fire({
            toast: true,
            position: 'top-end',
            icon: c.icon,
            title: notificacion.titulo || c.title,
            text: notificacion.mensaje,
            showConfirmButton: false,
            timer: notificacion.duracion || 3000,
            timerProgressBar: true,
            background: '#fff',
            color: c.color,
            customClass: {
                popup: 'swal2-toast'
            },
            didClose: () => {
                // Marcar como mostrada
                if (notificacion.autoClose) {
                    eliminarNotificacion(notificacion.id);
                }
            }
        });
    };

    return null; // Este componente no renderiza nada visible
};

// Mantener compatibilidad con la API anterior
window.Toasts = Toasts;
window.ToastUtils = {
    show: function(type, message, title = null, duracion = 3000) {
        if (window.ReduxProvider && window.ReduxProvider.useApp) {
            // Si Redux está disponible, usar el store
            const notificacion = {
                tipo: type,
                mensaje: message,
                titulo: title,
                duracion: duracion,
                autoClose: true,
                id: Date.now() + Math.random()
            };
            
            // Necesitamos acceso al dispatch desde fuera del componente
            if (window.ReduxStore && window.ReduxStore.store) {
                window.ReduxStore.store.dispatch(
                    window.ReduxStore.app.agregarNotificacion(notificacion)
                );
            }
        } else {
            // Fallback al método original
            const config = {
                success: {icon: 'success', title: 'Éxito', color: '#198754'},
                warning: {icon: 'warning', title: 'Advertencia', color: '#ffc107'},
                info: {icon: 'info', title: 'Información', color: '#0dcaf0'},
                error: {icon: 'error', title: 'Error', color: '#dc3545'}
            };
            const c = config[type] || config.info;
            
            window.Swal.fire({
                toast: true,
                position: 'top-end',
                icon: c.icon,
                title: title || c.title,
                text: message,
                showConfirmButton: false,
                timer: duracion,
                timerProgressBar: true,
                background: '#fff',
                color: c.color,
                customClass: {
                    popup: 'swal2-toast'
                }
            });
        }
    }
};