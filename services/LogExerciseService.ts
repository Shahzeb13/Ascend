
import { db } from '../persistenceLayerService/databaseService';
import { exercise , newWorkout , workout} from '../types/LogExerciseServiceTypes'


// let exercises : Array<exercise> = []
export function addExercise(exercises: Array<exercise>, exercise: exercise) {
    
    return[...exercises , exercise];

}

export function createWorkout(workout: newWorkout){
    try{

        const result = db.runSync(`INSERT INTO Workouts (category) VALUES (?)`, [workout.category] );

        const response = db.getFirstSync<workout>(`SELECT * FROM (Workouts) WHERE id = ? ` , [result.lastInsertRowId]);
       
        if(response){
        
        return response;
        }
        else{
            console.error("Response object from creatWorkout is either null or undefined");
            return null;
        }
    } catch(error){
        console.error("Error creating a workout");
        if(error instanceof Error){
            console.log("Error Message" , error.message);
            console.log("Stack Trace " , error.stack);

        }
        return null;
    }
}
 


export function getWorkouts(): workout[] {
    try {
        const rows = db.getAllSync<workout>(`SELECT * FROM Workouts ORDER BY created_at DESC`);
        return rows;
    } catch (error) {
        console.error("Error fetching workouts");
        if (error instanceof Error) {
            console.log("Error Message", error.message);
            console.log("Stack Trace", error.stack);
        }
        return [];
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