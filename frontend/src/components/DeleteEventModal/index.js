import React, { useState } from 'react';

import { Modal } from '../../context/Modal';
import DeleteEventForm from './DeleteEventForm';

const DeleteEventModal = ({event, user}) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button
                className='button'
                hidden={event.hostId === user.id ? false : true}
                onClick={() => setShowModal(true)}
            >
                Delete
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <DeleteEventForm
                        event={event}
                        user={user}
                        setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    )
};
export default DeleteEventModal;
