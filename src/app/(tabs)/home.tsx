import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

type ExerciseCardProps = {
  name: string;
  sub: string;
  latest: string;
  volume: string;
  hasPr?: boolean;
};

function ExerciseCard({ name, sub, latest, volume, hasPr }: ExerciseCardProps) {
  const router = useRouter();
  
  return (
    <TouchableOpacity 
      style={styles.exerciseCard} 
      activeOpacity={0.7}
      onPress={() => router.push("/exerciseDetails")}
    >
      <View style={styles.cardLeft}>
        <Text style={styles.exerciseName}>{name}</Text>
        <Text style={styles.exerciseSub}>{sub}</Text>
      </View>
      <View style={styles.cardRight}>
        <View style={styles.statColumn}>
          <Text style={styles.statLabel}>Latest</Text>
          <Text style={styles.statVal}>{latest}</Text>
        </View>
        <View style={styles.statColumn}>
          <Text style={styles.statLabel}>Volume</Text>
          <Text style={styles.statVal}>{volume}</Text>
        </View>
        {hasPr && (
          <View style={styles.prBadge}>
            <Text style={styles.prText}>PR</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

export default function HomeScreen() {
  const router = useRouter();

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
            <Text style={styles.statsValBig}>42,500 lbs</Text>
          </View>
          <View style={styles.statsCard}>
            <Text style={styles.statsLabel}>Consistency</Text>
            <Text style={[styles.statsValBig, { color: '#10B981' }]}>12 Days</Text>
          </View>
          <View style={styles.statsCard}>
            <Text style={styles.statsLabel}>PRs this month</Text>
            <Text style={[styles.statsValBig, { color: '#F59E0B' }]}>8</Text>
          </View>
          <View style={styles.statsCard}>
            <Text style={styles.statsLabel}>Active Streak</Text>
            <Text style={styles.statsValBig}>4 weeks</Text>
          </View>
        </View>

        {/* Categories */}
        <View style={styles.categorySection}>
          <View style={styles.categoryHeader}>
            <Text style={styles.categoryTitle}>CHEST</Text>
            <Ionicons name="ellipsis-vertical" size={18} color="#6B7280" />
          </View>
          <ExerciseCard name="Bench Press" sub="Barbell" latest="225 lbs" volume="3,150" hasPr />
          <ExerciseCard name="Incline DB Press" sub="Dumbbell" latest="85 lbs" volume="2,040" />
        </View>

        <View style={styles.categorySection}>
          <View style={styles.categoryHeader}>
            <Text style={styles.categoryTitle}>BACK</Text>
            <Ionicons name="ellipsis-vertical" size={18} color="#6B7280" />
          </View>
          <ExerciseCard name="Deadlift" sub="Conventional" latest="405 lbs" volume="2,025" hasPr />
          <ExerciseCard name="Pull Ups" sub="Weighted" latest="+45 lbs" volume="1,850" />
        </View>

        <View style={styles.categorySection}>
          <View style={styles.categoryHeader}>
            <Text style={styles.categoryTitle}>LEGS</Text>
            <Ionicons name="ellipsis-vertical" size={18} color="#6B7280" />
          </View>
          <ExerciseCard name="Squat" sub="High Bar" latest="315 lbs" volume="4,725" />
          <ExerciseCard name="Leg Press" sub="45 Degree" latest="540 lbs" volume="8,100" hasPr />
        </View>

        <View style={styles.categorySection}>
          <View style={styles.categoryHeader}>
            <Text style={styles.categoryTitle}>SHOULDERS</Text>
            <Ionicons name="ellipsis-vertical" size={18} color="#6B7280" />
          </View>
          <ExerciseCard name="OHP" sub="Strict" latest="135 lbs" volume="1,350" />
          <ExerciseCard name="Lateral Raise" sub="Dumbbell" latest="35 lbs" volume="1,050" />
        </View>

        <View style={styles.categorySection}>
          <View style={styles.categoryHeader}>
            <Text style={styles.categoryTitle}>ARMS</Text>
            <Ionicons name="ellipsis-vertical" size={18} color="#6B7280" />
          </View>
          <ExerciseCard name="Skullcrushers" sub="EZ Bar" latest="75 lbs" volume="900" />
          <ExerciseCard name="Incline Curls" sub="Dumbbell" latest="30 lbs" volume="720" hasPr />
        </View>

        <View style={styles.categorySection}>
          <View style={styles.categoryHeader}>
            <Text style={styles.categoryTitle}>CORE</Text>
            <Ionicons name="ellipsis-vertical" size={18} color="#6B7280" />
          </View>
          <ExerciseCard name="Cable Crunch" sub="Kneeling" latest="110 lbs" volume="1,650" />
          <ExerciseCard name="Hanging Leg Raise" sub="Strict" latest="BW" volume="60" />
        </View>
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
  exerciseCard: {
    backgroundColor: '#161A22',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1E293B',
    marginBottom: 10,
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
  prBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    borderWidth: 1,
    borderColor: '#10B981',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  prText: {
    color: '#10B981',
    fontSize: 10,
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
