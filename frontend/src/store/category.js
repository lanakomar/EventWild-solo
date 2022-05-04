const LOAD_CATEGORIES = 'event/LOAD_CATEGORIES';


const loadCategories = (categories) => ({
    type: LOAD_CATEGORIES,
    categories
});


export const getCategories = () => async dispatch => {
    const response = await fetch('/api/categories');

    if (response.ok) {
        const categories = await response.json();
        dispatch(loadCategories(categories));
    }
};

const initialState = {};

const categoryReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_CATEGORIES:
            const newCategories = {};
            action.categories.forEach(category => {
                newCategories[category.id] = category;
            })
            return {
                ...state,
                ...newCategories
            };
        default:
            return state;
    }
}


export default categoryReducer;
