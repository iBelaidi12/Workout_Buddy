import { useEffect, useState } from "react"
import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm"
import useWorkoutContext from "../hooks/useWorkoutContext"

const Home = () => {
  const {workouts, dispatch} = useWorkoutContext()

  useEffect(() => {
    const fetchWorkout = async () => {
      const response = await fetch('http://localhost:4000/api/workouts')
      const json = await response.json()

      if (response.ok){
        dispatch({
          type: 'SET_WORKOUTS',
          payload: json
        })
      }
    } 
    
    fetchWorkout()
  }, [])


  return (
    <div className="home">
      <div className="workouts">
        {workouts && workouts.map((workout) => (
          <WorkoutDetails key={workout._id} workout={workout} />
        ))}
      </div>
      <WorkoutForm />
    </div>
  )
  }
  
export default Home