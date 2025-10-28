function App({children}) {
    // Componentes
    const Navbar = window.Navbar;
    const Sidebar = window.Sidebar;
    const Footer = window.Footer;
    const Toasts = window.Toasts;
    
    // Redux hooks
    const { sidebarAbierto, tema, notificaciones, cargandoGlobal } = window.ReduxProvider.useApp();
    
    // Aplicar tema al body
    React.useEffect(() => {
        document.body.className = tema === 'dark' ? 'theme-dark' : 'theme-light';
    }, [tema]);

    return (
        <div className={`app-layout d-flex flex-column min-vh-100 ${tema === 'dark' ? 'theme-dark' : ''}`} 
             style={{minHeight: '100vh'}}>
            
            {/* Loading global overlay */}
            {cargandoGlobal && (
                <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50" 
                     style={{zIndex: 9999}}>
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                </div>
            )}
            
            <div className="flex-shrink-0">
                <Navbar/>
            </div>
            
            <div className="flex-grow-1 d-flex main-row" style={{flex: 1, minHeight: 0}}>
                <Sidebar/>
                <main className={`flex-grow-1 transition-all ${sidebarAbierto ? 'sidebar-open' : 'sidebar-closed'}`} 
                      style={{overflowY: 'auto'}}>
                    {children}
                </main>
            </div>
            
            <div className="flex-shrink-0">
                <Footer/>
            </div>
            
            {/* Toasts para notificaciones */}
            {Toasts && <Toasts />}
        </div>
    );
}
window.App = App;