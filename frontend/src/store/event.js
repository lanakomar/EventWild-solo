import { csrfFetch } from './csrf';
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

    const response = await csrfFetch('/api/events',{
        method: "POST",
        body: JSON.stringify(payload)
    });

    if (response.ok) {
        const event = await response.json();

        dispatch(addEvent(event));
        return event;
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
                console.log("newEventList", newState.eventList)
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
