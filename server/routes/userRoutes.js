"use strict";
const express = require('express');
const router = express.Router();
const userCollection_1 = require("../database/Schema/userCollection");
const UserSchema = new userCollection_1.userCollection();
router.get('/', async (req, res) => {
    const response = await UserSchema.find({});
    console.log(response);
    res.status(200).json(response);
});
router.post('/', async (req, res) => {
    const newUser = req.body;
    const response = await UserSchema.insertNewUser(newUser);
    res.status(200).json(response);
});
router.put('/', (req, res) => {
    res.status(200).json('put works');
});
module.exports = router;
