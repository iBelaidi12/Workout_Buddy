//This file stores the functions that'll the job needed

//Import workout Modal
const Workout = require('../models/WorkoutModal.js')
const mongoose = require('mongoose')

//Get all workout
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1})

    res.status(200).json(workouts)
}

//Get a single workout
const getOneWorkout = async (req, res) => {
    //get the id from the url
    const {id} = req.params 


    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
    }

    const workout = await Workout.findById(id)

    if(!workout) {
        return res.status(404).json({error: 'No such workout'})
    }

    res.status(200).json(workout)
}


//Create a new workout
const createWorkout = async (req, res) => {
    const {title, reps, load} = req.body
    
    let emptyFields = []

    if(!title){
        emptyFields.push('title')
    }
    if(!load){
        emptyFields.push('load')
    }
    if(!reps){
        emptyFields.push('reps')
    }
    if(emptyFields.length > 0){
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
    }

    //Add workout doc to db
    try {
        const workout = await Workout.create({title, reps, load})
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//Delete a workout
const deleteWorkout = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
    }

    const workout = await Workout.findByIdAndDelete({_id: id})
    if(!workout){
        return res.status(404).json({error: 'No such workout'})
    }

    res.status(200).json({message: 'Workout has been deleted'})

}

// Update a workout
const updateWorkout = async (req, res) => {
    const {id} = req.params
    const {title, reps, load} = req.body

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
    }

    const workout = await Workout.findOneAndUpdate(
        {_id: id},
        {title, reps, load},
        {new: true, runValidators: true}
    )

    if(!workout){
        return res.status(404).json({error: 'No such error'})
    }
    return res.status(200).json({message: 'Workout has been updated'})
}


module.exports = {
    getWorkouts,
    getOneWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout,
}