class AppRouter extends React.Component {
    render() {
        const Router = window.ReactRouterDOM.BrowserRouter;
        const Route = window.ReactRouterDOM.Route;
        const Switch = window.ReactRouterDOM.Switch;
        const App = window.App;
        const Home = window.Home;
        const ComunHome = window.ComunHome;
        const Auditoria = window.Auditoria;
        const Settings = window.Settings;
        const UsersList = window.UsersList;
        const ClientesList = window.ClientesList;
        const Register = window.Register;
        const ExampleReduxPage = window.ExampleReduxPage;
        const AppProvider = window.ReduxProvider.AppProvider;

        return (
            <AppProvider>
                <Router>
                    <Switch>
                        {/* Ruta sin layout */}
                        <Route exact path="/" component={Register}/>
                        {/* Rutas con layout */}
                        <Route render={() => (
                            <App>
                                    <Switch>
                                        {/* Dashboard Administrador */}
                                        <Route path="/home" component={Home}/>
                                        
                                        {/* Dashboard Usuario Común */}
                                        <Route path="/comun-home" component={ComunHome}/>

                                        <Route path="/auditoria" component={Auditoria}/>
                                        <Route path="/settings" component={Settings}/>
                                        <Route path="/usuarios" component={UsersList}/>
                                        <Route path="/clientes" component={ClientesList}/>
                                        <Route path="/redux-demo" component={ExampleReduxPage}/>
                                        {/* Agrega más rutas aquí */}
                                    </Switch>
                            </App>
                        )}/>
                    </Switch>
                </Router>
            </AppProvider>
        );
    }
}

window.AppRouter = AppRouter;