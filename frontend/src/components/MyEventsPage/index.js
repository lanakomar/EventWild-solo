import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';

import { getUserEvents } from '../../store/user';
import './MyEventsPage.css';

const MyEventsPage = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserEvents(userId));
    }, [dispatch]);

    const eventList = useSelector(state => state.userEvents);

    return (
        <div className='wrapper'>
            <img className='background' src="/images/bckg-eventForm.jpg" />
            <div className="my-events-container">
                <div className='events-header'>
                    <div>Event Name</div>
                    <div>Date of Event</div>
                    <div>Location of Event</div>
                    <div></div>
                </div>
                {Object.values(eventList).map(event => (
                    <div className='event-container' key={event.id}>
                        <div>{event.name}</div>
                        <div>{event.date}</div>
                        <div>{event.location}</div>
                        <div>
                            <Link
                                className='button'
                                to={`/events/${event.id}`}
                            >
                                Go to event
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyEventsPage;
