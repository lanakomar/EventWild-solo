const express = require('express')
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateLogin = [
    check('credential')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Please provide a valid email or username.'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a password.'),
    handleValidationErrors
];

// Log in
router.post('/',
    validateLogin,
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
        return res.json({ user });
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

// Restore session user
router.get('/',
    restoreUser,
    (req, res) => {
        const { user } = req;
        if (user) {
            //if there is a session user
            //it will be returned in the response
            return res.json({ user: user.toSafeObject() });

            //if there is no session user
            //empty object will be returned
        } else return res.json({});
    }
);

module.exports = router;
