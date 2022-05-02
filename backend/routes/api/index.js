const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const db = require('../../db/models');
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const categoriesRouter = require('./categories.js');
const eventsRouter = require('./events.js');



router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/categories', categoriesRouter);

router.use('/events', eventsRouter);

// home page
router.get('/', asyncHandler (async (req, res) => {
    const eventsList = await db.Event.findAll({
        include: [db.User, db.Category ],
        order: [['createdAt', 'DESC']],
        limit: 18
    });

    return res.json(eventsList);
}));

module.exports = router;
