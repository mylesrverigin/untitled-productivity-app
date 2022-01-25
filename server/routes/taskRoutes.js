"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express = require('express');
const router = express.Router();
const taskCollection_1 = require("../database/Schema/taskCollection");
const errors_1 = __importDefault(require("../constants/errors"));
const databaseConnection_1 = require("../database/databaseConnection");
const TaskCollection = new taskCollection_1.taskCollection();
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
    const serverResponse = await TaskCollection.find({ createdBy: (0, databaseConnection_1.convertId)(userId) });
    res.status(200).json(serverResponse);
});
router.post('/', async (req, res) => {
    let response = {
        status: false,
        msg: '',
        data: []
    };
    let { authorized, userId } = req.authorization;
    let newTask = req.body;
    if (!authorized) {
        response.msg = errors_1.default.UNAUTHORIZED;
        return res.status(403).json(response);
    }
    if (!newTask) {
        response.msg = errors_1.default.NO_DATA_SENT;
        return res.status(403).json(response);
    }
    newTask.createdBy = (0, databaseConnection_1.convertId)(userId);
    console.log('test', newTask);
    const serverResponse = await TaskCollection.insert([newTask]);
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
    let updatedTask = req.body;
    if (!authorized) {
        response.msg = errors_1.default.UNAUTHORIZED;
        return res.status(403).json(response);
    }
    if (!updatedTask) {
        response.msg = errors_1.default.NO_DATA_SENT;
        return res.status(403).json(response);
    }
    const serverResponse = await TaskCollection.update(updatedTask);
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
    const serverResponse = await TaskCollection.delete({ _id: deleteId });
    console.log(serverResponse);
    if (!serverResponse.status) {
        return res.status(403).json(serverResponse);
    }
    return res.status(200).json(serverResponse);
});
module.exports = router;
