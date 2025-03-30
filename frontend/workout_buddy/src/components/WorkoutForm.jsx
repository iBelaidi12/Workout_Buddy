import { useState } from "react"
import useWorkoutContext from "../hooks/useWorkoutContext"

const WorkoutForm = () => {

    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    const {dispatch} = useWorkoutContext()
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (event) => {
        event.preventDefault()

        const workout = {title, load, reps}

        const response = await fetch('http://localhost:4000/api/workouts', 
            {
                method: 'POST',
                body: JSON.stringify(workout),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        const json = await response.json()

        if(!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if(response.ok){
            setTitle('')
            setLoad('')
            setReps('')
            setError(null)
            setEmptyFields([])
            dispatch({
                type: 'CREATE_WORKOUT',
                payload: json
            })
        }
    }

    return(
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a new workout</h3>

            <label>Exercise Title :</label>
            <input type="text" 
                onChange={(event) => setTitle(event.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
            />

            <label>Load (Kg)</label>
            <input type="number" 
                onChange={(event) => setLoad(event.target.value)}
                value={load}
                className={emptyFields.includes('load') ? 'error' : ''}

            />

            <label>Reps : </label>
            <input type="number" 
                onChange={(event) => setReps(event.target.value)}
                value={reps}
                className={emptyFields.includes('reps') ? 'error' : ''}
            />
            
            <button>Add workout</button>
            {
                error && 
                <div className="error">{error}</div> 
            }
        </form>
    )
}

export default WorkoutForm