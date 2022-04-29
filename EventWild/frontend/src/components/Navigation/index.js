import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

const Navigation = (isLoaded) => {
    const sessionUser = useSelector(state => state.session.user);


    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <ProfileButton user={sessionUser} />
        );
    } else {
        sessionLinks = (
            <>
                <NavLink to="/login-demo" className="nav-link">Demo user</NavLink>
                <LoginFormModal />
                <NavLink to="/signup" className="nav-link">Sign Up</NavLink>
            </>
        );
    }

    return (
        <nav>
            <NavLink exact to="/">Home</NavLink>
            {isLoaded && sessionLinks}
        </nav>
    )
}

export default Navigation;
