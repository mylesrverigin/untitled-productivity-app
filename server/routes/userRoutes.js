"use strict";
const express = require('express');
const router = express.Router();
const userCollection_1 = require("../database/Schema/userCollection");
const UserSchema = new userCollection_1.userCollection();
router.get('/', async (req, res) => {
    const response = await UserSchema.find({});
    res.status(200).json(response);
});
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const response = await UserSchema.findById(id);
    res.status(200).json(response);
});
router.post('/', async (req, res) => {
    const newUser = req.body;
    const response = await UserSchema.insertNewUser(newUser);
    res.status(200).json(response);
});
router.put('/', async (req, res) => {
    const updatedUser = req.body;
    const response = await UserSchema.updateUser(updatedUser);
    res.status(200).json(response);
});
module.exports = router;
