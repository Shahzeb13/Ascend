import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { exercise } from "../../types/LogExerciseServiceTypes";
import { useExercises } from "../../context/ExerciseContext";

type CategoryType = "Back" | "Chest" | "Shoulders" | "Arms" | "Abs" | "Legs";

export default function LogWorkoutScreen() {
  const [exerciseName, setExerciseName] = useState("");
  const [category, setCategory] = useState<CategoryType>("Chest");
  const [weight, setWeight] = useState("0.0");
  const [repsList, setRepsList] = useState<number[]>([10, 8, 8]);
  
  // Use global context to save exercises
  const { add } = useExercises();

  // Live calculations
  const totalReps = repsList.reduce((acc, curr) => acc + curr, 0);
  const parsedWeight = parseFloat(weight) || 0;
  const estVolume = totalReps * parsedWeight;

  const handleAddSet = () => {
    setRepsList([...repsList, 8]);
  };

  const handleUpdateReps = (index: number, text: string) => {
    const val = parseInt(text) || 0;
    const newList = [...repsList];
    newList[index] = val;
    setRepsList(newList);
  };

  const handleSave = () => {
    if (!exerciseName.trim()) {
      Alert.alert("Error", "Please enter an exercise name");
      return;
    }

    // 1. Map our screen state to the 'exercise' type required by the service
    const newExercise: exercise = {
      id: Math.random().toString(),
      name: exerciseName,
      category: category,
      description: `Logged workout - ${category}`,
      sets: repsList.map((reps, idx) => ({
        id: Math.random().toString(),
        reps: reps,
        weight: parsedWeight,
        setNumber: idx + 1,
      })),
    };

    // 2. Add to global context
    add(newExercise);

    Alert.alert(
      "Workout Saved!",
      `Successfully logged ${newExercise.name} with ${newExercise.sets.length} sets to the service layer!`,
      [{ text: "Awesome" }]
    );

    // Reset form after saving
    setExerciseName("");
    setWeight("0.0");
    setRepsList([10, 8, 8]);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Ionicons name="barbell-outline" size={28} color="#3B82F6" style={styles.logoIcon} />
          <Text style={styles.logoText}>Ascend</Text>
        </View>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="person-circle-outline" size={26} color="#9CA3AF" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>Log Workout</Text>
        <Text style={styles.subHeading}>Track your sets and monitor discipline.</Text>

        {/* Form Fields */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>EXERCISE NAME</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., Bench Press"
            placeholderTextColor="#4B5563"
            value={exerciseName}
            onChangeText={setExerciseName}
          />
        </View>

        {/* Category selector pill row (much cleaner than complex dropdown UI!) */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>CATEGORY</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryRow}>
            {(["Chest", "Back", "Shoulders", "Arms", "Abs", "Legs"] as CategoryType[]).map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.categoryPill,
                  category === cat ? styles.categoryActive : styles.categoryInactive,
                ]}
                onPress={() => setCategory(cat)}
              >
                <Text style={category === cat ? styles.categoryActiveText : styles.categoryInactiveText}>
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>WEIGHT (KG)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="0.0"
            placeholderTextColor="#4B5563"
            value={weight}
            onChangeText={setWeight}
          />
        </View>

        {/* Sets Section */}
        <View style={styles.setsHeaderRow}>
          <Text style={styles.setsLabel}>SETS</Text>
          <Text style={styles.setsLabel}>REPS</Text>
        </View>

        {repsList.map((reps, idx) => (
          <View key={idx} style={styles.setRow}>
            <Text style={styles.setName}>Set {idx + 1}</Text>
            <TextInput
              style={styles.repsInput}
              keyboardType="numeric"
              value={reps.toString()}
              onChangeText={(text) => handleUpdateReps(idx, text)}
            />
          </View>
        ))}

        <TouchableOpacity 
          style={styles.addSetButton} 
          activeOpacity={0.7}
          onPress={handleAddSet}
        >
          <Ionicons name="add" size={18} color="#3B82F6" />
          <Text style={styles.addSetText}>Add Set</Text>
        </TouchableOpacity>

        {/* Stats Summary */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>TOTAL REPS</Text>
            <Text style={styles.summaryVal}>{totalReps}</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>EST. VOLUME</Text>
            <Text style={styles.summaryVal}>{estVolume.toLocaleString()} kg</Text>
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity 
          style={styles.saveButton} 
          activeOpacity={0.8}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>SAVE WORKOUT</Text>
        </TouchableOpacity>

        {/* Session Progress */}
        <View style={styles.progressContainer}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>SESSION COMPLETION</Text>
            <Text style={styles.progressVal}>75%</Text>
          </View>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: '75%' }]} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F1115',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#1F2937',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoIcon: {
    marginRight: 2,
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  iconButton: {
    padding: 6,
    borderRadius: 8,
    backgroundColor: '#161A22',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  heading: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 10,
  },
  subHeading: {
    color: '#6B7280',
    fontSize: 14,
    marginTop: 4,
    marginBottom: 24,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    color: '#9CA3AF',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#161A22',
    borderWidth: 1,
    borderColor: '#1E293B',
    borderRadius: 8,
    padding: 12,
    color: '#FFFFFF',
    fontSize: 16,
  },
  categoryRow: {
    flexDirection: 'row',
  },
  categoryPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  categoryActive: {
    backgroundColor: '#3B82F6',
  },
  categoryInactive: {
    backgroundColor: '#161A22',
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  categoryActiveText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13,
  },
  categoryInactiveText: {
    color: '#9CA3AF',
    fontSize: 13,
  },
  setsHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#1F2937',
    paddingBottom: 10,
    marginBottom: 15,
  },
  setsLabel: {
    color: '#6B7280',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  setRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  setName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  repsInput: {
    backgroundColor: '#161A22',
    borderWidth: 1,
    borderColor: '#1E293B',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 16,
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    minWidth: 60,
  },
  addSetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 10,
    marginBottom: 30,
    paddingVertical: 4,
  },
  addSetText: {
    color: '#3B82F6',
    fontSize: 14,
    fontWeight: 'bold',
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#1F2937',
    paddingTop: 20,
    marginBottom: 20,
  },
  summaryItem: {
    alignItems: 'flex-start',
  },
  summaryLabel: {
    color: '#6B7280',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  summaryVal: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 4,
  },
  saveButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  progressContainer: {
    backgroundColor: '#161A22',
    borderWidth: 1,
    borderColor: '#1E293B',
    borderRadius: 8,
    padding: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  progressLabel: {
    color: '#6B7280',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  progressVal: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  progressBarBg: {
    height: 4,
    backgroundColor: '#1F2937',
    borderRadius: 2,
    width: '100%',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#3B82F6',
    borderRadius: 2,
  },
});
