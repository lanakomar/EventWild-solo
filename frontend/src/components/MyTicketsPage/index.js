import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import { getTickets, cancelReservation } from '../../store/ticket';
import './MyTicketsPage.css';

const MyTicketsPage = () => {
    const { userId } = useParams();


    const dispatch = useDispatch();

    const tickets = useSelector(state => state.ticket);

    useEffect(() => {
        dispatch(getTickets(userId));
    }, [dispatch, userId]);

    const handleCancelReservation = async (e) => {
        const ticketId = e.target.id;
        dispatch(cancelReservation(ticketId))
    }

    return (
        <div className="wrapper">
            <img className='background' src="/images/bckg-eventForm.jpg" alt="" />
            <div className='my-tickets-container'>
                <div className='tickets-header'>
                    <div>Event Name</div>
                    <div>Reserved tickets</div>
                    <div></div>
                </div>
                {Object.values(tickets).map(ticket => (
                    <div className='ticket-container' key={ticket.id}>
                        <div>{ticket.Event.name}</div>
                        <div>{ticket.qty}</div>
                        <div>
                            <button
                                className='button'
                                type="button"
                                id={ticket.id}
                                onClick={handleCancelReservation}
                            >
                                Cancel Reservation
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyTicketsPage;
