type category = "Back" | "Chest" | "Shoulders" | "Arms" | "Abs"| "Legs"

export type workout = {
    id  : string, 
    category: category;
    created_at: string
}

export type newWorkout  = Omit<workout, 'id' | 'created_at'>



export type exercise = {
    id: string,
    name : string, 
    workout_id: number,
    description : string,


}


type sets = {
    id: string,
    reps : number,
    exercise_id: number, 
    weight : number,

}