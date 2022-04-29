import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import * as sessionActions from '../../store/session';
import './LoginForm.css';

const LoginForm = ({ setShowModal }) => {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    }

    return (
        <div className='login-form-container'>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <div className='input-container'>
                    <label htmlFor='email'>Email</label>
                    <input
                        autoComplete="false"
                        type='text'
                        id='email'
                        name='email'
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
                    />
                </div>
                <div className='input-container'>
                    <label htmlFor='password'>Password</label>
                    <input
                        autoComplete="false"
                        type='password'
                        id='password'
                        name='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="login-btn-container">
                    <button className="login-form" type='submit'>Login</button>
                    <button className="login-form" type='button' onClick={() => setShowModal(false)}>Cancel</button>
                </div>
            </form>
        </div>
    )
};

export default LoginForm;
