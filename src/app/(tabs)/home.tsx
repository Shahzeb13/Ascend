import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useState, useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useFocusEffect } from "expo-router";
import { workout } from "../../../types/LogExerciseServiceTypes";
import { getWorkouts } from "../../../services/LogExerciseService";
import Toast from "../../components/Toast";

// ── Category colour map ───────────────────────────────────────────────────────
const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  Chest:     { bg: "#1A2438", text: "#60A5FA", border: "#1E3A5F" },
  Back:      { bg: "#1A2430", text: "#34D399", border: "#1E3D30" },
  Shoulders: { bg: "#261A38", text: "#A78BFA", border: "#3B2A5F" },
  Arms:      { bg: "#261A1A", text: "#F87171", border: "#5F2A2A" },
  Abs:       { bg: "#1A2620", text: "#4ADE80", border: "#1E4030" },
  Legs:      { bg: "#261F1A", text: "#FB923C", border: "#5F3A1E" },
};

// ── Workout Card ──────────────────────────────────────────────────────────────
type WorkoutCardProps = { w: workout };

function WorkoutCard({ w }: WorkoutCardProps) {
  const router = useRouter();
  const cfg = CATEGORY_COLORS[w.category] ?? CATEGORY_COLORS["Chest"];

  // Format the SQLite created_at timestamp nicely
  const formattedDate = w.created_at
    ? new Date(w.created_at).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "—";

  return (
    <TouchableOpacity
      style={styles.workoutCard}
      activeOpacity={0.75}
      onPress={() => router.push(`/updateWorkout/${w.id}`)}
    >
      {/* Left: Category badge + date */}
      <View style={styles.cardLeft}>
        <View style={[styles.categoryBadge, { backgroundColor: cfg.bg, borderColor: cfg.border }]}>
          <Text style={[styles.categoryBadgeText, { color: cfg.text }]}>{w.category}</Text>
        </View>
        <View style={styles.dateRow}>
          <Ionicons name="calendar-outline" size={11} color="#4B5563" />
          <Text style={styles.dateText}>{formattedDate}</Text>
        </View>
      </View>

      {/* Right: ID chip + edit button */}
      <View style={styles.cardRight}>
        <Text style={styles.idChip}>#{w.id}</Text>
        <TouchableOpacity
          style={styles.editButton}
          onPress={(e) => {
            e.stopPropagation();
            router.push(`/updateWorkout/${w.id}`);
          }}
        >
          <Ionicons name="pencil" size={16} color="#3B82F6" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

// ── Home Screen ───────────────────────────────────────────────────────────────
export default function HomeScreen() {
  const router = useRouter();
  const [workouts, setWorkouts] = useState<workout[]>([]);
  const [toast, setToast] = useState<{
    visible: boolean;
    message: string;
    type: "success" | "error" | "info";
  }>({ visible: false, message: "", type: "info" });

  const hideToast = () => setToast((prev) => ({ ...prev, visible: false }));

  // Refresh every time this tab comes into focus
  useFocusEffect(
    useCallback(() => {
      const rows = getWorkouts();
      setWorkouts(rows);
    }, [])
  );

  // Group workouts by category
  const categories = ["Chest", "Back", "Shoulders", "Arms", "Abs", "Legs"];
  const grouped = categories
    .map((cat) => ({
      cat,
      items: workouts.filter((w) => w.category === cat),
    }))
    .filter((g) => g.items.length > 0);

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

        {/* Stats row */}
        <View style={styles.statsRow}>
          <View style={styles.statChip}>
            <Text style={styles.statChipVal}>{workouts.length}</Text>
            <Text style={styles.statChipLabel}>Total</Text>
          </View>
          <View style={styles.statChip}>
            <Text style={[styles.statChipVal, { color: "#4ADE80" }]}>{grouped.length}</Text>
            <Text style={styles.statChipLabel}>Categories</Text>
          </View>
          <View style={styles.statChip}>
            <Text style={[styles.statChipVal, { color: "#FB923C" }]}>
              {workouts.length > 0 ? workouts[0].category : "—"}
            </Text>
            <Text style={styles.statChipLabel}>Latest</Text>
          </View>
        </View>

        {/* Empty state */}
        {workouts.length === 0 ? (
          <View style={styles.emptyStateContainer}>
            <Ionicons name="barbell-outline" size={52} color="#1F2937" style={styles.emptyIcon} />
            <Text style={styles.emptyTitle}>No Workouts Yet</Text>
            <Text style={styles.emptySubtitle}>
              Head over to the Log tab, pick a category, and create your first workout.
            </Text>
            <TouchableOpacity
              style={styles.emptyButton}
              onPress={() => router.push("/log")}
              activeOpacity={0.85}
            >
              <Ionicons name="add" size={16} color="#FFF" />
              <Text style={styles.emptyButtonText}>Log First Workout</Text>
            </TouchableOpacity>
          </View>
        ) : (
          grouped.map(({ cat, items }) => {
            const cfg = CATEGORY_COLORS[cat];
            return (
              <View key={cat} style={styles.categorySection}>
                {/* Section header */}
                <View style={styles.sectionHeader}>
                  <View style={[styles.sectionDot, { backgroundColor: cfg.text }]} />
                  <Text style={[styles.sectionTitle, { color: cfg.text }]}>
                    {cat.toUpperCase()}
                  </Text>
                  <Text style={styles.sectionCount}>{items.length} workout{items.length !== 1 ? "s" : ""}</Text>
                </View>

                {items.map((w) => (
                  <WorkoutCard key={w.id} w={w} />
                ))}
              </View>
            );
          })
        )}
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity
        style={styles.fab}
        activeOpacity={0.85}
        onPress={() => router.push("/log")}
      >
        <Ionicons name="add" size={30} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F1115",
  },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#1F2937",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoIcon: {
    marginRight: 10,
  },
  logoText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  logoSub: {
    color: "#6B7280",
    fontSize: 10,
    fontWeight: "600",
    letterSpacing: 1,
    marginTop: -2,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconButton: {
    padding: 6,
    borderRadius: 8,
    backgroundColor: "#161A22",
  },

  // Scroll
  scrollContent: {
    padding: 16,
    paddingBottom: 110,
  },

  // Stats row
  statsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 24,
  },
  statChip: {
    flex: 1,
    backgroundColor: "#13171F",
    borderWidth: 1,
    borderColor: "#1F2937",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  statChipVal: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  statChipLabel: {
    color: "#6B7280",
    fontSize: 11,
    marginTop: 3,
    letterSpacing: 0.5,
  },

  // Category section
  categorySection: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
    paddingHorizontal: 2,
  },
  sectionDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "bold",
    letterSpacing: 1.2,
    flex: 1,
  },
  sectionCount: {
    color: "#4B5563",
    fontSize: 11,
  },

  // Workout card
  workoutCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#13171F",
    borderWidth: 1,
    borderColor: "#1F2937",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 8,
  },
  cardLeft: {
    gap: 6,
  },
  categoryBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
  },
  categoryBadgeText: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  dateText: {
    color: "#4B5563",
    fontSize: 11,
  },
  cardRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  idChip: {
    color: "#374151",
    fontSize: 12,
    fontWeight: "600",
  },
  editButton: {
    backgroundColor: "#1F2937",
    padding: 6,
    borderRadius: 8,
    marginLeft: 4,
  },

  // Empty state
  emptyStateContainer: {
    backgroundColor: "#13171F",
    borderWidth: 1,
    borderColor: "#1F2937",
    borderRadius: 14,
    padding: 36,
    alignItems: "center",
    marginTop: 10,
  },
  emptyIcon: {
    marginBottom: 16,
  },
  emptyTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  emptySubtitle: {
    color: "#6B7280",
    fontSize: 13,
    textAlign: "center",
    lineHeight: 19,
    marginBottom: 22,
    paddingHorizontal: 10,
  },
  emptyButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#2563EB",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 11,
  },
  emptyButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },

  // FAB
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "#2563EB",
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#2563EB",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
});



