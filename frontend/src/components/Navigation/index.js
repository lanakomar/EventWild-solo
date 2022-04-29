import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import * as sessionActions from '../../store/session';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';

const Navigation = (isLoaded) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [errors, setErrors] = useState([]);

    const demoLogin = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential: "demo@user.io", password: "demoPassword" }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    }

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <ProfileButton user={sessionUser} />
        );
    } else {
        sessionLinks = (
            <>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <button className="btn-nav" to="/login" onClick={demoLogin}>Demo user</button>
                <LoginFormModal />
                <SignupFormModal />
            </>
        );
    }



    return (
        <nav>
            <NavLink exact to="/">Home</NavLink>
            <div>
                {isLoaded && sessionLinks}
            </div>
        </nav>
    )
}

export default Navigation;
