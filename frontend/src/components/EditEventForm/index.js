import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { ValidationError } from '../../utils/validationError';
import ErrorMessage from '../ErrorMessage';
import { editEvent, getOneEvent } from '../../store/event'
import { getCategories } from '../../store/category';
import './EditEventForm.css';



const EditEventForm = () => {
    const { eventId } = useParams();
    const dispatch = useDispatch();

    const event = useSelector(state => {
        return state.event[eventId];
    });
    const user = useSelector(state => {
        return state.session.user
    });

    console.log(user);
    const categoriesList = useSelector(state => {
        return state.category;
    });
    const history = useHistory();


    const [errorMessages, setErrorMessages] = useState({});
    const [name, setName] = useState(event.name);
    const [description, setDescription] = useState(event.description);
    const [location, setLocation] = useState(event.location);
    const [date, setDate] = useState(event.date);
    const [capacity, setCapacity] = useState(event.capacity);
    const [price, setPrice] = useState(event.price);
    const [img, setImg] = useState("");
    const [category, setCategory] = useState(event.categoryId);

    useEffect(() => {
        dispatch(getOneEvent(eventId))
    }, [dispatch]);

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);


    if (!categoriesList || !user || !event) {
        return null;
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        const type = img && img.type;
        const toBase64 = file => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });

        const payload = {
            ...event,
            name,
            description,
            location,
            date,
            capacity,
            price,
            img: img ? await toBase64(img) : null,
            categoryId: category,
            hostId: user.id,
            type,
            imgUrl: img ? null : event.img
        };

        console.log(payload);

        let editedEvent;
        try {
            editedEvent = await dispatch(editEvent(payload, eventId));
        } catch (error) {
            if (error instanceof ValidationError) {
                setErrorMessages(error.errors);
            } else {
                setErrorMessages({ overall: error.toString().slice(7) });
            }
        }

        if (editedEvent) {
            history.push(`/events/${editedEvent.id}`)
        }

    }

    const handleCancelClick = (e) => {
        e.preventDefault();
        history.push(`/events/${eventId}`);
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
                        {Object.values(categoriesList).map(category => {
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
                <div className='tickets-info'>
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
                    <div>
                        <label htmlFor="price">Ticket price</label>
                        <input
                            type="number"
                            min="0"
                            id="price"
                            name="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <ErrorMessage label={"Price"} message={errorMessages.price} />
                    </div>
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
                            <img src={event.img} />
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
                        If want to change image
                    </span>
                </div>
            </form>
        </div>
    )
}

export default EditEventForm;
