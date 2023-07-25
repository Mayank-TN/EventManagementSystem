const express = require('express');
const eventRouter = express.Router();
const Events = require('./events');
const Users = require('./users')

eventRouter.get('/getData' , async (req,res)=>{
  try {
    if(Object.values(req.query).length === 0){
        const events = await Events.find();
        res.status(200).json(events);
    }
    else{
        if(req.query.location){
            const events = await Events.find({location : req.query.location});
            res.status(200).json(events);
        }
        else if(req.query.from && req.query.to){
             const date1 = req.query.from;
             const date2 = req.query.to;
            const events = await Events.find();
            const arr = events.filter((event)=> event.datetime.split(' ')[0] >= date1);
            const arr2 = arr.filter((event)=> event.datetime.split(' ')[0] <= date2 )
            res.status(200).json(arr2);
            // res.json({
            //     from : date1, to : date2
            // });
        }
        else if(req.query.from){
            const date = req.query.from;
            const events = await Events.find();
            const arr = events.filter((event)=> event.datetime.split(' ')[0] >= date );
            res.status(200).json(arr);
           // res.json(date);
        }
        else if(req.query.to){
            const date = req.query.to;
            const events = await Events.find();
            const arr = events.filter((event)=> event.datetime.split(' ')[0] <= date );
            res.status(200).json(arr);
            //res.json(date);
        }
        else{
            res.status(400).json({ message : error})
        }

        
    }
    
  } catch (error) {
    res.status(400).json({ message : error})
  }
})

eventRouter.post('/' , async (req,res)=>{
   try {
   const body = {
    eventName : req.body.eventName,
    location : req.body.location,
    maximumParticipantsAllowed : req.body.maximumParticipantsAllowed,
    activeParticipants : 0,
    description : req.body.description ,
    datetime : `${req.body.date} ${req.body.time}`
   };
   const location = body.location 
   const datetime = body.datetime;
   const locationDateTimeCheck = await Events.find({ location : location , datetime : datetime});
  
  if(locationDateTimeCheck.length >= 1){
    res.status(401).json({ message : "Event already registered for given date and location"});
  }
   else if(body.eventName.trim().length < 3){
    res.status(401).json({ message : "Name should have minimum 3 characters"})
   }
   else{
    const event = new Events(body); 
    await event.save();
    res.status(201).json({ message : "Event created successfully"})
   }
    
   } catch (error) {
        res.status(400).json({ message : error.message})
   }
})


eventRouter.put('/:id' ,async (req,res)=>{
    const eventId = req.params.id;
    const newUser = {
        email : req.body.email,
        eventId : req.params.id
    } 
    
    const event = await Events.findById(eventId);
    const activeParticipants = event.activeParticipants;
    if(event.maximumParticipantsAllowed === event.activeParticipants){
        res.status(401).json({ message : "Event is full. Try another Event"})
    }
    else{
        const user = await Users.find(newUser);
        if(user.length !== 0){
            res.json({ message : "User already registered for this event"})
        }
        else{
            const newEntry = new Users(newUser);
            await newEntry.save();
            await Events.updateOne({ _id : eventId} , {
                $set : { activeParticipants : activeParticipants+1}
            })
            res.json({ message : "User enrolled for the event successfully" });
        }
        
    }
   // res.json(event);
})

module.exports = eventRouter;