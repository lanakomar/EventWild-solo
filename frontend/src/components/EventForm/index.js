import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';


import { getCategories, createEvent } from '../../store/event'

const EventForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [date, setDate] = useState("");
    const [capacity, setCapacity] = useState("");
    const [img, setImg] = useState(null);
    const [category, setCategory] = useState("");

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    const categoriesList = useSelector(state => {
        return state.event.categories;
    });

    const userId = useSelector(state => {
        return state.session.user.id
    });


    if (!categoriesList) {
        return null;
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        const type = img.type;
        const toBase64 =  file =>  new Promise((resolve, reject) => {
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
            img: await toBase64(img),
            categoryId: category,
            hostId: userId,
            type
        };

        let createdEvent = await dispatch(createEvent(payload));

        if (createdEvent) {
            history.push(`/events/${createdEvent.id}`)
        }
    }

    return (
        <form encType="multipart/form-data" onSubmit={onSubmit}>
            <div>
                <label htmlFor="name">Event Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="category">Event Category</label>
                <select
                    id="category"
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
            </div>
            <div>
                <label htmlFor="description">Event Description</label>
                <textarea
                    id="description"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
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
            </div>
            <div>
                <label htmlFor="capacity">Capacity</label>
                <input
                    type="number"
                    min="0"
                    id="capacity"
                    name="capacity"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="img"></label>
                <input
                    type="file"
                    id="img"
                    name="img"
                    onChange={(e) => setImg(e.target.files[0])}
                />
            </div>
            <button type='submit'>Create Event</button>
            <button>Cancel</button>
        </form>
    )
}

export default EventForm;
