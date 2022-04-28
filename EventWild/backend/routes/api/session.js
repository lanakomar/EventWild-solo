const express = require('express')
const asyncHandler = require('express-async-handler');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

// Log in
router.post('/',
    asyncHandler(async (req, res, next) => {
        const { credential, password } = req.body;

        const user = await User.login({ credential, password });

        //if no user with given credentials returned
        //create an error and pass it to the error handler
        if (!user) {
            const err = new Error('Login failed');
            err.status = 401;
            err.title = 'Login failed';
            err.errors = ['The provided credentials were invalid.'];
            return next(err);
        }

        //if there is a user returned with given credentials
        //create a token and set it in a cookie
        await setTokenCookie(res, user);

        //return JSON response with user data
        return res.json({user});
    })
);

// Log out
router.delete('/',
    (_req, res) => {
        //remove the token cookie from the response
        res.clearCookie('token');

        //return a JSON response with a success message
        return res.json({ message: 'success' });
    }
);

module.exports = router;
