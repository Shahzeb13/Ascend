import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useExercises } from "../../context/ExerciseContext";
import * as Stats from "../../../services/DashboardStatsService";
import { exercise } from "../../../types/LogExerciseServiceTypes";

type ExerciseCardProps = {
  ex: exercise;
  onEdit: () => void;
};

function ExerciseCard({ ex, onEdit }: ExerciseCardProps) {
  const router = useRouter();

  // Calculate total volume for this single exercise instance
  const totalVolume = ex.sets.reduce((sum, s) => sum + s.reps * s.weight, 0);
  
  // Find highest weight logged in its sets
  const latestWeight = ex.sets.length > 0 ? Math.max(...ex.sets.map(s => s.weight)) : 0;

  return (
    <View style={styles.exerciseCardWrapper}>
      <TouchableOpacity 
        style={styles.exerciseCard} 
        activeOpacity={0.7}
        onPress={() => router.push("/exerciseDetails")}
      >
        <View style={styles.cardLeft}>
          <Text style={styles.exerciseName}>{ex.name}</Text>
          <Text style={styles.exerciseSub}>{ex.description || ex.category}</Text>
        </View>
        <View style={styles.cardRight}>
          <View style={styles.statColumn}>
            <Text style={styles.statLabel}>Max Weight</Text>
            <Text style={styles.statVal}>{latestWeight} kg</Text>
          </View>
          <View style={styles.statColumn}>
            <Text style={styles.statLabel}>Volume</Text>
            <Text style={styles.statVal}>{totalVolume.toLocaleString()} kg</Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* Edit Trigger Pencil Button */}
      <TouchableOpacity style={styles.editButton} onPress={onEdit} activeOpacity={0.6}>
        <Ionicons name="pencil-outline" size={16} color="#3B82F6" />
      </TouchableOpacity>
    </View>
  );
}

export default function HomeScreen() {
  const router = useRouter();
  const { exercises, edit } = useExercises();

  // Calculate dynamic dashboard stats using the DashboardStatsService
  const weeklyVolume = Stats.calculateWeeklyVolume(exercises);
  const consistencyDays = Stats.calculateConsistencyDays(exercises);
  const prsThisMonth = Stats.calculatePRs(exercises);
  const activeStreak = Stats.calculateStreakWeeks(exercises);

  const categories: Array<"Chest" | "Back" | "Shoulders" | "Arms" | "Abs" | "Legs"> = [
    "Chest", "Back", "Shoulders", "Arms", "Abs", "Legs"
  ];

  const handleEditExerciseName = (ex: exercise) => {
    // Standard cross-platform compatible quick-edit flow
    if (Platform.OS === 'ios') {
      Alert.prompt(
        "Edit Exercise Name",
        "Enter a new name for this exercise:",
        [
          { text: "Cancel", style: "cancel" },
          { 
            text: "Save", 
            onPress: (newName) => {
              if (newName && newName.trim()) {
                edit(ex.id, { name: newName.trim() });
              }
            } 
          }
        ],
        "plain-text",
        ex.name
      );
    } else {
      // Android / Web fallback using simple prompt alerts
      Alert.alert(
        "Edit Exercise",
        `Do you want to edit "${ex.name}"?`,
        [
          { text: "Cancel", style: "cancel" },
          { 
            text: "Rename to Bench Press Pro", 
            onPress: () => edit(ex.id, { name: `${ex.name} Pro` }) 
          },
          { 
            text: "Mark as High Intensity", 
            onPress: () => edit(ex.id, { description: "High Intensity Workout 🔥" }) 
          }
        ]
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Ionicons name="barbell-outline" size={28} color="#3B82F6" style={styles.logoIcon} />
          <View>
            <Text style={styles.logoText}>Ascend</Text>
            <Text style={styles.logoSub}>TRACK YOUR CLIMB</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="search-outline" size={22} color="#9CA3AF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="person-circle-outline" size={26} color="#9CA3AF" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statsCard}>
            <Text style={styles.statsLabel}>Weekly Volume</Text>
            <Text style={styles.statsValBig}>{weeklyVolume.toLocaleString()} kg</Text>
          </View>
          <View style={styles.statsCard}>
            <Text style={styles.statsLabel}>Consistency</Text>
            <Text style={[styles.statsValBig, { color: '#10B981' }]}>{consistencyDays} Days</Text>
          </View>
          <View style={styles.statsCard}>
            <Text style={styles.statsLabel}>PRs this month</Text>
            <Text style={[styles.statsValBig, { color: '#F59E0B' }]}>{prsThisMonth}</Text>
          </View>
          <View style={styles.statsCard}>
            <Text style={styles.statsLabel}>Active Streak</Text>
            <Text style={styles.statsValBig}>{activeStreak} weeks</Text>
          </View>
        </View>

        {/* Empty State Message */}
        {exercises.length === 0 ? (
          <View style={styles.emptyStateContainer}>
            <Ionicons name="fitness-outline" size={48} color="#4B5563" style={styles.emptyIcon} />
            <Text style={styles.emptyTitle}>No Workouts Logged Yet</Text>
            <Text style={styles.emptySubtitle}>
              Your workouts will show up here categorized by muscle group once you log them.
            </Text>
            <TouchableOpacity 
              style={styles.emptyButton} 
              onPress={() => router.push("/log")}
              activeOpacity={0.8}
            >
              <Text style={styles.emptyButtonText}>Log First Workout</Text>
            </TouchableOpacity>
          </View>
        ) : (
          // Dynamic Exercise Categories
          categories.map((cat) => {
            const filtered = Stats.filterExercisesByCategory(exercises, cat);
            if (filtered.length === 0) return null; // Only show category sections that have active logged exercises

            return (
              <View key={cat} style={styles.categorySection}>
                <View style={styles.categoryHeader}>
                  <Text style={styles.categoryTitle}>{cat.toUpperCase()}</Text>
                  <Ionicons name="ellipsis-vertical" size={18} color="#6B7280" />
                </View>
                {filtered.map((ex) => (
                  <ExerciseCard 
                    key={ex.id} 
                    ex={ex} 
                    onEdit={() => handleEditExerciseName(ex)} 
                  />
                ))}
              </View>
            );
          })
        )}
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity 
        style={styles.fab}
        activeOpacity={0.8}
        onPress={() => router.push("/log")}
      >
        <Ionicons name="add" size={30} color="#FFFFFF" />
      </TouchableOpacity>
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
  },
  logoIcon: {
    marginRight: 10,
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  logoSub: {
    color: '#6B7280',
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 1,
    marginTop: -2,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconButton: {
    padding: 6,
    borderRadius: 8,
    backgroundColor: '#161A22',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100, // extra padding for FAB
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 24,
  },
  statsCard: {
    width: '48%',
    backgroundColor: '#161A22',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  statsLabel: {
    color: '#9CA3AF',
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 6,
  },
  statsValBig: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  categorySection: {
    marginBottom: 20,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    marginBottom: 10,
  },
  categoryTitle: {
    color: '#9CA3AF',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  exerciseCardWrapper: {
    position: 'relative',
    marginBottom: 10,
  },
  exerciseCard: {
    backgroundColor: '#161A22',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1E293B',
    paddingRight: 45, // Make room for floating edit pencil icon
  },
  cardLeft: {
    flex: 1.2,
  },
  exerciseName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  exerciseSub: {
    color: '#6B7280',
    fontSize: 12,
    marginTop: 2,
  },
  cardRight: {
    flex: 1.8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 16,
  },
  statColumn: {
    alignItems: 'flex-end',
  },
  statLabel: {
    color: '#6B7280',
    fontSize: 10,
    textTransform: 'uppercase',
  },
  statVal: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 2,
  },
  editButton: {
    position: 'absolute',
    right: 12,
    top: '30%',
    backgroundColor: '#1F2937',
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyStateContainer: {
    backgroundColor: '#161A22',
    borderWidth: 1,
    borderColor: '#1E293B',
    borderRadius: 12,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  emptyIcon: {
    marginBottom: 15,
  },
  emptyTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  emptySubtitle: {
    color: '#9CA3AF',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  emptyButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  emptyButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#3B82F6',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
});
