const express = require('express');
const Ticket= require('../models/Ticket');
const router=express.Router();

//Create Ticket
router.post('/',async(req,res)=>{
    try{
        const ticket= new Ticket(req.body);
        await ticket.save();
        res.status(201).json(ticket);
    }catch(err){
        res.status(400).json({error:err.message});

    }
    
});
//get all ticket
router.get('/',async(req,res)=>{
    const tickets=await Ticket.find();
    res.json(tickets);
})
//update ticket
router.put('/:id',async(req,res)=>{
    try{
        const updated=await Ticket.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.json(updated);

    }catch(err){
        res.status(400).json({error:err.message});
    }
});


//delete ticket
router.delete('/:id',async(req,res)=>{
    try{
        await Ticket.findByIdAndDelete(req.params.id);
        res.json({message:'Deleted'});

    }catch(err){
        res.status(400).json({error:err.message})
    }
})
module.exports=router;