const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models')

const router = express.Router();

router.post('/',
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
