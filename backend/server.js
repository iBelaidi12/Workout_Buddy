//To load env var from a .env file
//Config attaches it to the process object
require('dotenv').config()

//Import Express packages, workoutRoutes and mongoose
const express = require('express')
const workoutRoutes = require('./routes/workouts')
const mongoose = require('mongoose')
const cors = require('cors')

//Create a Express app
const app = express()

//middleware acts between the req and the resp

//Checks if theres a body to the request => Attaches it to the request object => We can access it in the req handler
app.use(express.json())

const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200
  };
  
app.use(cors(corsOptions));

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//Using the workoutRoutes and attaching it to the app
//1st arguments : if we fire req to this path => use workoutRoutes
app.use('/api/workouts/', workoutRoutes)


//connect to db
mongoose.connect(process.env.MONG_URI)
    .then(()=>{
        //Listen for requests
        app.listen(process.env.PORT, () => {
            console.log("Connected to db & Listening on port 4000")
        })
    })
    .catch((error) => {
        console.log(error)
    })



