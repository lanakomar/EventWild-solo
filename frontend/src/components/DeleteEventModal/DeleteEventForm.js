import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { deleteEvent } from '../../store/event';
import './DeleteEventForm.css';

const DeleteEventForm = ({ event, user, setShowModal }) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const deletedEvent = await dispatch(deleteEvent(event.id));
        if (deletedEvent) {
            history.push('/events');
        }
    }

    return (
        <div className="delete-event-form-container">
            <form className="delete-form" onSubmit={handleSubmit}>
                <h2>Delete this event?</h2>
                <div className="btns-container">
                    <button
                        className="button"
                        type="submit"
                    >
                        Delete
                    </button>
                    <button
                        className="button"
                        type="button"
                        onClick={() => setShowModal(false)}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}

export default DeleteEventForm
