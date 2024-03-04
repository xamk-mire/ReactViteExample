interface ModalModel {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

// Custom confirmation modal
const ConfirmationModal = ({ isOpen, onClose, onConfirm }: ModalModel) => {
  if (!isOpen) return null;

  return (
    <div className="confirmation-modal" onClick={onClose}>
      <div className="modal-content">
        <p>Are you sure you want to delete the contact?</p>
        <div className="modal-buttons">
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
          <button onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
