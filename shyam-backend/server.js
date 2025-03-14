const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');

const authRouter = require("./routes/authRoutes");
const taskRouter = require("./routes/taskRoutes");

require("dotenv").config();

const app = express();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100, 
    message: 'Too many requests, please try again later.',
    headers: true, 
});


app.use(limiter);

const PORT = process.env.PORT || 3000;
const DB_URI = process.env.MONGODB_URI;

app.use(cookieParser());
app.use(express.json());

app.use(cors({
    credentials: true
}))

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/task', taskRouter);

console.log("Trying to establish connection with mongodb....");
mongoose.connect(DB_URI)
    .then(() => {
        console.log('Successfully connected to MongoDB');

        app.listen(
            PORT,
            () => {
                console.log(`Server is running on : http://127.0.0.1:${PORT}.........`)
            }
        );
    }).catch((err) => {
        console.error('Error connecting to MongoDB', err);
    });
