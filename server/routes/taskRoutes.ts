const express = require('express');
const router = express.Router();

import { taskCollection } from '../database/Schema/taskCollection';
import { databaseResponse } from '../database/Schema/databaseCollection';
import errors from '../constants/errors';
import { convertId } from '../database/databaseConnection';
import { ObjectId } from 'mongodb';

const TaskCollection = new taskCollection();

router.get('/',async (req:any,res:any)=>{
    let response:databaseResponse = {
        status:false,
        msg:'',
        data:[]
    }
    let {authorized,userId} = req.authorization

    if (!authorized) {
        response.msg = errors.UNAUTHORIZED;
        return res.status(403).json(response);
    }

    const serverResponse:databaseResponse = await TaskCollection.find({createdBy:convertId(userId)});
    res.status(200).json(serverResponse);
})

router.post('/',async (req:any,res:any)=>{
    let response:databaseResponse = {
        status:false,
        msg:'',
        data:[]
    }
    let {authorized,userId} = req.authorization
    let newTask = req.body;

    if (!authorized) {
        response.msg = errors.UNAUTHORIZED;
        return res.status(403).json(response);
    }
    if (!newTask) {
        response.msg = errors.NO_DATA_SENT;
        return res.status(403).json(response);
    }
    newTask.createdBy = convertId(userId);
    console.log('test',newTask);
    const serverResponse:databaseResponse = await TaskCollection.insert([newTask]);
    console.log(serverResponse);
    res.status(200).json(serverResponse)
})

router.put('/',async (req:any,res:any)=>{
    let response:databaseResponse = {
        status:false,
        msg:'',
        data:[]
    }
    let {authorized} = req.authorization
    let updatedTask = req.body;

    if (!authorized) {
        response.msg = errors.UNAUTHORIZED;
        return res.status(403).json(response);
    }
    if (!updatedTask) {
        response.msg = errors.NO_DATA_SENT;
        return res.status(403).json(response);
    }
    const serverResponse:databaseResponse = await TaskCollection.update(updatedTask);
    if (!serverResponse.status) {
        return res.status(403).json(serverResponse);
    }
    return res.status(200).json(serverResponse)
})

router.delete('/:id',async (req:any,res:any)=>{
    const deleteId = req.params.id;
    let response:databaseResponse = {
        status:false,
        msg:'',
        data:[]
    }
    let {authorized} = req.authorization

    if (!authorized) {
        response.msg = errors.UNAUTHORIZED;
        return res.status(403).json(response);
    }
    if (!deleteId) {
        response.msg = errors.MISSING_ID;
        return res.status(403).json(response);
    }
    const serverResponse:databaseResponse = await TaskCollection.delete({_id:deleteId});
    console.log(serverResponse);
    if (!serverResponse.status) {
        return res.status(403).json(serverResponse);
    }
    return res.status(200).json(serverResponse)
})

export = router;