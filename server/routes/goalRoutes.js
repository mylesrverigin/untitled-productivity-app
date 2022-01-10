"use strict";
const express = require('express');
const router = express.Router();
const goalCollection_1 = require("../database/Schema/goalCollection");
const GoalCollection = new goalCollection_1.goalCollection();
router.get('/', async (req, res) => {
    const response = await GoalCollection.find({});
    res.status(200).json(response);
});
router.post('/', async (req, res) => {
    const newGoal = req.body;
    const response = await GoalCollection.insert([newGoal]);
    res.status(200).json(response);
});
router.put('/', (req, res) => {
    res.status(200).json('put works');
});
module.exports = router;
