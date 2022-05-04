const express = require('express');
const asyncHandler = require('express-async-handler');
const mime = require('mime');

const db = require('../../db/models');
const eventValidattion = require('../../validations/event');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();


router.post('/',
    requireAuth,
    eventValidattion.validateCreate,
    asyncHandler(async (req, res) => {
        const { name, description, location, date, capacity, categoryId, hostId, type } = req.body;
        const imgType = mime.getExtension(type);

        const base64Data = req.body.img.split("base64,")[1];
        const imgName = Date.now();
        require("fs").writeFile(`public/images/${imgName}.${imgType}`, base64Data, 'base64', function (err) {
            console.log(err);
        });

        const url = `/images/${imgName}.${imgType}`;


        const eventToCreate = {
            name,
            description,
            location,
            date,
            capacity,
            categoryId,
            hostId,
            img: url
        }

        const eventNew = await db.Event.create(eventToCreate);
        const event = await db.Event.findByPk(eventNew.id, {
            include: [db.User, db.Category]
        });

        return res.json(event);
    }));

router.get('/:id(\\d+)', asyncHandler (async (req, res) => {
    const id = req.params.id;
    const event = await db.Event.findByPk(id, {
        include: [db.User, db.Category]
    });

    return res.json(event);
}));

router.patch('/:id(\\d+)',
    requireAuth,
    eventValidattion.validateEdit,
    asyncHandler (async (req, res) => {
        const id = req.params.id;
        const { name,
                description,
                location,
                date,
                capacity,
                categoryId,
                hostId,
                img,
                type,
                imgUrl
            } = req.body;

            console.log(hostId, "&&&&&&&&&")

        let url;
        if (img) {
            const imgType = mime.getExtension(type);

            const base64Data = req.body.img.split("base64,")[1];
            const imgName = Date.now();
            require("fs").writeFile(`public/images/${imgName}.${imgType}`, base64Data, 'base64', function (err) {
                console.log(err);
            });

            url = `/images/${imgName}.${imgType}`;
        } else {
            url = imgUrl;
        }

        const eventToUpdate = {
            name,
            description,
            location,
            date,
            capacity,
            categoryId,
            hostId,
            img: url
        }

        await db.Event.update(
            eventToUpdate,
            {
                where: { id }
            }
        );

        const updatedEvent = await db.Event.findByPk(id, {
            include: [db.User, db.Category]
        });

        return res.json(updatedEvent);
}));

router.delete('/:id(\\d+)',
    requireAuth,
    asyncHandler (async (req, res) => {
        const eventId = req.params.id;

        const eventToDelete = await db.Event.findByPk(eventId);
        if (!eventToDelete) throw new Error('Cannot find event');

        await eventToDelete.destroy();
        return res.json(eventToDelete);
    }))

module.exports = router;
