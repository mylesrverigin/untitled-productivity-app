const express = require('express');
const router = express.Router();

import {goalCollection} from '../database/Schema/goalCollection';
import { databaseResponse } from '../database/Schema/databaseCollection';

const GoalCollection = new goalCollection();

router.get('/',async (req:any,res:any)=>{
    const response:databaseResponse = await GoalCollection.find({});
    res.status(200).json(response);
})

router.post('/',async (req:any,res:any)=>{
    const newGoal = req.body;
    const response:databaseResponse = await GoalCollection.insert([newGoal]);
    res.status(200).json(response)
})

router.put('/',(req:any,res:any)=>{
    res.status(200).json('put works')
})

export = router;