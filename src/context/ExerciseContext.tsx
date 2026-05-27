import React, { createContext, useContext, useState, ReactNode } from "react";
import { exercise } from "../../types/LogExerciseServiceTypes";
import { addExercise, removeExercise, editExercise } from "../../services/LogExerciseService";

type ExerciseContextType = {
  exercises: exercise[];
  add: (ex: exercise) => void;
  remove: (id: string) => void;
  edit: (id: string, obj: Partial<exercise>) => void;
};

const ExerciseContext = createContext<ExerciseContextType | undefined>(undefined);

export function ExerciseProvider({ children }: { children: ReactNode }) {
  const [exercises, setExercises] = useState<exercise[]>([]);

  const add = (ex: exercise) => {
    setExercises((prev) => addExercise(prev, ex));
  };

  const remove = (id: string) => {
    setExercises((prev) => removeExercise(prev, id));
  };

  const edit = (id: string, obj: Partial<exercise>) => {
    setExercises((prev) => editExercise(prev, id, obj));
  };

  return (
    <ExerciseContext.Provider value={{ exercises, add, remove, edit }}>
      {children}
    </ExerciseContext.Provider>
  );
}

export function useExercises() {
  const context = useContext(ExerciseContext);
  if (!context) {
    throw new Error("useExercises must be used within an ExerciseProvider");
  }
  return context;
}
