import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { getOneEvent } from '../../store/event';
import './EventPage.css';


const EventPage = () => {
    const { eventId } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOneEvent(eventId));
    }, [dispatch]);

    const event = useSelector(state => state.event[eventId]);
    console.log(event);

    if (!event) {
        return null;
    }

    const handleEditClick = () => {
        history.push(`/events/${eventId}/edit`);
    }

    return (
        <div className='container'>
            <div className="blurred-banner"><div></div></div>
            <div className="event-page">
                <div className="event-page-header">
                    <div className="event-img"><img src={event.img} /></div>
                    <div className="info-container">
                        <div className="event-info">{event.name}</div>
                        <div className='category'>{event.Category.type}</div>
                        <div className="btns-container">
                            <button onClick={handleEditClick} className='button'>Edit</button>
                            <button className='button'>Delete</button>
                        </div>
                    </div>
                </div>
                <div className="event-tickets">
                    <div className="available-tickets">
                        <i className="fa-solid fa-ticket"></i>
                        Tickets available: {event.capacity}
                    </div>
                    <button className='button reserve'>Reserve a ticket</button>
                </div>
                <div className="event-page-main">
                    <div className="event-page-main-left">
                        <div>Event description: </div>
                        <div>{event.description}</div>
                    </div>
                    <div className="event-page-main-right">
                        <div className='event-date'>
                            <i className="fa-solid fa-calendar-check"></i>
                            Date of event:
                            <p>{event.date}</p>
                        </div>
                        <div className='event-location'>
                            <i className="fa-solid fa-earth-americas"></i>
                            Location:
                            <p>{event.location}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default EventPage;