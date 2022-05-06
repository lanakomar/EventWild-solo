const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Ticket, Event } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .withMessage('Please provide an email address.')
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('username')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a username.')
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a password.')
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
];

// Sign up
router.post('/',
    validateSignup,
    asyncHandler(async (req, res) => {
        const { email, password, username } = req.body;

        // Create a new user(calling User.signup method)
        const user = await User.signup({ email, username, password });

        //If user successfully created
        //Create a token and set it in a cookie
        await setTokenCookie(res, user);

        //if the creation og the user was not successful
        //sequelize will create an error
        //and passs it onto next error handler

        //return JSON response with user data
        return res.json({ user });
    })
);

//get tickets for specified user
router.get('/:id(\\d+)/tickets',
    requireAuth,
    asyncHandler  (async(req, res) => {
        const userId = req.params.id;
        const tickets = await Ticket.findAll({
            where: { userId },
            include: {
              model: Event,
            },
            order: [[ "createdAt", "DESC" ]]
        });

        if (tickets) {
            return res.json(tickets);
        } else {
            return res.json({message: "You have no reserved tickets yet."});
        }
}));

//get events where user is the host
router.get('/:id(\\d+)/events',
    requireAuth,
    asyncHandler (async (req, res) => {
        const hostId = req.params.id;

        const events = await Event.findAll({
            where: { hostId }
        });

        if (events) {
            return res.json(events)
        } else {
            return res.json({ message: "You don't host an event yet." })
        }
    }));

module.exports = router;
