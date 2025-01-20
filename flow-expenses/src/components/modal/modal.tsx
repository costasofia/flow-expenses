import { ReactNode, useEffect } from "react";
import './modal.css';

interface ModalPropos {
    title: string, 
    children: ReactNode,
    onClose: () => void;
    onSave:  (event: React.FormEvent) => void;
    onOpen:() => void;
}
function Modal({title, children, onClose, onSave, onOpen}: ModalPropos){

  useEffect(() => {
    if (onOpen) {
      console.log('open')
      onOpen(); 
    }
  }, [onOpen]);
    return (
        <div className="modal">
          <div className="modal-main">
            <div className="modal-head">
              <h1>{title}</h1>
            </div>
            <div className="modal-body">{children}</div>
            <div className="btn-container">
              <button type="button" className="btn" onClick={onClose}>
                Cancelar
              </button>
              <button type="button" className="btn" onClick={onSave}>
                Guardar
              </button>
            </div>
          </div>
        </div>
      );
}
export default Modal;