const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();

const { Ticket, Event } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');


router.delete('/:id',
    requireAuth,
    asyncHandler (async (req, res) => {
        const id = req.params.id;

        const ticketToDelete = await Ticket.findByPk(id);
        if (ticketToDelete) {
            const qty = ticketToDelete.qty;
            const eventId  = ticketToDelete.eventId;

            await ticketToDelete.destroy();

            const eventToUpdate = await Event.findByPk(eventId);

            const updatedCapacity = eventToUpdate.capacity + qty;


            await Event.update(
                { capacity: updatedCapacity },
                {
                    where: { id: eventId }
                }
            );

            return res.json(id);

        }
}));

module.exports = router;
