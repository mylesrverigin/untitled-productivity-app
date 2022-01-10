const express = require('express');
const router = express.Router();
import {userCollection} from '../database/Schema/userCollection';

const UserSchema = new userCollection();

router.get('/',async (req:any,res:any)=>{
    const response = await UserSchema.find({});
    console.log(response);
    res.status(200).json(response);
})

router.post('/',async (req:any,res:any)=>{
    const newUser = req.body;
    const response = await UserSchema.insertNewUser(newUser);
    res.status(200).json(response)
})

router.put('/',(req:any,res:any)=>{
    res.status(200).json('put works')
})

export = router;