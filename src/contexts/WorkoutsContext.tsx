import { createContext, Dispatch, useReducer, type ReactNode } from 'react'

interface Workout {
  _id: string
  title: string
  reps: number
  load: number
  createdAt: string
}

interface WorkoutsState {
  workouts: Workout[] | null
}

type WorkoutsAction = 
  | { type: 'SET_WORKOUTS'; payload: Workout[] }
  | { type: 'CREATE_WORKOUT'; payload: Workout }
  | { type: 'DELETE_WORKOUT'; payload: Workout[] }


interface WorkoutsContextType extends WorkoutsState {
  dispatch: Dispatch<WorkoutsAction>
}

export const WorkoutsContext = createContext<WorkoutsContextType | null>(null)

export const workoutsReducer = (state: { workouts: any }, action: { type: any; payload: any }) => {
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
          workouts: state.workouts.filter((workout: Workout) => workout._id !== action.payload._id)
        }
    default:
      return state
  }
}

export const WorkoutsContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(workoutsReducer, { 
    workouts: null
  })
  
  return (
    <WorkoutsContext.Provider value={{ ...state, dispatch }}>
      { children }
    </WorkoutsContext.Provider>
  )
}