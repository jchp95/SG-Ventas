class AppRouter extends React.Component {
    render() {
        const Router = window.ReactRouterDOM.BrowserRouter;
        const Route = window.ReactRouterDOM.Route;
        const Switch = window.ReactRouterDOM.Switch;
        // Importa los componentes globales
        const Navbar = window.Navbar;
        const Sidebar = window.Sidebar;
        const Footer = window.Footer;
        const Home = window.Home;
        const UsersList = window.UsersList;
        const Register = window.Register;
        // Puedes agregar más rutas aquí
        return (
            <Router>
                <div className="app-layout d-flex flex-column min-vh-100" style={{minHeight: '100vh'}}>
                    <div className="flex-shrink-0">
                        <Navbar/>
                    </div>
                    <div className="flex-grow-1 d-flex main-row" style={{flex: 1, minHeight: 0}}>
                        <Sidebar/>
                        <main className="flex-grow-1" style={{overflowY: 'auto'}}>
                            <Switch>
                                <Route exact path="/" component={Register} />
                                <Route path="/home" component={Home} />
                                <Route path="/usuarios" component={UsersList} />
                                {/* Agrega más rutas aquí si lo necesitas */}
                            </Switch>
                        </main>
                    </div>
                    <div className="flex-shrink-0">
                        <Footer/>
                    </div>
                </div>
            </Router>
        );
    }
}
window.AppRouter = AppRouter;
