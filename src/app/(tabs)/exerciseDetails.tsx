import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

type HistoryCardProps = {
  date: string;
  sessionName: string;
  weight: string;
  reps: string;
  volume: string;
};

function HistoryCard({ date, sessionName, weight, reps, volume }: HistoryCardProps) {
  return (
    <View style={styles.historyCard}>
      <View style={styles.historyCardHeader}>
        <View>
          <Text style={styles.cardDate}>{date}</Text>
          <Text style={styles.cardSession}>{sessionName}</Text>
        </View>
        <View style={styles.rightStats}>
          <View style={styles.smallStat}>
            <Text style={styles.smallLabel}>WEIGHT</Text>
            <Text style={styles.smallVal}>{weight}</Text>
          </View>
          <View style={styles.smallStat}>
            <Text style={styles.smallLabel}>REPS</Text>
            <Text style={styles.smallVal}>{reps}</Text>
          </View>
          <View style={styles.smallStat}>
            <Text style={styles.smallLabel}>VOLUME</Text>
            <Text style={styles.smallVal}>{volume}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default function ExerciseDetailsScreen() {
  const router = useRouter();
  const [selectedTimeframe, setSelectedTimeframe] = useState("1M");

  const mockChartBars = [20, 35, 25, 45, 38, 50, 42, 75, 60, 68, 55, 70];

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="person-circle-outline" size={26} color="#9CA3AF" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Category Badges */}
        <View style={styles.badgeRow}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>CHEST</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>STRENGTH</Text>
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>Bench Press</Text>

        {/* Core Record Stats (3 Columns Row) */}
        <View style={styles.recordsRow}>
          <View style={styles.recordCard}>
            <Text style={styles.recordLabel}>BEST WEIGHT</Text>
            <Text style={styles.recordVal}>105 <Text style={styles.recordUnit}>kg</Text></Text>
          </View>
          
          <View style={styles.recordCard}>
            <Text style={styles.recordLabel}>BEST REPS</Text>
            <Text style={[styles.recordVal, { color: '#10B981' }]}>12 <Text style={styles.recordUnit}>reps</Text></Text>
          </View>

          <View style={styles.recordCard}>
            <Text style={styles.recordLabel}>BEST VOLUME</Text>
            <Text style={[styles.recordVal, { color: '#F59E0B' }]}>3,150 <Text style={styles.recordUnit}>kg</Text></Text>
          </View>
        </View>

        {/* Volume Trends Chart */}
        <View style={styles.chartContainer}>
          <View style={styles.chartHeader}>
            <Text style={styles.chartTitle}>VOLUME TRENDS</Text>
            <View style={styles.timeframeRow}>
              {["1M", "6M", "ALL"].map((tf) => (
                <TouchableOpacity
                  key={tf}
                  style={[
                    styles.tfButton,
                    selectedTimeframe === tf ? styles.tfActiveButton : styles.tfInactiveButton
                  ]}
                  onPress={() => setSelectedTimeframe(tf)}
                >
                  <Text 
                    style={[
                      styles.tfText,
                      selectedTimeframe === tf ? styles.tfActiveText : styles.tfInactiveText
                    ]}
                  >
                    {tf}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Graphical Mock Bar Chart */}
          <View style={styles.barsContainer}>
            {mockChartBars.map((h, i) => (
              <View 
                key={i} 
                style={[
                  styles.bar, 
                  { height: h },
                  i === 7 ? styles.barHighlight : null // highlight index 7 like the mock
                ]} 
              />
            ))}
          </View>
        </View>

        {/* Workout History List */}
        <View style={styles.historySection}>
          <View style={styles.historyHeader}>
            <Text style={styles.historyTitle}>WORKOUT HISTORY</Text>
            <Text style={styles.historyCount}>12 ENTRIES</Text>
          </View>

          <HistoryCard 
            date="Oct 24, 2023" 
            sessionName="Push A Session" 
            weight="105 kg" 
            reps="8, 8, 7" 
            volume="2,415 kg" 
          />
          <HistoryCard 
            date="Oct 20, 2023" 
            sessionName="Chest Day" 
            weight="100 kg" 
            reps="10, 10, 10" 
            volume="3,000 kg" 
          />
          <HistoryCard 
            date="Oct 16, 2023" 
            sessionName="Full Body Focus" 
            weight="95 kg" 
            reps="12, 12, 10" 
            volume="3,230 kg" 
          />
          <HistoryCard 
            date="Oct 12, 2023" 
            sessionName="Push B Session" 
            weight="95 kg" 
            reps="10, 10, 8" 
            volume="2,660 kg" 
          />

          <TouchableOpacity style={styles.loadMoreButton} activeOpacity={0.7}>
            <Text style={styles.loadMoreText}>LOAD MORE HISTORY</Text>
          </TouchableOpacity>
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
  backButton: {
    padding: 4,
  },
  iconButton: {
    padding: 6,
    borderRadius: 8,
    backgroundColor: '#161A22',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100, // padding for FAB
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
  },
  badge: {
    backgroundColor: '#1F2937',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  badgeText: {
    color: '#9CA3AF',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 20,
  },
  recordsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 24,
  },
  recordCard: {
    flex: 1,
    backgroundColor: '#161A22',
    borderWidth: 1,
    borderColor: '#1E293B',
    borderRadius: 8,
    padding: 12,
  },
  recordLabel: {
    color: '#6B7280',
    fontSize: 9,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  recordVal: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 6,
  },
  recordUnit: {
    fontSize: 11,
    color: '#6B7280',
    fontWeight: '500',
  },
  chartContainer: {
    backgroundColor: '#161A22',
    borderWidth: 1,
    borderColor: '#1E293B',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  chartTitle: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  timeframeRow: {
    flexDirection: 'row',
    backgroundColor: '#0F1115',
    borderRadius: 6,
    padding: 2,
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  tfButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  tfActiveButton: {
    backgroundColor: '#1E293B',
  },
  tfInactiveButton: {},
  tfText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  tfActiveText: {
    color: '#FFFFFF',
  },
  tfInactiveText: {
    color: '#6B7280',
  },
  barsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 90,
    paddingHorizontal: 4,
  },
  bar: {
    width: 12,
    backgroundColor: '#1F2937',
    borderRadius: 3,
  },
  barHighlight: {
    backgroundColor: '#C7D2FE', // soft lavender/blue highlight
  },
  historySection: {
    marginBottom: 10,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  historyTitle: {
    color: '#6B7280',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  historyCount: {
    color: '#6B7280',
    fontSize: 11,
    fontWeight: 'bold',
  },
  historyCard: {
    backgroundColor: '#161A22',
    borderWidth: 1,
    borderColor: '#1E293B',
    borderRadius: 8,
    padding: 14,
    marginBottom: 10,
  },
  historyCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardDate: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  cardSession: {
    color: '#6B7280',
    fontSize: 11,
    marginTop: 2,
  },
  rightStats: {
    flexDirection: 'row',
    gap: 16,
  },
  smallStat: {
    alignItems: 'flex-end',
  },
  smallLabel: {
    color: '#6B7280',
    fontSize: 8,
    letterSpacing: 0.5,
  },
  smallVal: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 2,
  },
  loadMoreButton: {
    borderWidth: 1,
    borderColor: '#1E293B',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  loadMoreText: {
    color: '#9CA3AF',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 0.5,
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
