import React from 'react';
import Modal from 'react-responsive-modal';
import ResError from '../../shared/form/ResError';

const DeleteRentalModal = (props) => {
  const {open, closeModal, confirmModal, errors} = props;

  return(
    <Modal open={open} onClose={closeModal} className={{ modal: 'deleteRental-modal' }} >
    <h3> Do you want you Delete the rental ? </h3>
    <strong><ResError errors={errors} /></strong>
    <div className="modal-footer">
    <button onClick={confirmModal} className="confirm-btn">Confirm</button>
    <button onClick={closeModal} className="cancel-btn">Cancel</button>
    </div>
    </Modal>
  )
}


export default DeleteRentalModal;
