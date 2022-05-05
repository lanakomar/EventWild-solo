import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import './ReservationForm.css';
import { reserveTicket } from '../../store/event';

const ReservationForm = ({ event, userId, setShowModal, setIsReserved }) => {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const [numOfTickets, setNumOfTickets] = useState("");


    const handleReserveSubmit = async (e) => {
        e.preventDefault();
        if (numOfTickets <= event.capacity) {
            const payload ={
                eventId: event.id,
                userId,
                qty: numOfTickets,
                capacity: event.capacity
            };
            setErrors([]);
            return dispatch(reserveTicket(event.id, payload))
                .then(() => {
                    setShowModal(false);
                    setIsReserved(true);
                });
        }
        return setErrors([`Limit of tickets: ${event.capacity}`]);
    }

    const handleCancelClick = (e) => {
        e.preventDefault();
        setShowModal(false);
        setErrors([]);
    }
    const styling = {
        display: errors.length ? "block" : "none",
    }

    return (
        <div className="reservation-form">
            <form onSubmit={handleReserveSubmit}>
            <div
                style={styling}
                className='error'
            >
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}</div>
                <div className='tickets-selector'>
                    <label htmlFor="tickets">How many tickets do you want to reserve?</label>
                    <input
                        value={numOfTickets}
                        id="tickets"
                        type="number"
                        min="0"
                        placeholder={`max: ${event.capacity}`}
                        onChange={(e) => setNumOfTickets(e.target.value)}
                        />
                </div>
                <div className="btns-container">
                    <button
                        className="button reserve-sm"
                        type="submit"
                    >Reserve</button>
                    <button
                        className="button"
                        type="button"
                        onClick={handleCancelClick}
                    >Cancel</button>
                </div>
            </form>

        </div>
    )
}

export default ReservationForm;
