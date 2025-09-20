import React from "react";
import { View, Text, ScrollView, StyleSheet, Image } from "react-native";

// Mock Podium component
const LeaderboardPodium = ({ topThree }) => {
  return (
    <View style={styles.podiumContainer}>
      {topThree.map((user) => (
        <View key={user.id} style={styles.podiumCard}>
          {user.avatar && (
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
          )}
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.points}>{user.points} pts</Text>
          <Text style={styles.position}>#{user.position}</Text>
        </View>
      ))}
    </View>
  );
};

// Mock LeaderboardList component
const LeaderboardList = ({ users }) => {
  return (
    <View style={styles.listContainer}>
      {users.map((user) => (
        <View key={user.id} style={styles.listItem}>
          <Text style={styles.listPosition}>#{user.position}</Text>
          {user.avatar && (
            <Image source={{ uri: user.avatar }} style={styles.listAvatar} />
          )}
          <Text style={styles.listName}>{user.name}</Text>
          <Text style={styles.listPoints}>{user.points} pts</Text>
        </View>
      ))}
    </View>
  );
};

// Mock data for the leaderboard
const leaderboardData = [
  { id: "1", name: "Alex Johnson", points: 2450, position: 1, avatar: "https://images.unsplash.com/photo-1704726135027-9c6f034cfa41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1c2VyJTIwcHJvZmlsZSUyMGF2YXRhcnxlbnwxfHx8fDE3NTgyMjUxMjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { id: "2", name: "Maria Garcia", points: 2380, position: 2 },
  { id: "3", name: "David Chen", points: 2290, position: 3 },
  { id: "4", name: "Sarah Wilson", points: 2150, position: 4 },
  { id: "5", name: "Michael Brown", points: 2020, position: 5 },
  { id: "6", name: "Emily Davis", points: 1950, position: 6 },
  { id: "7", name: "James Miller", points: 1880, position: 7 },
  { id: "8", name: "Lisa Anderson", points: 1820, position: 8 },
  { id: "9", name: "Robert Taylor", points: 1750, position: 9 },
  { id: "10", name: "Jennifer White", points: 1680, position: 10 },
  { id: "11", name: "Christopher Lee", points: 1620, position: 11 },
  { id: "12", name: "Amanda Clark", points: 1560, position: 12 },
  { id: "13", name: "Daniel Martinez", points: 1500, position: 13 },
  { id: "14", name: "Jessica Rodriguez", points: 1440, position: 14 },
  { id: "15", name: "Kevin Thompson", points: 1380, position: 15 },
];

export default function Leaderboard() {
  const topThree = leaderboardData.slice(0, 3);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Leaderboard</Text>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Podium Section */}
        <LeaderboardPodium topThree={topThree} />

        {/* Separator */}
        <View style={styles.separator} />

        {/* Full Rankings */}
        <View style={styles.rankings}>
          <Text style={styles.rankingsTitle}>All Rankings</Text>
          <LeaderboardList users={leaderboardData} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f1f5f9" },
  header: {
    padding: 16,
    backgroundColor: "rgba(241, 245, 249, 0.95)",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  headerText: { fontSize: 20, fontWeight: "bold", textAlign: "center" },
  scrollContent: { paddingBottom: 24 },
  podiumContainer: { flexDirection: "row", justifyContent: "space-around", marginVertical: 16 },
  podiumCard: {
    alignItems: "center",
    padding: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
    width: 100,
  },
  avatar: { width: 60, height: 60, borderRadius: 30, marginBottom: 8 },
  name: { fontWeight: "bold", textAlign: "center" },
  points: { color: "gray" },
  position: { fontSize: 12, color: "gray" },
  separator: { height: 1, backgroundColor: "#e2e8f0", marginHorizontal: 16, marginVertical: 8 },
  rankings: { paddingHorizontal: 16 },
  rankingsTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 8 },
  listContainer: {},
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  listPosition: { width: 30, fontWeight: "bold" },
  listAvatar: { width: 40, height: 40, borderRadius: 20, marginRight: 8 },
  listName: { flex: 1, fontWeight: "500" },
  listPoints: { fontWeight: "bold" },
});