type category = "Back" | "Chest" | "Shoulders" | "Arms" | "Abs"| "Legs"

export type workout = {
    id  : string, 
    category: category;
    exercises : exercise[]
}

export type newWorkout  = Omit<workout, 'id'>



export type exercise = {
    id: string,
    name : string, 
    sets : sets[]
    description : string,


}


type sets = {
    id: string,
    reps : number, 
    weight : number,

}