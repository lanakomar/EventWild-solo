import { csrfFetch } from './csrf';

const LOAD_TICKETS = '/userId/LOAD_TICKETS';
const DELETE_TICKET = '/tickets/DELETE_TICKET';

const loadTickets = (tickets) => ({
    type: LOAD_TICKETS,
    tickets
});

const deleteTicket = (ticketId) => ({
    type: DELETE_TICKET,
    ticketId
});

export const getTickets = (userId) => async dispatch => {
    const response = await fetch(`/api/users/${userId}/tickets`);

    if (response.ok) {
        const tickets = await response.json();
        dispatch(loadTickets(tickets));
        return tickets;
    } else {
        // return handle error
    }
};

export const cancelReservation = (ticketId) => async dispatch => {
    const response = await csrfFetch(`/api/tickets/${ticketId}`, {
        method: "DELETE",
    });

    if (response.ok) {
        const deletedTicketId = await response.json();
        dispatch(deleteTicket(deletedTicketId));
    }
}

const initialState = {};

const ticketReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_TICKETS:
            const newTickets = {};
            action.tickets.forEach(ticket => {
                newTickets[ticket.id] = ticket;
            });
            return {
                ...state,
                ...newTickets
            };
            case DELETE_TICKET:
            const newState = {
                ...state
            }
            delete newState[action.ticketId]
            return newState;
        default:
            return state;
    }
};

export default ticketReducer;
