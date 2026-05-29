import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function UpdateWorkoutScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  // Pure UI - No state or handlers implemented yet.

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Workout</Text>
        
        <TouchableOpacity style={styles.deleteIconBtn}>
          <Ionicons name="trash-outline" size={22} color="#F87171" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Page Title */}
        <View style={styles.titleRow}>
          <View style={styles.titleIconWrap}>
            <Ionicons name="pencil" size={22} color="#3B82F6" />
          </View>
          <View>
            <Text style={styles.heading}>Update Details</Text>
            <Text style={styles.subHeading}>Modify workout #{id}, add exercises and sets.</Text>
          </View>
        </View>

        {/* Workout Level Details */}
        <View style={styles.card}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>CATEGORY</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryRow}>
              {(["Chest", "Back", "Shoulders", "Arms", "Abs", "Legs"]).map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={[styles.categoryPill, cat === "Chest" ? styles.categoryActive : styles.categoryInactive]}
                >
                  <Text style={cat === "Chest" ? styles.categoryActiveText : styles.categoryInactiveText}>
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>

        {/* Exercises Section */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Exercises</Text>
        </View>

        {/* Dummy Exercise Card */}
        <View style={styles.exerciseCard}>
          <View style={styles.exerciseHeader}>
            <Text style={styles.exerciseTitle}>Exercise 1</Text>
            <TouchableOpacity>
              <Ionicons name="close-circle" size={22} color="#4B5563" />
            </TouchableOpacity>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>NAME</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Bench Press"
              placeholderTextColor="#4B5563"
              defaultValue="Bench Press"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>DESCRIPTION</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Barbell, flat bench"
              placeholderTextColor="#4B5563"
              defaultValue="Barbell, flat bench"
            />
          </View>

          {/* Sets inside Exercise */}
          <View style={styles.setsContainer}>
            <Text style={styles.setsTitle}>Sets</Text>
            
            {/* Table Header */}
            <View style={styles.setRow}>
              <Text style={[styles.setColumnHeader, { flex: 0.5 }]}>Set</Text>
              <Text style={[styles.setColumnHeader, { flex: 1 }]}>Reps</Text>
              <Text style={[styles.setColumnHeader, { flex: 1 }]}>Weight (kg)</Text>
              <View style={{ width: 24 }} />
            </View>

            {/* Dummy Set 1 */}
            <View style={styles.setRow}>
              <Text style={[styles.setNumber, { flex: 0.5 }]}>1</Text>
              <TextInput style={[styles.setInput, { flex: 1 }]} keyboardType="numeric" defaultValue="10" />
              <TextInput style={[styles.setInput, { flex: 1 }]} keyboardType="numeric" defaultValue="60" />
              <TouchableOpacity>
                <Ionicons name="trash-outline" size={20} color="#F87171" />
              </TouchableOpacity>
            </View>

            {/* Dummy Set 2 */}
            <View style={styles.setRow}>
              <Text style={[styles.setNumber, { flex: 0.5 }]}>2</Text>
              <TextInput style={[styles.setInput, { flex: 1 }]} keyboardType="numeric" defaultValue="8" />
              <TextInput style={[styles.setInput, { flex: 1 }]} keyboardType="numeric" defaultValue="65" />
              <TouchableOpacity>
                <Ionicons name="trash-outline" size={20} color="#F87171" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.addSetButton}>
              <Ionicons name="add" size={16} color="#3B82F6" />
              <Text style={styles.addSetButtonText}>Add Set</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.addExerciseButton}>
          <Ionicons name="add-circle-outline" size={20} color="#10B981" />
          <Text style={styles.addExerciseButtonText}>ADD EXERCISE</Text>
        </TouchableOpacity>

        {/* Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.updateButton}
            activeOpacity={0.85}
          >
            <Ionicons name="save-outline" size={20} color="#FFFFFF" />
            <Text style={styles.updateButtonText}>SAVE WORKOUT</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteButton}
            activeOpacity={0.85}
          >
            <Ionicons name="trash" size={20} color="#F87171" />
            <Text style={styles.deleteButtonText}>DELETE WORKOUT</Text>
          </TouchableOpacity>
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
  backButton: {
    padding: 6,
    borderRadius: 8,
    backgroundColor: '#161A22',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  deleteIconBtn: {
    padding: 6,
    borderRadius: 8,
    backgroundColor: '#2B0D0D',
    borderWidth: 1,
    borderColor: '#5F2A2A',
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
    marginBottom: 24,
  },

  // ── Form ─────────────────────────────────────────────────
  formGroup: {
    marginBottom: 16,
  },
  label: {
    color: '#6B7280',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1.2,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  input: {
    backgroundColor: '#0F1115',
    borderWidth: 1,
    borderColor: '#1E293B',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: '#FFFFFF',
    fontSize: 14,
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

  // ── Exercises Section ────────────────────────────────────
  sectionHeaderRow: {
    marginBottom: 12,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  exerciseCard: {
    backgroundColor: '#161A22',
    borderWidth: 1,
    borderColor: '#1E293B',
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
  },
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  exerciseTitle: {
    color: '#9CA3AF',
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  
  // ── Sets Section ─────────────────────────────────────────
  setsContainer: {
    marginTop: 8,
    backgroundColor: '#0F1115',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  setsTitle: {
    color: '#9CA3AF',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  setRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 10,
  },
  setColumnHeader: {
    color: '#6B7280',
    fontSize: 11,
    fontWeight: '600',
  },
  setNumber: {
    color: '#4B5563',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  setInput: {
    backgroundColor: '#161A22',
    borderWidth: 1,
    borderColor: '#1F2937',
    borderRadius: 6,
    color: '#FFFFFF',
    fontSize: 14,
    paddingVertical: 6,
    paddingHorizontal: 10,
    textAlign: 'center',
  },
  addSetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    marginTop: 4,
    paddingVertical: 10,
    backgroundColor: '#1A2438',
    borderRadius: 8,
  },
  addSetButtonText: {
    color: '#3B82F6',
    fontSize: 13,
    fontWeight: 'bold',
  },

  addExerciseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#10B981',
    borderStyle: 'dashed',
    borderRadius: 12,
    paddingVertical: 16,
    marginBottom: 32,
  },
  addExerciseButtonText: {
    color: '#10B981',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 0.8,
  },

  // ── Buttons ─────────────────────────────────────────
  actionButtons: {
    gap: 12,
  },
  updateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#2563EB',
    borderRadius: 12,
    paddingVertical: 16,
  },
  updateButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
    letterSpacing: 0.8,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#13171F',
    borderWidth: 1,
    borderColor: '#DC2626',
    borderRadius: 12,
    paddingVertical: 16,
  },
  deleteButtonText: {
    color: '#F87171',
    fontSize: 15,
    fontWeight: 'bold',
    letterSpacing: 0.8,
  },
});
