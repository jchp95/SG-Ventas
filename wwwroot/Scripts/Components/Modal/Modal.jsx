class Modal extends React.Component {
    render() {
        const { open, onClose, children } = this.props;
        if (!open) return null;
        return (
            <div className="modal-backdrop-custom">
                <div className="modal-ventana">
                    <button className="modal-close-btn" 
                    onClick={onClose} 
                    style={{position: 'absolute', top: 12, right: 18, fontSize: 22, background: 'none', border: 'none', color: '#4361ee', cursor: 'pointer', zIndex: 2}}>
                        ×
                    </button>
                    {children}
                </div>
            </div>
        );
    }
}

window.Modal = Modal;
