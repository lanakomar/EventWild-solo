const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
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

module.exports = router;
