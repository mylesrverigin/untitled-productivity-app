const express = require('express');
const router = express.Router();
import {userCollection} from '../database/Schema/userCollection';

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

router.post('/',async (req:any,res:any)=>{
    const newUser = req.body;
    const response = await UserSchema.insertNewUser(newUser);
    res.status(200).json(response)
})

router.put('/',async (req:any,res:any)=>{
    const updatedUser = req.body;
    const response = await UserSchema.updateUser(updatedUser);
    res.status(200).json(response)
})

export = router;