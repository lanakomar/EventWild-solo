import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { ValidationError } from '../../utils/validationError';
import ErrorMessage from '../ErrorMessage';
import { getCategories } from '../../store/event'
import './EditEventForm.css';



const EditEventForm = () => {
    const { eventId } = useParams();
    const dispatch = useDispatch();


    const event = useSelector(state => {
        return state.event[eventId];
    });

    console.log(event);
    const categoriesList = useSelector(state => {
        return state.event.categories;
    });

    const history = useHistory();

    const [errorMessages, setErrorMessages] = useState({});
    const [name, setName] = useState(event.name);
    const [description, setDescription] = useState(event.description);
    const [location, setLocation] = useState(event.location);
    const [date, setDate] = useState(event.date);
    const [capacity, setCapacity] = useState(event.capacity);
    const [img, setImg] = useState(event.img);
    const [category, setCategory] = useState(event.categoryId);

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);


    const onSubmit = () => { }

    const handleCancelClick = () => {
        history.push("/");
    };

    return (
        <div className='form-page'>
            <form encType="multipart/form-data" className='edit-form' onSubmit={onSubmit}>
                <h2>Edit Event</h2>
                <ErrorMessage message={errorMessages.overall} />
                <div>
                    <label htmlFor="name">Event Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <ErrorMessage label={"Name"} message={errorMessages.name} />
                </div>
                <div>
                    <label htmlFor="categoryId">Event Category</label>
                    <select
                        name="categoryId"
                        id="categoryId"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="" disabled>Choose category</option>
                        {categoriesList.map(category => {
                            return (
                                <option
                                    key={category.id}
                                    value={category.id}
                                >
                                    {category.type}
                                </option>
                            )
                        })}
                    </select>
                    <ErrorMessage label={"Category"} message={errorMessages.categoryId} />
                </div>
                <div>
                    <label htmlFor="description">Event Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <ErrorMessage label={"Description"} message={errorMessages.description} />
                </div>
                <div>
                    <label htmlFor="location">Event Location</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                    <ErrorMessage label={"Location"} message={errorMessages.location} />
                </div>
                <div>
                    <label htmlFor="date">Event Date</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                    <ErrorMessage label={"Date"} message={errorMessages.date} />
                </div>
                <div>
                    <label htmlFor="capacity">Available tickets</label>
                    <input
                        type="number"
                        min="0"
                        id="capacity"
                        name="capacity"
                        value={capacity}
                        onChange={(e) => setCapacity(e.target.value)}
                    />
                    <ErrorMessage label={"Capacity"} message={errorMessages.capacity} />
                </div>
                <div className='file-input'>
                    <label htmlFor="img">Add Event Image<sup>*</sup></label>
                    <div className='input-and-img-container'>
                    <input
                        type="file"
                        id="img"
                        name="img"
                        onChange={(e) => setImg(e.target.files[0])}
                    />
                    <div className="img-previous">
                        <img src={event.img}/>
                    </div>
                    </div>
                    <ErrorMessage label={"Image"} message={errorMessages.img} />
                </div>
                <div className='button-container'>
                    <button className="button" type='submit'>Edit Event</button>
                    <button className="button" onClick={handleCancelClick}>Cancel</button>
                </div>
                <div className='explanation'>
                    <span>
                        <sup>*</sup>
                         If want to cnange image
                    </span>
                </div>
            </form>
        </div>
    )
}

export default EditEventForm;
