import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { getTickets, cancelReservation } from '../../store/ticket';
import './MyTicketsPage.css';

const MyTicketsPage = () => {

    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user);
    const tickets = useSelector(state => state.ticket);

    useEffect(() => {
        dispatch(getTickets(user.id));
    }, [dispatch]);

    const handleCancelReservation = async (e) => {
        const ticketId = e.target.id;
        dispatch(cancelReservation(ticketId))
    }

    return (
        <div className="my-tickets-container">
            <table className="my-tickets">
                <thead>
                    <tr>
                        <th>Name of Event</th>
                        <th>Reserved tickets</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {Object.values(tickets).map(ticket => (
                        <tr key={ticket.id}>
                            <td>{ticket.Event.name}</td>
                            <td>{ticket.qty}</td>
                            <td>
                                <button
                                    type="button"
                                    id={ticket.id}
                                    onClick={handleCancelReservation}
                                >
                                    Cancel Reservation
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default MyTicketsPage;
