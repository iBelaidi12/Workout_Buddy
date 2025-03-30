//Mongoose is what we need to create schemas to our db
//Mangodb is schemaless


//The modal is based on the schema
//The schema defines the structure of a document
//Then we apply the schema to a particular modal to interract with a collection of that name


const mongoose = require('mongoose')

const Schema = mongoose.Schema

const workoutSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    reps: {
        type: Number,
        required: true,
    },
    load: {
        type: Number,
        required: true,
    }
}, {timestamps: true})

//Modal : Workout
//Collection : WorkoutS
//When exported, We use this modal to interract with the Workouts collection 
module.exports = mongoose.model('Workout', workoutSchema)

