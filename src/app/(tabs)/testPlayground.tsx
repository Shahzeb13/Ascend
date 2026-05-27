import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
import { useState } from "react";
import { addExercise, removeExercise, editExercise } from "../../../services/LogExerciseService";
import { exercise } from "../../../types/LogExerciseServiceTypes";

export default function Playground() {
    // We'll hold our test exercises in React state so the UI updates when we change them
    const [exercises, setExercises] = useState<exercise[]>([]);

    const handleAdd = () => {
        console.log("ADding exrcies");
        const newExercise: exercise = {
            id: Math.random().toString(), // Generating a fake ID
            name: "Bench Press",
            category: "Chest",
            description: "A standard barbell bench press",
            sets: []
        };
        // We pass a copy of the array [...exercises] so we don't mutate React state directly
        // const updated = addExercise([...exercises], newExercise);
        // setExercises(updated);
        setExercises((prev) => {
            const updated = addExercise(prev, newExercise)
            return updated
           
        }
        );
    };

    const handleRemove = (id: string) => {
        const updated = removeExercise(exercises, id);
        setExercises(updated);
    };

    const handleEdit = (id: string) => {
        // As a test, we will just change the name of the exercise
        const updated = editExercise(exercises, id, { name: "Bench Press (Edited!)" });
        setExercises(updated);
    };

    return (
        <View style={styles.wrapper}>
            <Text style={styles.heading}>Service Playground</Text>

            <View style={styles.buttonRow}>
                <Button title="Add Test Exercise" onPress={handleAdd} />
            </View>

            {/* ScrollView lets us scroll if the list gets too long */}
            <ScrollView style={styles.list}>
                {exercises.map((ex) => (
                    <View key={ex.id} style={styles.card}>
                        <Text style={styles.cardTitle}>{ex.name} ({ex.category})</Text>
                        <Text>Sets: {ex.sets.length}</Text>

                        <View style={styles.buttonRow}>
                            <Button title="Edit" onPress={() => handleEdit(ex.id)} />
                            <Button title="Remove" color="red" onPress={() => handleRemove(ex.id)} />
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1, // Let it fill the screen
        backgroundColor: "#f5f5f5",
        padding: 20,
    },
    heading: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        marginTop: 40, // Push it down below the status bar
    },
    buttonRow: {
        flexDirection: "row",
        gap: 10,
        marginTop: 10,
        marginBottom: 10,
    },
    list: {
        flex: 1,
        marginTop: 10,
    },
    card: {
        backgroundColor: "white",
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        // Basic shadow for card effect
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: "bold",
    }
});