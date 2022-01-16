"use strict";
const express = require('express');
const router = express.Router();
const userCollection_1 = require("../database/Schema/userCollection");
const pwHash_1 = require("../utils/pwHash");
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
router.post('/login', async (req, res) => {
    const loginInfo = req.body;
    console.log(loginInfo);
    let response = await UserSchema.find({ username: loginInfo.username }, false);
    if (!response.status || response.data.length === 0) {
        response.msg = 'no user found';
        return res.status(404).json(response);
    }
    const passwordMatch = (0, pwHash_1.compareHash)(loginInfo.password, response.data[0].password);
    console.log(response);
    // todo generic response
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
