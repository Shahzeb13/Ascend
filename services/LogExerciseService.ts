
import { exercise , workout} from '../types/LogExerciseServiceTypes.js'


// let exercises : Array<exercise> = []
export function addExercise(exercises: Array<exercise>, exercise: exercise) {
    
    return[...exercises , exercise];

}

export function createWorkout(workout: workout){
    
}



export function removeExercise(exercises: Array<exercise>, id: string) {
    let newExercises: Array<exercise> = [];
    newExercises = exercises.filter((e) => e.id !== id)
    return newExercises;
}



export function editExercise(exercises: Array<exercise>, id: string, obj: Partial<exercise>) {
    return exercises.map((e) => {
        if (e.id === id) {
            return { ...e, ...obj }
        }
        else {
            return e;
        }
    });
}