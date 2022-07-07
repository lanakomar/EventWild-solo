import React, { useState } from 'react';

import { Modal } from '../../context/Modal';
import EditEventForm from './EditEventForm';

const EditEventModal = ({ event, user }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button
                onClick={() => setShowModal(true)}
                className='button'
                hidden={event.hostId === user?.id ? false : true}
            >
                Edit
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditEventForm
                        event={event}
                        user={user}
                        setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    )
};
export default EditEventModal;
