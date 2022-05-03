import { csrfFetch } from './csrf';
import { ValidationError } from '../utils/validationError';

const LOAD_EVENTS = 'home/LOAD';
const LOAD_CATEGORIES = 'event/LOAD_CATEGORIES';
const ADD_EVENT = 'event/ADD_EVENT';

const loadEvents = list => ({
    type: LOAD_EVENTS,
    list
});

const loadCategories = (categories) => ({
    type: LOAD_CATEGORIES,
    categories
});

const addEvent = (event) => ({
    type: ADD_EVENT,
    event
});

export const getEvents = () => async dispatch => {
    const response = await fetch('/api/');
    if (response.ok) {
        const list = await response.json();
        dispatch(loadEvents(list));
    }
}

export const getCategories = () => async dispatch => {
    const response = await fetch('/api/categories');

    if (response.ok) {
        const categories = await response.json();
        dispatch(loadCategories(categories));
    }
};

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


const initialState = {
    eventList: [],
    categories: []
};


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
                eventList: action.list
            };
        case LOAD_CATEGORIES:
            return {
                ...state,
                categories: action.categories
            };
        case ADD_EVENT:
            if (!state[action.event.id]) {
                const newState = {
                    ...state,
                    [action.event.id]: action.event,
                    eventList: [...state.eventList]
                };
                newState.eventList.push(action.event)
                return newState;
            }
            return {
                ...state,
                [action.event.id]: {
                    ...state[action.event.id],
                    ...action.event
                }
            };
        default:
            return state;
    }
}

export default eventReducer;
