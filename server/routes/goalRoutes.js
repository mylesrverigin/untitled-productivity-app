"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express = require('express');
const router = express.Router();
const goalCollection_1 = require("../database/Schema/goalCollection");
const errors_1 = __importDefault(require("../constants/errors"));
const databaseConnection_1 = require("../database/databaseConnection");
const mongodb_1 = require("mongodb");
const GoalCollection = new goalCollection_1.goalCollection();
router.get('/', async (req, res) => {
    let response = {
        status: false,
        msg: '',
        data: []
    };
    let { authorized, userId } = req.authorization;
    if (!authorized) {
        response.msg = errors_1.default.UNAUTHORIZED;
        return res.status(403).json(response);
    }
    const serverResponse = await GoalCollection.find({ createdBy: (0, databaseConnection_1.convertId)(userId) });
    res.status(200).json(serverResponse);
});
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const response = await GoalCollection.findById(id);
    res.status(200).json(response);
});
router.post('/', async (req, res) => {
    let response = {
        status: false,
        msg: '',
        data: []
    };
    let { authorized, userId } = req.authorization;
    let newGoal = req.body;
    if (!authorized) {
        response.msg = errors_1.default.UNAUTHORIZED;
        return res.status(403).json(response);
    }
    if (!newGoal) {
        response.msg = errors_1.default.NO_DATA_SENT;
        return res.status(403).json(response);
    }
    newGoal.createdBy = (0, databaseConnection_1.convertId)(userId);
    console.log('test', newGoal);
    const serverResponse = await GoalCollection.insert([newGoal]);
    console.log(serverResponse);
    res.status(200).json(serverResponse);
});
router.put('/', async (req, res) => {
    let response = {
        status: false,
        msg: '',
        data: []
    };
    let { authorized } = req.authorization;
    let updatedGoal = req.body;
    if (!authorized) {
        response.msg = errors_1.default.UNAUTHORIZED;
        return res.status(403).json(response);
    }
    if (!updatedGoal) {
        response.msg = errors_1.default.NO_DATA_SENT;
        return res.status(403).json(response);
    }
    if (updatedGoal.subgoal) {
        updatedGoal.subgoal = new mongodb_1.ObjectId(updatedGoal.subgoal);
    }
    const serverResponse = await GoalCollection.update(updatedGoal);
    if (!serverResponse.status) {
        return res.status(403).json(serverResponse);
    }
    return res.status(200).json(serverResponse);
});
router.delete('/:id', async (req, res) => {
    const deleteId = req.params.id;
    let response = {
        status: false,
        msg: '',
        data: []
    };
    let { authorized } = req.authorization;
    if (!authorized) {
        response.msg = errors_1.default.UNAUTHORIZED;
        return res.status(403).json(response);
    }
    if (!deleteId) {
        response.msg = errors_1.default.MISSING_ID;
        return res.status(403).json(response);
    }
    const serverResponse = await GoalCollection.delete({ _id: deleteId });
    console.log(serverResponse);
    if (!serverResponse.status) {
        return res.status(403).json(serverResponse);
    }
    return res.status(200).json(serverResponse);
});
module.exports = router;
