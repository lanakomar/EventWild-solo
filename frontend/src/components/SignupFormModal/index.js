import React, { useState } from 'react';

import SignupForm from './SignupForm';
import { Modal } from '../../context/Modal';
import './SignupForm.css';



const SignupFormModal = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className="btn-nav" onClick={() => setShowModal(true)}>Sign Up</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <SignupForm setShowModal={setShowModal}/>
                </Modal>
            )}
        </>
    );
}

export default SignupFormModal;
