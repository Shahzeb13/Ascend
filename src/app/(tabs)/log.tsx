import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { newWorkout, workout } from "../../../types/LogExerciseServiceTypes";
import { createWorkout } from "../../../services/LogExerciseService";
import Toast from "../../components/Toast";

type CategoryType = "Back" | "Chest" | "Shoulders" | "Arms" | "Abs" | "Legs";

export default function LogWorkoutScreen() {
  const [workoutName, setWorkoutName] = useState("");
  const [category, setCategory] = useState<CategoryType>("Chest");
  const [weight, setWeight] = useState("0.0");
  const [repsList, setRepsList] = useState<number[]>([10, 8, 8]);
  const [workout , setWorkout]  = useState<newWorkout>({
    category: "Back",
   

  });
  // const [workouts, setWorkouts] = useState<workout[]>([]);

  // Toast state
  const [toast, setToast] = useState<{ visible: boolean; message: string; type: "success" | "error" | "info" }>({
    visible: false,
    message: "",
    type: "info",
  });

  const showToast = (message: string, type: "success" | "error" | "info" = "info") => {
    setToast({ visible: true, message, type });
  };

  const hideToast = () => setToast((prev) => ({ ...prev, visible: false }));

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
    try {
      const data: newWorkout = { category };

      const createdWorkout = createWorkout(data);
      if (!createdWorkout) {
        showToast("Failed to create workout. Please try again.", "error");
        return;
      }

      // setWorkouts((prev) => [...prev, createdWorkout]);
      showToast(`${category} workout created!`, "success");
      setCategory("Chest"); // Reset form
    } catch (error) {
      showToast("Something went wrong. Please try again.", "error");
      if (error instanceof Error) {
        console.log("Message", error.message);
        console.log("StackTrace", error.stack);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Toast
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
        onHide={hideToast}
      />
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

        {/* Page Title */}
        <View style={styles.titleRow}>
          <View style={styles.titleIconWrap}>
            <Ionicons name="add-circle" size={22} color="#3B82F6" />
          </View>
          <View>
            <Text style={styles.heading}>New Workout</Text>
            <Text style={styles.subHeading}>Name it and pick a category to get started.</Text>
          </View>
        </View>

        {/* Card */}
        <View style={styles.card}>

          {/* Workout Name */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>WORKOUT NAME</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Monday Push Day"
              placeholderTextColor="#4B5563"
              value={workoutName}
              onChangeText={setWorkoutName}
            />
          </View>

          {/* Category */}
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

          {/* Selected Category Preview */}
          <View style={styles.selectedCategoryBadge}>
            <Ionicons name="checkmark-circle" size={14} color="#3B82F6" />
            <Text style={styles.selectedCategoryText}>{category} selected</Text>
          </View>

        </View>

        {/* Info hint */}
        <View style={styles.hintRow}>
          <Ionicons name="information-circle-outline" size={15} color="#4B5563" />
          <Text style={styles.hintText}>
            You can add exercises and sets after creating the workout.
          </Text>
        </View>

        {/* Create Button */}
        <TouchableOpacity
          style={styles.createButton}
          activeOpacity={0.85}
          onPress={handleSave}
        >
          <Ionicons name="add" size={20} color="#FFFFFF" />
          <Text style={styles.createButtonText}>CREATE WORKOUT</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F1115',
  },

  // ── Header ──────────────────────────────────────────────
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

  // ── Scroll / Page ────────────────────────────────────────
  scrollContent: {
    padding: 20,
    paddingBottom: 60,
  },

  // ── Title Row ────────────────────────────────────────────
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginTop: 10,
    marginBottom: 28,
  },
  titleIconWrap: {
    marginTop: 3,
    backgroundColor: '#1A2438',
    padding: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#1E3A5F',
  },
  heading: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 0.3,
  },
  subHeading: {
    color: '#6B7280',
    fontSize: 13,
    marginTop: 3,
  },

  // ── Card ─────────────────────────────────────────────────
  card: {
    backgroundColor: '#13171F',
    borderWidth: 1,
    borderColor: '#1F2937',
    borderRadius: 14,
    padding: 20,
    marginBottom: 16,
  },

  // ── Form ─────────────────────────────────────────────────
  formGroup: {
    marginBottom: 22,
  },
  label: {
    color: '#6B7280',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1.2,
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  input: {
    backgroundColor: '#0F1115',
    borderWidth: 1,
    borderColor: '#1E293B',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 13,
    color: '#FFFFFF',
    fontSize: 15,
  },

  // ── Category Pills ───────────────────────────────────────
  categoryRow: {
    flexDirection: 'row',
  },
  categoryPill: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 20,
    marginRight: 8,
  },
  categoryActive: {
    backgroundColor: '#2563EB',
  },
  categoryInactive: {
    backgroundColor: '#0F1115',
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  categoryActiveText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
  categoryInactiveText: {
    color: '#6B7280',
    fontSize: 13,
  },

  // ── Selected Badge ───────────────────────────────────────
  selectedCategoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 2,
  },
  selectedCategoryText: {
    color: '#3B82F6',
    fontSize: 12,
    fontWeight: '600',
  },

  // ── Hint ─────────────────────────────────────────────────
  hintRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 7,
    backgroundColor: '#13171F',
    borderWidth: 1,
    borderColor: '#1F2937',
    borderRadius: 10,
    padding: 12,
    marginBottom: 24,
  },
  hintText: {
    color: '#4B5563',
    fontSize: 12,
    flex: 1,
    lineHeight: 18,
  },

  // ── Create Button ─────────────────────────────────────────
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#2563EB',
    borderRadius: 12,
    paddingVertical: 16,
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
    letterSpacing: 0.8,
  },
});
