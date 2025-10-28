class AppRouter extends React.Component {
    render() {
        const Router = window.ReactRouterDOM.BrowserRouter;
        const Route = window.ReactRouterDOM.Route;
        const Switch = window.ReactRouterDOM.Switch;
        const App = window.App; 
        const Home = window.Home;
        const UsersList = window.UsersList;
        const Settings = window.Settings;
        const Register = window.Register;
        const ExampleReduxPage = window.ExampleReduxPage;
        const AppProvider = window.ReduxProvider.AppProvider;
        
        return (
            <AppProvider>
                <Router>
                    <Switch>
                        {/* Ruta sin layout */}
                        <Route exact path="/" component={Register} />
                        {/* Rutas con layout */}
                        <Route render={() => (
                            <App>
                                <Switch>
                                    <Route path="/home" component={Home} />
                                    <Route path="/usuarios" component={UsersList} />
                                    <Route path="/settings" component={Settings} />
                                    <Route path="/redux-demo" component={ExampleReduxPage} />
                                    {/* Agrega más rutas aquí */}
                                </Switch>
                            </App>
                        )} />
                    </Switch>
                </Router>
            </AppProvider>
        );
    }
}
window.AppRouter = AppRouter;