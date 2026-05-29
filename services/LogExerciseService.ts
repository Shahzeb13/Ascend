
import { db } from '../persistenceLayerService/databaseService.js';
import { exercise , newWorkout, workout} from '../types/LogExerciseServiceTypes.js'


// let exercises : Array<exercise> = []
export function addExercise(exercises: Array<exercise>, exercise: exercise) {
    
    return[...exercises , exercise];

}

export function createWorkout(workout: newWorkout){
    try{

        const result = db.runSync(`INSERT INTO Workouts (category) VALUES (?)`, [workout.category] );

        const response = db.getFirstSync(`SELECT * FROM (Workouts) WHERE id = ? ` , [result.lastInsertRowId]);
        return response;
    } catch(error){
        console.error("Error creating a workout");
        if(error instanceof Error){
            console.log("Error Message" , error.message);
            console.log("Stack Trace " , error.stack);
        }
    }
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