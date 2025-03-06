const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./Routes/authRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use('/auth', authRoutes);

mongoose.connect(process.env.MONGO_CONN, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`)))
    .catch(err => console.error(err));