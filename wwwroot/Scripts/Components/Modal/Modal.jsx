function Modal({ open, onClose, children }) {
    // Redux hooks para tema
    const { tema } = window.ReduxProvider.useApp();
    
    if (!open) return null;
    
    return (
        <div className={`modal-backdrop-custom ${tema === 'dark' ? 'modal-backdrop-dark' : ''}`}>
            <div className={`modal-ventana ${tema === 'dark' ? 'modal-ventana-dark' : ''}`}>
                <button 
                    className={`modal-close-btn ${tema === 'dark' ? 'modal-close-btn-dark' : ''}`}
                    onClick={onClose} 
                    style={{
                        position: 'absolute', 
                        top: 12, 
                        right: 18, 
                        fontSize: 22, 
                        background: 'none', 
                        border: 'none', 
                        cursor: 'pointer', 
                        zIndex: 2
                    }}
                >
                    ×
                </button>
                {children}
            </div>
        </div>
    );
}

window.Modal = Modal;
