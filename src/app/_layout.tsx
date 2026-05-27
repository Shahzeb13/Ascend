import { Stack } from "expo-router";
import { ExerciseProvider } from "../context/ExerciseContext";

export default function RootLayout() {
  return (
    <ExerciseProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </ExerciseProvider>
  );
}
