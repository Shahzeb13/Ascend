import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

type HistoryRowProps = {
  date: string;
  weight: string;
  repsSets: string;
  volume: string;
};

function HistoryRow({ date, weight, repsSets, volume }: HistoryRowProps) {
  return (
    <View style={styles.historyRow}>
      <Text style={styles.colDate}>{date}</Text>
      <Text style={styles.colWeight}>{weight}</Text>
      <Text style={styles.colReps}>{repsSets}</Text>
      <Text style={styles.colVolume}>{volume}</Text>
    </View>
  );
}

export default function HistoryScreen() {
  const [selectedFilter, setSelectedFilter] = useState("Bench Press");

  // Chart data representing different volumes for the last 10 sessions
  const chartData = [25, 40, 30, 48, 42, 60, 50, 55, 45, 65];

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Ionicons name="barbell-outline" size={28} color="#3B82F6" style={styles.logoIcon} />
          <Text style={styles.logoText}>Ascend</Text>
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

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.metaTitle}>PERFORMANCE RECORDS</Text>
        <Text style={styles.heading}>Exercise History</Text>

        {/* Filter Pills */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
          {["Bench Press", "Squat", "Deadlift"].map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterPill,
                selectedFilter === filter ? styles.activeFilter : styles.inactiveFilter,
              ]}
              onPress={() => setSelectedFilter(filter)}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedFilter === filter ? styles.activeFilterText : styles.inactiveFilterText,
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.moreFilterPill}>
            <Ionicons name="options-outline" size={14} color="#9CA3AF" />
            <Text style={styles.moreFilterText}>More</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Core Stats Grid */}
        <View style={styles.statsCard}>
          <Text style={styles.statsCardLabel}>Est. 1RM</Text>
          <Text style={styles.statsCardValue}>285 <Text style={styles.statsUnit}>lbs</Text></Text>
        </View>
        
        <View style={styles.statsCard}>
          <Text style={styles.statsCardLabel}>Total Volume</Text>
          <Text style={styles.statsCardValue}>142k <Text style={styles.statsUnit}>lbs</Text></Text>
        </View>

        {/* Mock Bar Chart */}
        <View style={styles.chartContainer}>
          <View style={styles.chartHeader}>
            <Text style={styles.chartTitle}>Volume Trend (30d)</Text>
            <View style={styles.trendRow}>
              <Ionicons name="trending-up-outline" size={14} color="#10B981" />
              <Text style={styles.trendText}>+12% vs last month</Text>
            </View>
          </View>
          <View style={styles.barsRow}>
            {chartData.map((val, idx) => (
              <View 
                key={idx} 
                style={[
                  styles.bar, 
                  { height: val },
                  idx === chartData.length - 1 ? styles.activeBar : null
                ]} 
              />
            ))}
          </View>
        </View>

        {/* October History Group */}
        <View style={styles.timelineSection}>
          <View style={styles.timelineHeader}>
            <Text style={styles.timelineMonth}>October 2023</Text>
            <Text style={styles.timelineCount}>14 Entries</Text>
          </View>
          <View style={styles.thRow}>
            <Text style={[styles.thLabel, styles.colDate]}>DATE</Text>
            <Text style={[styles.thLabel, styles.colWeight]}>WEIGHT</Text>
            <Text style={[styles.thLabel, styles.colReps]}>REPS / SETS</Text>
            <Text style={[styles.thLabel, styles.colVolume]}>VOLUME</Text>
          </View>
          <HistoryRow date="Oct 28" weight="225 lbs" repsSets="12 / 12 / 10 / 8" volume="9,450 lbs" />
          <HistoryRow date="Oct 24" weight="225 lbs" repsSets="10 / 10 / 10" volume="6,750 lbs" />
          <HistoryRow date="Oct 21" weight="215 lbs" repsSets="12 / 12 / 12" volume="7,740 lbs" />
          <HistoryRow date="Oct 17" weight="215 lbs" repsSets="10 / 10 / 8" volume="6,020 lbs" />
          <HistoryRow date="Oct 12" weight="225 lbs" repsSets="12 / 12 / 10" volume="7,650 lbs" />
        </View>

        {/* September History Group */}
        <View style={styles.timelineSection}>
          <View style={styles.timelineHeader}>
            <Text style={styles.timelineMonth}>September 2023</Text>
            <Text style={styles.timelineCount}>12 Entries</Text>
          </View>
          <HistoryRow date="Sep 29" weight="205 lbs" repsSets="15 / 15 / 15" volume="9,225 lbs" />
          <HistoryRow date="Sep 25" weight="205 lbs" repsSets="12 / 12 / 10" volume="6,970 lbs" />
          <HistoryRow date="Sep 20" weight="195 lbs" repsSets="15 / 15 / 15" volume="8,775 lbs" />
        </View>

        {/* Progression Insight Card */}
        <View style={styles.insightCard}>
          <Text style={styles.insightTitle}>Progression Insight</Text>
          <Text style={styles.insightDesc}>
            You've increased your working weight for Bench Press by 10.3% over the last 90 days. Keep the current intensity to reach your 315lb milestone by December.
          </Text>
          <TouchableOpacity style={styles.reportButton} activeOpacity={0.7}>
            <Text style={styles.reportButtonText}>View Full Report</Text>
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
    padding: 20,
    paddingBottom: 40,
  },
  metaTitle: {
    color: '#3B82F6',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginTop: 10,
  },
  heading: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 4,
    marginBottom: 16,
  },
  filterScroll: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  filterPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    height: 36,
  },
  activeFilter: {
    backgroundColor: '#3B82F6',
  },
  inactiveFilter: {
    backgroundColor: '#161A22',
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  filterText: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  activeFilterText: {
    color: '#FFFFFF',
  },
  inactiveFilterText: {
    color: '#9CA3AF',
  },
  moreFilterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#161A22',
    borderWidth: 1,
    borderColor: '#1E293B',
    height: 36,
  },
  moreFilterText: {
    color: '#9CA3AF',
    fontSize: 13,
    fontWeight: 'bold',
  },
  statsCard: {
    backgroundColor: '#161A22',
    borderWidth: 1,
    borderColor: '#1E293B',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  statsCardLabel: {
    color: '#6B7280',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  statsCardValue: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 4,
  },
  statsUnit: {
    fontSize: 16,
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
    fontSize: 14,
    fontWeight: 'bold',
  },
  trendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trendText: {
    color: '#10B981',
    fontSize: 12,
    fontWeight: 'bold',
  },
  barsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 70,
    paddingHorizontal: 8,
  },
  bar: {
    width: 14,
    backgroundColor: '#1F2937',
    borderRadius: 4,
  },
  activeBar: {
    backgroundColor: '#3B82F6',
  },
  timelineSection: {
    marginBottom: 24,
  },
  timelineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderBottomWidth: 1,
    borderBottomColor: '#1F2937',
    paddingBottom: 10,
    marginBottom: 10,
  },
  timelineMonth: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  timelineCount: {
    color: '#6B7280',
    fontSize: 12,
    fontWeight: 'bold',
  },
  thRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    marginBottom: 4,
  },
  thLabel: {
    color: '#6B7280',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  historyRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(31, 41, 55, 0.5)',
    alignItems: 'center',
  },
  colDate: {
    flex: 1.2,
    color: '#9CA3AF',
    fontSize: 13,
  },
  colWeight: {
    flex: 1.5,
    color: '#3B82F6',
    fontSize: 14,
    fontWeight: 'bold',
  },
  colReps: {
    flex: 2.2,
    color: '#9CA3AF',
    fontSize: 13,
  },
  colVolume: {
    flex: 1.6,
    color: '#9CA3AF',
    fontSize: 13,
    textAlign: 'right',
  },
  insightCard: {
    backgroundColor: '#161A22',
    borderWidth: 1,
    borderColor: '#1E293B',
    borderRadius: 12,
    padding: 20,
    marginTop: 10,
  },
  insightTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  insightDesc: {
    color: '#9CA3AF',
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 16,
  },
  reportButton: {
    borderWidth: 1,
    borderColor: '#1E293B',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reportButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
