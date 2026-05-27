import { exercise } from "../types/LogExerciseServiceTypes";

/**
 * Filters the exercise list by their categories (e.g. Chest, Back, etc.)
 */
export function filterExercisesByCategory(exercises: exercise[], category: string): exercise[] {
  return exercises.filter((ex) => ex.category.toLowerCase() === category.toLowerCase());
}

/**
 * Calculates the total volume (weight * reps across all sets of all workouts)
 */
export function calculateWeeklyVolume(exercises: exercise[]): number {
  let total = 0;
  exercises.forEach((ex) => {
    ex.sets.forEach((s) => {
      total += s.reps * s.weight;
    });
  });
  return total;
}

/**
 * Calculates active consistency in days (simulated by unique workout instances)
 */
export function calculateConsistencyDays(exercises: exercise[]): number {
  return exercises.length;
}

/**
 * Counts the number of PRs (Personal Records) logged this month
 * Simulated by checking the number of distinct exercises that have sets logged
 */
export function calculatePRs(exercises: exercise[]): number {
  const uniqueNames = new Set(exercises.map((ex) => ex.name.trim().toLowerCase()));
  return uniqueNames.size;
}

/**
 * Calculates streak in weeks based on logs count
 */
export function calculateStreakWeeks(exercises: exercise[]): number {
  if (exercises.length === 0) return 0;
  return Math.min(4, 1 + Math.floor(exercises.length / 3));
}
