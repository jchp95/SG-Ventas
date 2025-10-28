/* jshint ignore:start */

/* global React */

const OffCanvas = ({ show, onClose, width = '400px', children, className = '', style = {} }) => {
    // Redux hook para tema
    const { tema } = window.ReduxProvider.useApp();
    
    if (!show) return null;
    
    return (
        <div className={`offcanvas-actividad-reciente show ${className} ${tema === 'dark' ? 'theme-dark' : ''}`} style={Object.assign({
                display: 'block',
                position: 'fixed',
                right: 0,
                top: 0,
                width,
                height: '100%',
                background: tema === 'dark' ? '#2d2d2d' : '#fff',
                boxShadow: tema === 'dark' ? '-2px 0 24px rgba(0, 0, 0, 0.3)' : '-2px 0 24px rgba(67,97,238,0.10)',
                borderRadius: '16px 0 0 16px',
                borderLeft: tema === 'dark' ? '6px solid #4c7fff' : '6px solid var(--primary-light)',
                padding: '28px 22px 18px 22px',
                animation: 'scaleFadeIn 0.35s',
                zIndex: 1050,
                overflowY: 'auto',
                ...style
            })}>
                <button className={`btn-close float-end ${tema === 'dark' ? 'theme-dark' : ''}`} onClick={onClose}></button>
                {children}
            </div>
        );
};

window.OffCanvas = OffCanvas;

/* jshint ignore:end */
