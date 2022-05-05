import { csrfFetch } from './csrf';
import { ValidationError } from '../utils/validationError';

const LOAD_EVENTS = 'home/LOAD';
const ADD_EVENT = 'event/ADD_EVENT';
const DELETE_EVENT = 'event/DELETE_EVENT'

const loadEvents = list => ({
    type: LOAD_EVENTS,
    list
});

const addEvent = (event) => ({
    type: ADD_EVENT,
    event
});

const deleteEventAction = (eventId, event) => ({
    type: DELETE_EVENT,
    eventId,
    event
});

export const getOneEvent = (eventId) => async dispatch => {
    const response = await fetch(`/api/events/${eventId}`);

    if (response.ok) {
        const event = await response.json();
        dispatch(addEvent(event));
    } else {
        window.location="/404"
    }
};

export const getEvents = () => async dispatch => {
    const response = await fetch('/api/events');
    if (response.ok) {
        const list = await response.json();
        dispatch(loadEvents(list));
    }
}

export const createEvent = (payload) => async dispatch => {
    try {
        const response = await csrfFetch('/api/events', {
            method: "POST",
            body: JSON.stringify(payload)
        });
        const event = await response.json();

        dispatch(addEvent(event));
        return event;

    } catch (response) {
        if (!response.ok) {
            let error;
            if (response.status === 422) {
                error = await response.json();
                throw new ValidationError(error.errors, response.statusText);
            }
            else {
                let errorJSON;
                error = await response.text();
                try {
                    // Check if the error is JSON, i.e., from the Pokemon server. If so,
                    // don't throw error yet or it will be caught by the following catch
                    errorJSON = JSON.parse(error);
                }
                catch {
                    // Case if server could not be reached
                    throw new Error(error);
                }
                throw new Error(`${errorJSON.title}: ${errorJSON.message}`);
            }
        }
    }
};

export const editEvent = (payload, eventId)=> async dispatch => {
    try {
        const response = await csrfFetch(`/api/events/${eventId}`, {
            method: "PATCH",
            body: JSON.stringify(payload)
        });
        const event = await response.json();

        dispatch(addEvent(event));
        return event;

    } catch (response) {
        if (!response.ok) {
            let error;
            if (response.status === 422) {
                error = await response.json();
                throw new ValidationError(error.errors, response.statusText);
            }
            else {
                let errorJSON;
                error = await response.text();
                try {
                    // Check if the error is JSON, i.e., from the Pokemon server. If so,
                    // don't throw error yet or it will be caught by the following catch
                    errorJSON = JSON.parse(error);
                }
                catch {
                    // Case if server could not be reached
                    throw new Error(error);
                }
                throw new Error(`${errorJSON.title}: ${errorJSON.message}`);
            }
        }
    }

};

export const deleteEvent = (eventId) => async dispatch => {
    const response = await csrfFetch(`/api/events/${eventId}`, {
        method: "DELETE"
    });

    if (response.ok) {
        const deletedEvent = await response.json()
        dispatch(deleteEventAction(deletedEvent.id, deletedEvent))
    }
}

export const reserveTicket = (eventId, payload) => async dispatch => {
    const response = await csrfFetch(`/api/events/${eventId}/tickets`, {
        method: "POST",
        body: JSON.stringify(payload)
    });

    if (response.ok) {
        console.log("success")
        const event = await response.json();
        dispatch(addEvent(event));
    }
}


const initialState = {};


const eventReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_EVENTS:
            const allEvents = {};
            action.list.forEach(event => {
                allEvents[event.id] = event;
            })
            return {
                ...allEvents,
                ...state,
            };
        case ADD_EVENT:
            if (!state[action.event.id]) {
                const newState = {
                    ...state,
                    [action.event.id]: action.event,
                };
                return newState;
            }
            return {
                ...state,
                [action.event.id]: {
                    ...state[action.event.id],
                    ...action.event
                },
            };
        case DELETE_EVENT:
            const newState = {
                ...state,
                eventList: [...state.eventList],
            }
            delete newState[action.eventId]

            return newState;
        default:
            return state;
    }
}

export default eventReducer;
