const express = require('express');
const asyncHandler = require('express-async-handler');
const mime = require('mime');

const db = require('../../db/models');
const eventValidattion = require('../../validations/event');

const router = express.Router();

router.post('/',
 eventValidattion.validateCreate,
 asyncHandler (async (req, res) => {
    const { name, description, location, date, capacity, categoryId, hostId, type } = req.body;
    const imgType =  mime.getExtension(type);

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
    const event = await db.Event.findByPk(eventNew.id,{
        include: [db.User, db.Category]
    });
    console.log(event);
    return res.json(event);


}))

module.exports = router;
