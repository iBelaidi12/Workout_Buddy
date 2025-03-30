import { createContext, useReducer } from "react";

export const WorkoutContext = createContext()


// une fonction qui détermine comment l'état doit changer en fonction d'une action.
export const workoutReducer = (state, action) => {
    switch (action.type) {
        case 'SET_WORKOUTS': 
            return {
                workouts: action.payload
            }
        case 'CREATE_WORKOUT':
            return {
                workouts: [action.payload, ...state.workouts]
            }
        case 'DELETE_WORKOUT':
            return {
                workouts: state.workouts.filter((workout) => (workout._id !== action.payload._id))
            }
        default: 
            return state
    }
} 

export const WorkoutContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(workoutReducer, 
        {
            workouts: null
        }
    )   

    //useReducer Nearly simmilar to useState
    // : 
        //dispatch function : une fonction pour envoyer des actions au reducer. 
            // 1st arg : is used to describe the type of state change
            // 2nd arg : payload represents the data we need to make the change 
            // We call the two agrs an action  

    return (
        <WorkoutContext.Provider value={{...state, dispatch}}>
            {children}
        </WorkoutContext.Provider>
    )
}