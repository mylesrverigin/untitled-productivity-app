const express = require('express');
const router = express.Router();

router.get('/',(req:any,res:any)=>{
    res.status(200).json('get works')
})

router.post('/',(req:any,res:any)=>{
    res.status(200).json('post works')
})

router.put('/',(req:any,res:any)=>{
    res.status(200).json('put works')
})

export = router;