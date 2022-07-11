import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './HomePage.css';



const HomePage = () => {

    const eventsList = useSelector(state => {
        return state.event;
    });


    if (!eventsList) {
        return null;
    }

    return (
        <>
            <div className='banner'><div></div></div>
        <main>
            {Object.values(eventsList)?.map(event => {
                return (
                    <Link key={event.id} to={`/events/${event.id}`} className="event-card">
                        <div className="img-container"><img src={`data:${event.img}`} alt={`${event.name}`} /></div>
                            <h3>{event.name}</h3>
                            <p className='category'>{event.Category.type}</p>
                            <p className='description'>{event.description}</p>
                            <p>Location: {event.location}</p>
                            <p className='date'>{event.date}</p>
                            <p>Host: {event.User.username}</p>
                    </Link>
                )
            }).reverse()}
        </main>
        </>
    )
}

export default HomePage;
