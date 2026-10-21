// components/ConfirmModal.jsx
// A modal dialog that asks for confirmation before deleting a student.

import React from 'react';

function ConfirmModal({ studentName, onConfirm, onCancel }) {
  return (
    // Backdrop — clicking outside closes the modal
    <div className="modal-backdrop" onClick={onCancel}>
      {/* Stop click propagation so clicking inside doesn't close it */}
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__icon">
          <i className="ph-warning" />
        </div>
        <h2 className="modal__title">Delete Student</h2>
        <p className="modal__message">
          Are you sure you want to delete <strong>{studentName}</strong>?
          <br />
          This action cannot be undone.
        </p>
        <div className="modal__actions">
          <button className="btn btn--outline" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn--danger" onClick={onConfirm}>
            <i className="ph-trash" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
