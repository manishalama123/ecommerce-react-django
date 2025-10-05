import React from 'react'

const ConfirmationDialog = () => {
  return (
    <div className="modal-overlay">
    <div className="modal-content">
      <h3>{title}</h3>
      <p>{message}</p>
      <div className="modal-actions">
        {/* Cancel button usually white/gray */}
        <button onClick={onCancel}>Cancel</button>
        
        {/* Confirm button is usually a strong color (like red for delete) */}
        <button onClick={onConfirm} className="btn-danger">
          Confirm Delete
        </button>
      </div>
    </div>
  </div>
  )
}

export default ConfirmationDialog
