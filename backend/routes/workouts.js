//This file is to register the diff routes

const express = require('express')
const {
    getWorkouts,
    getOneWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout,
} = require('../controllers/workoutController')

//Create an instance of the router
const router = express.Router()

//Adding req handler on that Router
//Fullpath = 1st argument in app.use + 1st one here

//GET all workouts
router.get('/', getWorkouts)

//GET a single workout
router.get('/:id', getOneWorkout)

//POST a new workout
router.post('/', createWorkout)

//DELETE a workout
router.delete('/:id', deleteWorkout)

//UPDATE a workout
router.patch('/:id', updateWorkout)

//Exporting the router
module.exports = router