const express = require('express');
const router = express.Router();

import {goalCollection} from '../database/Schema/goalCollection';
import { databaseResponse } from '../database/Schema/databaseCollection';
import errors from '../constants/errors';
import { convertId } from '../database/databaseConnection';
import { ObjectId } from 'mongodb';

const GoalCollection = new goalCollection();

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

    const serverResponse:databaseResponse = await GoalCollection.find({createdBy:convertId(userId)});
    res.status(200).json(serverResponse);
})

router.get('/:id',async (req:any,res:any)=>{
    const id = req.params.id;
    const response:databaseResponse = await GoalCollection.findById(id);
    res.status(200).json(response);
})

router.post('/',async (req:any,res:any)=>{
    let response:databaseResponse = {
        status:false,
        msg:'',
        data:[]
    }
    let {authorized,userId} = req.authorization
    let newGoal = req.body;

    if (!authorized) {
        response.msg = errors.UNAUTHORIZED;
        return res.status(403).json(response);
    }
    if (!newGoal) {
        response.msg = errors.NO_DATA_SENT;
        return res.status(403).json(response);
    }
    newGoal.createdBy = convertId(userId);
    console.log('test',newGoal);
    const serverResponse:databaseResponse = await GoalCollection.insert([newGoal]);
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
    let updatedGoal = req.body;

    if (!authorized) {
        response.msg = errors.UNAUTHORIZED;
        return res.status(403).json(response);
    }
    if (!updatedGoal) {
        response.msg = errors.NO_DATA_SENT;
        return res.status(403).json(response);
    }
    if (updatedGoal.subgoal) {
        updatedGoal.subgoal = new ObjectId(updatedGoal.subgoal);
    }
    const serverResponse:databaseResponse = await GoalCollection.update(updatedGoal);
    console.log(serverResponse);
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
    const serverResponse:databaseResponse = await GoalCollection.delete({_id:deleteId});
    console.log(serverResponse);
    if (!serverResponse.status) {
        return res.status(403).json(serverResponse);
    }
    return res.status(200).json(serverResponse)
})

export = router;