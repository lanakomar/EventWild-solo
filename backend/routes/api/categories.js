const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();

const { Category } = require('../../db/models');

router.get('/', asyncHandler (async (req, res) => {
    const categories = await Category.findAll();

    return res.json(categories);
}))

module.exports = router;
