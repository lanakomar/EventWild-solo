import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getEvents } from '../../store/event';
import './HomePage.css';



const HomePage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getEvents())
    }, [dispatch]);

    const eventsList = useSelector(state => {
        return state.event.eventList;
    });


    if (!eventsList) {
        return null;
    }

    return (
        <>
            <div className='banner'><div></div></div>
        <main>
            {eventsList.map(event => {
                return (
                    <Link key={event.id} to={`/events/${event.id}`} className="event-card">
                            <div className="img-container"><img src={event.img} /></div>
                            <h3>{event.name}</h3>
                            <p className='category'>{event.Category.type}</p>
                            <p className='description'>{event.description}</p>
                            <p>Location: {event.location}</p>
                            <p className='date'>{event.date}</p>
                            <p>Host: {event.User.username}</p>
                    </Link>
                )
            })}
        </main>
        </>
    )
}

export default HomePage;
