type category = "Back" | "Chest" | "Shoulders" | "Arms" | "Abs"| "Legs"
export type exercise = {
    id: string,
    name : string, 
    category : category,
    sets : sets[]
    description : string,


}


type sets = {
    id: string,
    reps : number, 
    weight : number,
    setNumber: number,
}