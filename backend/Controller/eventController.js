const CreateEvent = require("../models/createEvent");

const createEvent = async(req,res) => {
    try{
        const {
            title,
            date,
            time,
            venue,
            eventLink,
            description,
            department,
            eligibility
        } = req.body;

        const event = new CreateEvent({
            title,
            date,
            time,
            venue,
            eventLink,
            description,
            department,
            eligibility
        })
       
        console.log("Created event", event );
        await event.save();
        res.status(201).json({
            message:"Created event successfully",
            sucess:true
        })

    }
    catch(err){
        res.status(500).json({
            message:"An erroe occured while creating event ",
            sucess:false
        })
    }
} 

module.exports = {
    createEvent
}