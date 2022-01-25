"use strict";
const express = require('express');
const router = express.Router();
router.get('/', (req, res) => {
    res.status(200).json('get works');
});
router.post('/', (req, res) => {
    res.status(200).json('post works');
});
router.put('/', (req, res) => {
    res.status(200).json('put works');
});
router.delete('/:id', async (req, res) => {
    res.status(200).json('delete works');
});
module.exports = router;
