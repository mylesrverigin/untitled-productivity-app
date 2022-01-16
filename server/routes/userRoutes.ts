const express = require('express');
const router = express.Router();
import {userCollection} from '../database/Schema/userCollection';
import { databaseResponse } from '../database/Schema/databaseCollection';
import { compareHash } from '../utils/pwHash';
import errors from '../constants/errors';
import { createAuthToken } from '../utils/jwtUtil';

const UserSchema = new userCollection();

router.get('/',async (req:any,res:any)=>{
    const response = await UserSchema.find({});
    res.status(200).json(response);
})

router.get('/:id',async (req:any,res:any)=>{
    const id = req.params.id;
    const response = await UserSchema.findById(id);
    res.status(200).json(response);
})

router.post('/login',async (req:any,res:any)=>{
    let response:databaseResponse = {
        status : false,
        msg : '',
        data : []
    }

    const loginInfo = req.body;
    if (!loginInfo.username || !loginInfo.password) {
        response.msg = errors.NO_USER_PASSWORD
        return res.status(403).json(response);
    }
    
    let serverResponse = await UserSchema.find({username:loginInfo.username},false);
    if (!serverResponse.status || serverResponse.data.length === 0) {
        response.msg = errors.DATA_NOT_FOUND;
        return res.status(404).json(response)
    }

    const passwordMatch = compareHash(loginInfo.password,serverResponse.data[0].password)
    if ( !passwordMatch) {
        response.msg = errors.PASSWORD_INCORRECT;
        return res.status(403).json(response);
    }

    let userData = serverResponse.data[0];
    let token = createAuthToken({id:userData._id,version:userData.refreshversion})
    if (!token) {
        response.msg = errors.CREATE_TOKEN_ERROR
        return res.status(500).json(response);
    }

    response.status = true;
    response.data = [{token:token,username:userData.username}]
    return res.status(200).json(response)
})

router.post('/',async (req:any,res:any)=>{
    let response:databaseResponse = {
        status : false,
        msg : '',
        data : []
    }
    
    const newUser = req.body;
    if (!newUser.username || !newUser.password || !newUser.passwordConfirm) {
        response.msg = errors.NO_USER_PASSWORD
        return res.status(403).json(response);
    }

    if ( newUser.password !== newUser.passwordConfirm) {
        response.msg = errors.PASSWORDS_NO_MATCH;
        return res.status(403).json(response);
    }
    
    const serverResponse = await UserSchema.insertNewUser(newUser);
    if (!serverResponse.status) {
        response.msg = serverResponse.msg;
        return res.status(403).json(response);
    }

    let userData = serverResponse.data[0];
    let token = createAuthToken({id:userData._id,version:userData.refreshversion})
    if (!token) {
        response.msg = errors.CREATE_TOKEN_ERROR
        return res.status(500).json(response);
    }

    response.status = true;
    response.data = [{token:token,username:userData.username}]
    return res.status(200).json(response)
})

router.put('/',async (req:any,res:any)=>{
    const updatedUser = req.body;
    const response = await UserSchema.updateUser(updatedUser);
    res.status(200).json(response)
})

export = router;