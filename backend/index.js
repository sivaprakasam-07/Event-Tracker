const express = require("express");
const app = express();
const cors = require('cors');

require('dotenv').config();
require('./Models/config.js');
const EventRouter = require('./Routes/EventsRouter');
app.use(express.json());
app.use(cors());


app.use("/event",EventRouter);


const PORT = process.env.PORT || 8080;
app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`);
})