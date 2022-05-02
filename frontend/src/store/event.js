const LOAD_CATEGORIES = 'event/LOAD_CATEGORIES';
const ADD_EVENT = 'event/ADD_EVENT';

const loadCategories = (categories) => ({
    type: LOAD_CATEGORIES,
    categories
});

const addEvent = (event) => ({
    type: ADD_EVENT,
    event
});

export const getCategories = () => async dispatch => {
    const response = await fetch('/api/categories');

    if (response.ok) {
        const categories = await response.json();
        dispatch(loadCategories(categories));
    }
};

export const createEvent = (payload) => async dispatch => {
    const response = await fetch('/api/events',{
        method: "POST",
        headers: { "Content-Type": "multipart/form-data" },
        body: JSON.stringify(payload)
    });

    if (response.ok) {
        const event = response.json();
        dispatch(addEvent(event));
    }
};


const initialState = {
    categories: []
};

const eventReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_CATEGORIES:
            return {
                ...state,
                categories: action.categories
            };
        case ADD_EVENT:
                const newState = {
                    ...state,
                    [action.event.id]: action.event
                }
                return newState

        default:
            return state;
    }
}

export default eventReducer;
