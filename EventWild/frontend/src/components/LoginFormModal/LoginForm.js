import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import * as sessionActions from '../../store/session';
import './LoginForm.css';

const LoginForm = () => {
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
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <label htmlFor='email'>Email</label>
                <input
                    autoComplete="false"
                    type='text'
                    id='email'
                    name='email'
                    value={credential}
                    onChange={(e) => setCredential(e.target.value)}
                />
                <label htmlFor='password'>Password</label>
                <input
                    autoComplete="false"
                    type='password'
                    id='password'
                    name='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type='submit'>Login</button>
                <button type='button'>Cancel</button>
            </form>
        </div>
    )
};

export default LoginForm;
