import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import './EventForm.css'
import { ValidationError } from '../../utils/validationError';
import ErrorMessage from '../ErrorMessage';
import { createEvent } from '../../store/event';
import { getCategories } from '../../store/category';

const EventForm = () => {
    const [errorMessages, setErrorMessages] = useState({});

    const dispatch = useDispatch();
    const history = useHistory();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [date, setDate] = useState("");
    const [capacity, setCapacity] = useState("");
    const [price, setPrice] = useState("");
    const [img, setImg] = useState(null);
    const [category, setCategory] = useState("");

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    const categoriesList = useSelector(state => {
        return state.category;
    });

    const user = useSelector(state => {
        return state.session.user
    });


    if (!categoriesList || !user) {
        return null;
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        const toBase64 = file => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });

        const payload = {
            name,
            description,
            location,
            date,
            capacity,
            price,
            img: img ? await toBase64(img) : null,
            categoryId: category,
            hostId: user.id,
        };

        let createdEvent;
        try {
            createdEvent = await dispatch(createEvent(payload));
        } catch (error) {
            if (error instanceof ValidationError) {
                setErrorMessages(error.errors);
            } else {
                setErrorMessages({ overall: error.toString().slice(7) });
            }
        }


        if (createdEvent) {
            history.push(`/events/${createdEvent.id}`)
        }
    }

    const handleCancelClick = (e) => {
        e.preventDefault();
        history.push("/");
    }

    return (
        <div className='form-page'>
            <form encType="multipart/form-data" onSubmit={onSubmit}>
                <h2>Create Event</h2>
                <ErrorMessage message={errorMessages.overall} />
                <div>
                    <label htmlFor="name">Event Name<sup>*</sup></label>
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
                    <label htmlFor="categoryId">Event Category<sup>*</sup></label>
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
                    <label htmlFor="description">Event Description<sup>*</sup></label>
                    <textarea
                        id="description"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <ErrorMessage label={"Description"} message={errorMessages.description} />
                </div>
                <div>
                    <label htmlFor="location">Event Location<sup>*</sup></label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={location}
                        placeholder="ex: Heather Farm Park"
                        onChange={(e) => setLocation(e.target.value)}
                    />
                    <ErrorMessage label={"Location"} message={errorMessages.location} />
                </div>
                <div>
                    <label htmlFor="date">Event Date<sup>*</sup></label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={date}
                        placeholder="ex: 12/31/2000"
                        onChange={(e) => setDate(e.target.value)}
                    />
                    <ErrorMessage label={"Date"} message={errorMessages.date} />
                </div>
                <div className='tickets-info'>
                    <div>
                        <label htmlFor="capacity">Available tickets<sup>*</sup></label>
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
                        <label htmlFor="price">Ticket price<sup>*</sup></label>
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
                    <input
                        type="file"
                        id="img"
                        name="img"
                        onChange={(e) => setImg(e.target.files[0])}
                    />
                    <ErrorMessage label={"Image"} message={errorMessages.img} />
                </div>
                <div className='button-container'>
                    <button className="button" type='submit'>Create Event</button>
                    <button className="button" onClick={handleCancelClick}>Cancel</button>
                </div>
                <div className='required-fields'><span><sup>*</sup> - required fields</span></div>
            </form>
        </div>
    )
}

export default EventForm;
