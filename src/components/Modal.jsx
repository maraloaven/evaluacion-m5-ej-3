import ReactDOM from "react-dom";

function Modal({ title, children, onClose }) {
  return ReactDOM.createPortal(
    <div style={overlayStyles} onClick={onClose}> 
      <div style={modalStyles} onClick={(e) => e.stopPropagation()}> 
        <h3>{title}</h3>
        {children}
        <button onClick={onClose} style={closeButtonStyles}>Cerrar</button>
      </div>
    </div>,
    document.getElementById("modal-root") 
  );
}

const overlayStyles = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)", 
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000, 
};

const modalStyles = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "8px",
  width: "400px",
  textAlign: "center",
  boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
};

const closeButtonStyles = {
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  padding: "10px 20px",
  borderRadius: "5px",
  cursor: "pointer",
  marginTop: "15px",
  fontSize: "16px",
};

export default Modal;
