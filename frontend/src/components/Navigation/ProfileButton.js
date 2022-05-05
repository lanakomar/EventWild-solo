import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { NavLink, useHistory, Link } from "react-router-dom";

import * as sessionActions from '../../store/session';
import './Navigation.css';


function ProfileButton({ user }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    const closeMenu = () => {
        setShowMenu(false);
    };

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        history.push('/events');
    };

    return (
        <>
            <div className="create-event-container">
                <i className="fa-solid fa-plus"></i>
                <NavLink to="/events/new">Create event</NavLink>
            </div>
            <div className="loggedin-container"
                onMouseEnter={openMenu}
                onMouseLeave={closeMenu}
            >
                <div className="loggedin-user">
                    <button className="user-btn" >
                        <i className="fa-solid fa-user-large" />
                    </button>
                    <p>Hello, {user.username}! <span>&#8964;</span></p>
                </div>
                {showMenu && (
                    <ul className="profile-dropdown">
                        <li className="link">
                            <Link to={`/${user.id}/events`}>My Events</Link>
                        </li>
                        <li className="link">
                            <Link to={`/${user.id}/tickets`}>My Tickets</Link>
                        </li>
                        <li>
                            <button className="btn-logout" onClick={logout}>Log Out</button>
                        </li>
                    </ul>
                )}
            </div>
        </>
    );
}

export default ProfileButton;
