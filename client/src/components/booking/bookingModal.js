import React from 'react';
import Modal from 'react-responsive-modal';
import ResError from '../shared/form/ResError';

const BookingModal = (props) => {


  const { open, closeModal, booking, confirmModal, errors, rentalPrice } = props;

    return(
      <Modal open={open} onClose={closeModal} className={{ modal: 'booking-modal'}} >
      <h3 className="modal-title">Cofirm Booking</h3>

      <div className="modal-body">
        <p className="dates">{booking.startAt} / {booking.endAt} </p>
      <em>{booking.days}</em> <label>nights</label> /
      <em> {rentalPrice}$</em> <label>per night</label>
      <p><label>Guests</label>: <em>{booking.guests}</em></p>
      <p><label>Price</label>:<em>{booking.totalPrice}$ </em></p>
      <p><label>Do you Confirm your booking for selected days?</label></p>
      <strong><ResError errors={errors} /></strong>
      </div>

      <div className="modal-footer">
        <button onClick={confirmModal} type="button" className="confirm-btn">Confirm</button>
        <button onClick={closeModal} className="cancel-btn">Cancel</button>
      </div>

      </Modal>
    )




}

export default BookingModal;
