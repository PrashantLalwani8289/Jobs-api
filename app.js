const express = require('express');
const connectDB = require('./db')
require('dotenv').config();
require('express-async-errors');
const authenticateUser = require('./middleware/authentication')

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

const port = 5000;
const url = process.env.MONGO_URI;
const app = express();
app.use(express.json());



// Connect to MongoDB database



const authRouter = require('./routes/auth');
const jobsRouter = require('./routes/jobs');


app.use('/api/v1/auth',authRouter);
app.use('/api/v1/jobs', authenticateUser ,jobsRouter);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async(url) => {
    try{
        await connectDB(url);
        app.listen(port, () => {
            console.log(`server is lintenning at port ${port}`)
        })
    }catch(error){
        console.log(error);
    }
};
start(url);

