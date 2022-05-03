const { check } = require('express-validator');
const { handleValidationErrors } = require('./utils');

const db = require('../db/models');


const hostId = check('hostId')
    .notEmpty()
    .withMessage('Cannot be emty');
const categoryId = check('categoryId')
    .notEmpty()
    .withMessage('Please, choose category');
const name = check('name')
    .notEmpty()
    .withMessage('Please, enter event name')
    .custom((value, { req }) => {
        return db.Event.findOne({
            where: {
                name: value,
            }
        })
        .then(event => {
            if (event) {
                return Promise.reject('Event with this name already exists');
            }
        }
        );
    });
const description = check('description')
    .notEmpty()
    .withMessage('Please, enter event description');
const location = check('location')
    .notEmpty()
    .withMessage('Please, enter event location');
const date = check('date')
    .notEmpty()
    .withMessage('Please, enter event date')
    .custom(date => {
        let today = new Date();
        let enteredDate = new Date(date);
        if (enteredDate < today) {
            throw Error('Date of event cannot be in the past');
        }
        return true;
    });
const capacity = check('capacity')
    .notEmpty()
    .withMessage('Please, enter event capacity')
    .isInt()
    .withMessage('Capacity must be a number');
const img = check('img')
    .notEmpty()
    .withMessage('Please, upload event image');


exports.validateCreate = [
    hostId,
    categoryId,
    name,
    description,
    location,
    date,
    capacity,
    img,
    handleValidationErrors
];
