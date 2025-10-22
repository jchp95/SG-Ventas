/* jshint ignore:start */

/* global React */

class OffCanvas extends React.Component {
    render() {
        const { show, onClose, width = '400px', children, className = '', style = {} } = this.props;
        if (!show) return null;
        return (
            <div className={`offcanvas-actividad-reciente show ${className}`} style={Object.assign({
                display: 'block',
                position: 'fixed',
                right: 0,
                top: 0,
                width,
                height: '100%',
                background: '#fff',
                boxShadow: '-2px 0 24px rgba(67,97,238,0.10)',
                borderRadius: '16px 0 0 16px',
                borderLeft: '6px solid var(--primary-light)',
                padding: '28px 22px 18px 22px',
                animation: 'scaleFadeIn 0.35s',
                zIndex: 1050,
                overflowY: 'auto',
                ...style
            })}>
                <button className="btn-close float-end" onClick={onClose}></button>
                {children}
            </div>
        );
    }
}

window.OffCanvas = OffCanvas;

/* jshint ignore:end */
