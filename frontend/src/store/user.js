const LOAD_USER_EVENTS = 'user/LOAD_USER_EVENTS';

const loadUserEvents = (events) => ({
    type: LOAD_USER_EVENTS,
    events
});

export const getUserEvents = userId => async dispatch => {
    const response = await fetch(`/api/users/${userId}/events`);

    if (response.ok) {
        const events = await response.json();
        dispatch(loadUserEvents(events));
    } else {
        //do smth
    }
}

const initialState = {};

const userEventsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_USER_EVENTS:
            const newEvents = {};
            action.events.forEach(event => {
                newEvents[event.id] = event;
            })
            return {
                ...state,
                ...newEvents
            };
        default:
            return state;
    }
};

export default userEventsReducer;
