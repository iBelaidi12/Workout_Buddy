import useWorkoutContext from "../hooks/useWorkoutContext"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrash} from '@fortawesome/free-solid-svg-icons/faTrash'
import {faPen} from '@fortawesome/free-solid-svg-icons/faPen'
import { useState } from "react"

const WorkoutDetails = (props) => {

    let [isModalActive, setIsModalActive] = useState(false)

    const closeModal = () => {
        setIsModalActive(false)
        document.body.classList.toggle("active")
    }


    const {dispatch} = useWorkoutContext()

    const handleDelete = async () => {
        const response = await fetch('http://localhost:4000/api/workouts/'+ props.workout._id,
            {
                method: 'DELETE'
            }
        )
        const json = await response.json()

        if(response.ok){
            dispatch({
                type: 'DELETE_WORKOUT',
                payload: props.workout
            })
        }

    }

    const handleUpdate = async () => {
        setIsModalActive(true)
        console.log(isModalActive)
    }

    return (
        <div className="workout-details">
            <div className={isModalActive ? "modal active" : "modal inactive"}>
                <div onClick={() => {
                    closeModal()
                }} className="black-bg">
                </div>
            <span onClick={() => { closeModal() }} className="close-modal">&#10005;</span>
            <div className="inner-container">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam harum quasi reiciendis repellat, inventore mollitia cum dignissimos soluta saepe eum quo officiis itaque dolorem dolores debitis similique officia delectus expedita.
            </div>
            </div>


            <h4>{props.workout.title}</h4>
            <p><strong>Load (kg) :</strong> {props.workout.load} </p>
            <p><strong>Reps :</strong> {props.workout.reps} </p>
            <p>{props.workout.createdAt}</p>
            <span onClick={handleUpdate}>
                <FontAwesomeIcon className="pen-icon" icon={faPen} />
            </span>
            <span onClick={handleDelete}>
                <FontAwesomeIcon className="trash-icon" icon={faTrash} />
            </span>
        </div>
    )
}

export default WorkoutDetails