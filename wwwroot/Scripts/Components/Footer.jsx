const Footer = () => {
    // Redux hook para tema
    const { tema } = window.ReduxProvider.useApp();
    
    return (
        <footer className={`footer mt-auto py-3 ${tema === 'dark' ? 'bg-dark-footer text-light' : 'bg-light'}`}>
            <div className="d-flex justify-content-center">
                <span className={tema === 'dark' ? 'text-light' : 'text-muted'}>
                    © 2025 Ventas. Todos los derechos reservados.
                </span>
            </div>
        </footer>
    );
};

