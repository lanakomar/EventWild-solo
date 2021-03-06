const express = require('express');
const asyncHandler = require('express-async-handler');
// const mime = require('mime');

const db = require('../../db/models');
const eventValidattion = require('../../validations/event');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

// home page
router.get('/', asyncHandler(async (req, res) => {
    const eventsList = await db.Event.findAll({
        include: [db.User, db.Category],
        order: [['createdAt', 'DESC']],
        limit: 18
    });

    return res.json(eventsList);
}));

router.post('/',
    requireAuth,
    eventValidattion.validateCreate,
    asyncHandler(async (req, res) => {
        const {
            name,
            description,
            location,
            date,
            capacity,
            categoryId,
            hostId,
            img,
            price } = req.body;


        const eventToCreate = {
            name,
            description,
            location,
            date,
            capacity,
            price,
            categoryId,
            hostId,
            img
        }

        const eventNew = await db.Event.create(eventToCreate);
        const event = await db.Event.findByPk(eventNew.id, {
            include: [db.User, db.Category]
        });

        return res.json(event);
    }));

router.get('/:id(\\d+)', asyncHandler(async (req, res) => {

    const id = req.params.id;
    const event = await db.Event.findByPk(id, {
        include: [db.User, db.Category]
    });
    if (event) {
        return res.json(event);
    } else {
        return res.status(404).json({});
    }
}));

router.patch('/:id(\\d+)',
    requireAuth,
    eventValidattion.validateEdit,
    asyncHandler(async (req, res) => {

        const id = req.params.id;
        const { name,
            description,
            location,
            date,
            capacity,
            price,
            categoryId,
            hostId,
            img,
            imgUrl
        } = req.body;

        const eventToUpdate = {
            name,
            description,
            location,
            date,
            capacity,
            price,
            categoryId,
            hostId,
            img
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
    asyncHandler(async (req, res) => {
        const eventId = req.params.id;

        const tickets = await db.Ticket.findAll({
            where: { eventId }
        });

        if (tickets.length > 0) {
            await db.Ticket.destroy({ where: {eventId} });
        }

        //deleting event from Event table
        const eventToDelete = await db.Event.findByPk(eventId);
        if (!eventToDelete) throw new Error('Cannot find event');

        await eventToDelete.destroy();
        return res.json(eventToDelete);
    }));

router.post('/:id(\\d+)/tickets',
    requireAuth,
    asyncHandler(async (req, res) => {

        const id = req.params.id;

        const { userId, eventId, qty, capacity } = req.body;

        const eventToUpdate =  await db.Event.findByPk(eventId);

        if (eventToUpdate.capacity >= qty) {
            const ticketToCreate = { userId, eventId, qty };

            const newTicket = await db.Ticket.create(ticketToCreate);

            if (newTicket) {
                const newCapacity = capacity - qty;

                await db.Event.update(
                    { capacity: newCapacity },
                    { where: { id } }
                )
                const updatedEvent = await db.Event.findByPk(eventId);

                res.json(updatedEvent)
            }
        } else {
            return res.status(410).json({ message: "There is not enough tickets" })
        }
    }));

module.exports = router;
