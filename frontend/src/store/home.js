// const LOAD = 'home/LOAD';

// const loadEvents = list => ({
//     type: LOAD,
//     list
// });

// export const getEvents = () => async dispatch => {
//     const response = await fetch('/api/');

//     if (response.ok) {
//         const list = await response.json();
//         dispatch(loadEvents(list));
//     }
// }

// const initialState = [];

// const homeReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case LOAD:
//             const allEvents = {};
//             action.list.forEach(event => {
//                 allEvents[event.id] = event;
//             })
//             return {
//                 ...allEvents,
//                 ...state
//             };
//         default:
//             return state;
//     }
// }

// export default homeReducer;
