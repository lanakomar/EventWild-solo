import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import DeleteEventModal from '../DeleteEventModal';
import ReserveTicket from '../ReserveTicketModal';
import EditEventModal from '../EditEventModal'
import { getOneEvent } from '../../store/event';
import './EventPage.css';


const EventPage = () => {
    const { eventId } = useParams();
    const dispatch = useDispatch();

    const [isReserved, setIsReserved] = useState(false);

    useEffect(() => {
        dispatch(getOneEvent(eventId));
    }, [dispatch, eventId]);

    const event = useSelector(state => state.event[eventId]);
    const user = useSelector(state => state.session.user);


    if (!event) {
        return null;
    }

    return (
        <div className='container'>
            <div className="blurred-banner"><div></div></div>
            <div className="event-page">
                <div className="event-page-header">
                    <div className="event-img"><img src={`data:${event.img}`} alt={`${event.name}`}  /></div>
                    <div className="info-container">
                        <div className="event-info">{event.name}</div>
                        <div className='category'>{event.Category.type}</div>
                        <div className="btns-container" hidden={event.hostId === user?.id ? false : true}>
                            <EditEventModal
                                event={event}
                                user={user}
                            />
                            <DeleteEventModal
                                event={event}
                                user={user}
                            />
                        </div>
                    </div>
                </div>
                <div className="event-tickets">
                    <div className="available-tickets">
                        <div className='ticket-info'>
                                <i className="fa-solid fa-ticket"></i>
                                Tickets available: {event.capacity}
                            </div>
                        <div>Ticket price: ${event.price}</div>
                    </div>
                    {!isReserved ?
                    <ReserveTicket
                        event={event}
                        userId={user?.id}
                        setIsReserved={setIsReserved}
                    />
                    : (<p>Your ticket(s) was reserved!</p>)
                    }
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
