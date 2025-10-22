class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fadedIn: !props.animateIn // Si no se pasa animateIn, mostrar directamente
        };
    }

    componentDidMount() {
        if (this.props.animateIn) {
            setTimeout(() => {
                this.setState({fadedIn: true});
            }, 30);
        }
    }

    render() {
        const {fadedIn} = this.state;
        const fadeStyle = this.props.animateIn ? {
            opacity: fadedIn ? 1 : 0,
            transition: 'opacity .5s ease'
        } : {};

        return (
            <div className="app-layout d-flex flex-column min-vh-100" style={{minHeight: '100vh', ...fadeStyle}}>
                {/* Navbar */}
                <div className="flex-shrink-0">
                    <Navbar/>
                </div>
                {/* Contenido principal con Sidebar */}
                <div className="flex-grow-1 d-flex main-row" style={{flex: 1, minHeight: 0}}>
                    <Sidebar/>
                    <main className="flex-grow-1" style={{overflowY: 'auto'}}>
                       <Home/>
                    </main>
                </div>
                {/* Footer */}
                <div className="flex-shrink-0">
                    <Footer/>
                </div>
            </div>
        );
    }
}
