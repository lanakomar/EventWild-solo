import React, { useState } from 'react';

import LoginForm from "./LoginForm";
import { Modal } from '../../context/Modal';
import './LoginForm.css';


const LoginFormModal = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className="btn-nav" onClick={() => setShowModal(true)}>Log In</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <LoginForm />
                </Modal>
            )}
        </>
    );
}

export default LoginFormModal;
