import React, { useState } from 'react';


import { Modal } from '../../context/Modal';
import ReservationForm from './ReservationForm';
import './ReservationForm.css';

const ReserveTicket = ({ event, userId }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button
                onClick={() => setShowModal(true)}
                className='button reserve'
                >
                Reserve a ticket
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <ReservationForm
                        event={event}
                        userId={userId}
                        setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    )
}


export default ReserveTicket;
