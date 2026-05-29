import * as sqlite from "expo-sqlite";


// don't know the difference between async method and syncmethod! will try to laern later
export const db = sqlite.openDatabaseSync("Ascend.db");
//DON'T FORGET TO ENABLE FOREIGN KEY WHEN INIT DATABASE


export function initDb() {

    db.execSync(`
    PRAGRAM foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS Workouts (
    id INTEGER PRIMARY KEY  AUTOINCREMENT,
    category TEXT NOT NULL DEFAULT 'Back' CHECK(category IN ('Back' , 'Chest' , 'Shoulders', 'Arms' , 'Abs' , 'Legs')),
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
    
    
    
    );

    CREATE TABLE IF NOT EXISTS Exercises (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        workout_id INTEGER NOT NULL,
        description TEXT NOT NULL,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (workout_id) REFERENCES Workouts(id) ON DELETE CASCADE
    
    
    );

    CREATE TABLE IF NOT EXISTS Sets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        exercise_id INTEGER NOT NULL,
        reps INTEGER NOT NULL,
        set_number INTEGER NOT NULL,
        weight REAL NOT NULL,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (exercise_id) REFERENCES Exercises(id) ON DELETE CASCADE
    
    )
    
    
    
    
    
    `)
}