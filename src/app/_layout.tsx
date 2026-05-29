import { Stack } from "expo-router";
import { ExerciseProvider } from "../context/ExerciseContext";
import { useEffect } from "react";
import { initDb } from "../../persistenceLayerService/databaseService";

export default function RootLayout() {

  useEffect(() => {
    initDb();
  } ,[]);
  
  return (
    <ExerciseProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </ExerciseProvider>
  );
}
