import React, { useState } from 'react';


import { Modal } from '../../context/Modal';
import ReservationForm from './ReservationForm';
import './ReservationForm.css';

const ReserveTicket = ({ event, userId, setIsReserved }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            {userId &&
            (<button
                onClick={() => setShowModal(true)}
                className='button reserve'
                >
                Reserve a ticket
            </button>)}
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <ReservationForm
                        event={event}
                        userId={userId}
                        setIsReserved={setIsReserved}
                        setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    )
}


export default ReserveTicket;
