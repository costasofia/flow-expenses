import { ReactNode } from "react";
import './modal.css';

interface ModalPropos {
    title: string, 
    children: ReactNode,
    onClose: () => void;
    onSave:  (event: React.FormEvent) => void;
}
function Modal({title, children, onClose, onSave}: ModalPropos){
    return (
        <div
        >
          <div className="modal-main">
            <div className="modal-head">
              <h1>{title}</h1>
            </div>
            <div className="modal-body">{children}</div>
            <div className="btn-container">
              <button type="button" className="btn" onClick={onClose}>
                Close
              </button>
              <button type="button" className="btn" onClick={onSave}>
                save
              </button>
            </div>
          </div>
        </div>
      );
}
export default Modal;