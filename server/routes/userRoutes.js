"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express = require('express');
const router = express.Router();
const userCollection_1 = require("../database/Schema/userCollection");
const pwHash_1 = require("../utils/pwHash");
const errors_1 = __importDefault(require("../constants/errors"));
const jwtUtil_1 = require("../utils/jwtUtil");
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
    let response = {
        status: false,
        msg: '',
        data: []
    };
    const loginInfo = req.body;
    if (!loginInfo.username || !loginInfo.password) {
        response.msg = errors_1.default.NO_USER_PASSWORD;
        return res.status(403).json(response);
    }
    let serverResponse = await UserSchema.find({ username: loginInfo.username }, false);
    if (!serverResponse.status || serverResponse.data.length === 0) {
        response.msg = errors_1.default.DATA_NOT_FOUND;
        return res.status(404).json(response);
    }
    const passwordMatch = (0, pwHash_1.compareHash)(loginInfo.password, serverResponse.data[0].password);
    if (!passwordMatch) {
        response.msg = errors_1.default.PASSWORD_INCORRECT;
        return res.status(403).json(response);
    }
    let userData = serverResponse.data[0];
    let token = (0, jwtUtil_1.createAuthToken)({ id: userData._id, version: userData.refreshversion });
    if (!token) {
        response.msg = errors_1.default.CREATE_TOKEN_ERROR;
        return res.status(500).json(response);
    }
    response.status = true;
    response.data = [{ token: token, username: userData.username }];
    return res.status(200).json(response);
});
router.post('/', async (req, res) => {
    let response = {
        status: false,
        msg: '',
        data: []
    };
    const newUser = req.body;
    if (!newUser.username || !newUser.password || !newUser.passwordConfirm) {
        response.msg = errors_1.default.NO_USER_PASSWORD;
        return res.status(403).json(response);
    }
    if (newUser.password !== newUser.passwordConfirm) {
        response.msg = errors_1.default.PASSWORDS_NO_MATCH;
        return res.status(403).json(response);
    }
    const serverResponse = await UserSchema.insertNewUser(newUser);
    if (!serverResponse.status) {
        response.msg = serverResponse.msg;
        return res.status(403).json(response);
    }
    let userData = serverResponse.data[0];
    let token = (0, jwtUtil_1.createAuthToken)({ id: userData._id, version: userData.refreshversion });
    if (!token) {
        response.msg = errors_1.default.CREATE_TOKEN_ERROR;
        return res.status(500).json(response);
    }
    response.status = true;
    response.data = [{ token: token, username: userData.username }];
    return res.status(200).json(response);
});
router.put('/', async (req, res) => {
    const updatedUser = req.body;
    const response = await UserSchema.updateUser(updatedUser);
    res.status(200).json(response);
});
module.exports = router;
