import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Modal } from '../../context/Modal';
import ConfirmedReservation from './ConfirmedReservation';
import { reserveTicket } from '../../store/event';

const ReserveTicket = ({ eventId, userId }) => {
    const dispatch = useDispatch();

    const [showModal, setShowModal] = useState(false);

    const handleReserveClick = async (e) => {
        e.preventDefault();
        dispatch(reserveTicket(eventId, userId))
            .then(() => setShowModal(true));
    }

    return (
        <>
            <button
                onClick={handleReserveClick}
                className='button reserve'
                >
                Reserve a ticket
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <ConfirmedReservation
                        setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    )
}


export default ReserveTicket;
