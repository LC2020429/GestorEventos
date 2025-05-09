import React from "react";
import "../assets/confirmDelete.css";

const ConfirmDelete = ({ onConfirm, onCancel }) => {
  return (
    <div className="confirm-overlay" onClick={onCancel}>
      <div className="confirm-box" onClick={(e) => e.stopPropagation()}>
        <h3>¿Estás seguro de que quieres eliminar este evento?</h3>
        <div className="confirm-actions">
          <button className="btn confirm-btn" onClick={onConfirm}>
            Eliminar
          </button>
          <button className="btn cancel-btn" onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDelete;
