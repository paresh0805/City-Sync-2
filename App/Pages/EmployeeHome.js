import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const user = {
  name: "Vansh Kapila",
  id: "CIT-2024-1043",
  performancePoints: 850,
  assigned: 5,
  completed: 12,
  workingOn: 1,
};

const currentProblem = {
  id: "CIV-2024-0892",
  title: "Potholes on Main Street",
  lastUpdate: "Issue flagged to maintenance team. Awaiting response.",
  priority: "High",
  category: "Roads",
  workingFor: "3h 15m",
};

const assignedProblems = [
  { id: "CIV-2024-0892", title: "Potholes on Main Street", priority: "High" },
  { id: "CIV-2024-0891", title: "Streetlight not working in Sector 9", priority: "Medium" },
  { id: "CIV-2024-0890", title: "Overflowing garbage bins", priority: "High" },
  { id: "CIV-2024-0889", title: "Water leakage near park", priority: "Low" },
  { id: "CIV-2024-0888", title: "Broken sidewalk in Sector 4", priority: "Medium" },
];

const priorityColors = {
  High: "#FF6666",
  Medium: "#FFD966",
  Low: "#A8E6A1",
};

export default function EmployeeHome({ navigation }) {
  const shortId = (fullId) => fullId.slice(-4);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
      <ScrollView style={styles.container}>
        {/* User Info */}
        <View style={[styles.userCard, styles.blueBorder]}>
          <View style={styles.userHeaderRow}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userId}>{user.id}</Text>
          </View>

          <View style={styles.performanceBox}>
            <Text style={{ fontWeight: "600" }}>Performance Points</Text>
            <View style={styles.pointsBadge}>
              <Text style={{ color: "white" }}>{user.performancePoints} pts</Text>
            </View>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{user.assigned}</Text>
              <Text style={styles.statLabel}>Assigned</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{user.completed}</Text>
              <Text style={styles.statLabel}>Completed</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{user.workingOn}</Text>
              <Text style={styles.statLabel}>Working On</Text>
            </View>
          </View>
        </View>

        {/* Currently Working On */}
        <View style={[styles.cardBordered, styles.blueBorder]}>
          <View style={styles.cardHeaderVisual}>
            <Text style={styles.cardHeaderTextVisual}>📝 Currently Working On</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Issue ID:</Text>
            <Text style={styles.value}>{shortId(currentProblem.id)}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Title:</Text>
            <Text style={[styles.value, { flex: 1 }]}>{currentProblem.title}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Last Update:</Text>
            <Text style={[styles.value, { flex: 1 }]}>{currentProblem.lastUpdate}</Text>
          </View>

          <View style={styles.tagRow}>
            <View
              style={[
                styles.priorityTag,
                { backgroundColor: priorityColors[currentProblem.priority] },
              ]}
            >
              <Text style={{ fontWeight: "600", color: "#FFF" }}>
                {currentProblem.priority}
              </Text>
            </View>
            <View style={styles.categoryTag}>
              <Text style={{ fontWeight: "600", color: "#1E3A8A" }}>
                {currentProblem.category}
              </Text>
            </View>
            <Text style={styles.value}>Working for: {currentProblem.workingFor}</Text>
          </View>

          {/* Button: Progress */}
          <TouchableOpacity
            style={styles.cardButton}
            onPress={() => navigation.navigate("SpecificIssueEmployee")}
          >
            <Text style={styles.cardButtonText}>Progress</Text>
          </TouchableOpacity>

          {/* Button: Report */}
          <TouchableOpacity
            style={[styles.cardButton, { backgroundColor: "#1E3A8A" }]}
            onPress={() => navigation.navigate("EmployeeReport")}
          >
            <Text style={styles.cardButtonText}>Report</Text>
          </TouchableOpacity>
        </View>

        {/* Assigned Issues */}
        <View style={[styles.cardBordered, styles.blueBorder]}>
          <View style={styles.cardHeaderVisual}>
            <Text style={styles.cardHeaderTextVisual}>ASSIGNED</Text>
          </View>

          <View style={[styles.assignedRow, styles.assignedHeaderRow]}>
            <Text style={[styles.assignedId, styles.assignedHeaderText]}>ID</Text>
            <Text style={[styles.assignedTitle, styles.assignedHeaderText]}>Title</Text>
            <Text style={[styles.assignedPriority, styles.assignedHeaderText]}>Priority</Text>
          </View>

          {assignedProblems.map((problem) => (
            <View key={problem.id} style={styles.assignedRow}>
              <Text style={styles.assignedId}>{shortId(problem.id)}</Text>
              <Text style={styles.assignedTitle}>{problem.title}</Text>
              <View
                style={[
                  styles.priorityTagSmall,
                  { backgroundColor: priorityColors[problem.priority] },
                ]}
              >
                <Text style={{ fontWeight: "600", color: "#FFF" }}>
                  {problem.priority}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#FFF", padding: 12 },

  /* User Card */
  userCard: {
    backgroundColor: "#E0E7FF",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  blueBorder: {
    borderColor: "#1E3A8A",
    borderWidth: 2,
  },
  userHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  userName: { fontWeight: "600", fontSize: 18, color: "#000" },
  userId: { fontSize: 12, fontWeight: "600", color: "#64748B" },
  performanceBox: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 12,
  },
  pointsBadge: {
    backgroundColor: "#2563EB",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 8,
  },
  statBox: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "700",
    color: "#16A34A",
  },
  statLabel: {
    fontSize: 12,
    color: "#374151",
  },

  /* Card Styles */
  cardBordered: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    backgroundColor: "#FFF",
    marginBottom: 20,
    overflow: "hidden",
  },
  cardHeaderVisual: {
    backgroundColor: "#1E3A8A",
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  cardHeaderTextVisual: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFF",
  },

  /* Info Rows */
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  label: {
    fontSize: 14,
    color: "#374151",
    fontWeight: "500",
    width: 100,
  },
  value: {
    fontSize: 14,
    color: "#111827",
    flexShrink: 1,
  },
  tagRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    gap: 8,
  },
  priorityTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 8,
  },
  categoryTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: "#DBEAFE",
    marginRight: 8,
  },

  /* Button */
  cardButton: {
    backgroundColor: "#1E3A8A",
    paddingVertical: 10,
    borderRadius: 12,
    marginHorizontal: 12,
    marginBottom: 12,
    alignItems: "center",
  },
  cardButtonText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 14,
  },

  /* Assigned Section */
  assignedRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  assignedHeaderRow: {
    backgroundColor: "#F3F4F6",
  },
  assignedHeaderText: {
    fontWeight: "700",
    color: "#111827",
  },
  assignedId: {
    width: 60,
    fontSize: 13,
    fontWeight: "600",
    color: "#374151",
  },
  assignedTitle: {
    flex: 1,
    fontSize: 14,
    color: "#111827",
    marginRight: 8,
  },
  assignedPriority: {
    width: 80,
    textAlign: "center",
  },
  priorityTagSmall: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 14,
    minWidth: 70,
    alignItems: "center",
  },
});
