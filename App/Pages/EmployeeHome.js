import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { MaterialIcons } from "@expo/vector-icons";

const user = {
  name: "Vansh Kapila",
  id: "CIT-2024-1043",
  performancePoints: 850,
};

// Current civic issue
const currentProblem = {
  id: "CIV-2024-0892",
  title: "Potholes on Main Street",
  description: "Large potholes causing traffic disruptions and vehicle damage.",
  priority: "High",
  category: "Roads",
  workingFor: "3h 15m",
};

// Assigned issues
const assignedProblems = [
  { id: "CIV-2024-0892", title: "Potholes on Main Street", priority: "High" },
  { id: "CIV-2024-0891", title: "Streetlight not working in Sector 9", priority: "Medium" },
  { id: "CIV-2024-0890", title: "Overflowing garbage bins", priority: "High" },
  { id: "CIV-2024-0889", title: "Water leakage near park", priority: "Low" },
];

// Department grid with valid icons
const departments = [
  { name: "Roads", icon: "road", color: "#CCE5FF" },
  { name: "Electricity", icon: "lightbulb-on-outline", color: "#F2E6FF" },
  { name: "Sanitation", icon: "delete", color: "#D9F2E6" },
  { name: "Buildings", icon: "office-building", color: "#FFE6CC" },
  { name: "Water Supply", icon: "water-pump", color: "#FFD9D9" },
  { name: "Maintenance", icon: "tools", color: "#FFF3CC" },
];

const priorityColors = {
  High: "#FF6666",
  Medium: "#FFD966",
  Low: "#A8E6A1",
};

export default function EmployeeHome() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
      <ScrollView style={styles.container}>
        {/* User Info */}
        <View style={styles.userCard}>
          <View style={styles.userIcon}>
            <FontAwesome name="user" size={40} color="#1E40AF" />
          </View>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userId}>{user.id}</Text>

          <View style={styles.performanceBox}>
            <Text style={{ fontWeight: "600" }}>Performance Points</Text>
            <View style={styles.pointsBadge}>
              <Text style={{ color: "white" }}>{user.performancePoints} pts</Text>
            </View>
          </View>
        </View>

        {/* Current Problem */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <MaterialIcons name="error-outline" size={20} color="#1E40AF" />
            <Text style={[styles.cardHeaderText, { marginLeft: 6 }]}>
              Current Civic Issue
            </Text>
          </View>

          <Text style={styles.problemId}>Issue ID: {currentProblem.id}</Text>
          <Text style={styles.problemTitle}>{currentProblem.title}</Text>
          <Text style={styles.problemDescription}>{currentProblem.description}</Text>

          <View style={styles.problemTagsRow}>
            <View
              style={[
                styles.priorityTag,
                { backgroundColor: priorityColors[currentProblem.priority] },
              ]}
            >
              <Text style={{ fontWeight: "600" }}>{currentProblem.priority}</Text>
            </View>
            <View style={styles.categoryTag}>
              <Text style={{ fontWeight: "600" }}>{currentProblem.category}</Text>
            </View>
            <Text style={{ color: "#444" }}>
              Working for: {currentProblem.workingFor}
            </Text>
          </View>
        </View>

        {/* Assigned Problems */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <MaterialIcons name="warning" size={20} color="#D97706" />
            <Text style={[styles.cardHeaderText, { marginLeft: 6 }]}>
              Assigned Civic Issues
            </Text>
            <View style={styles.assignedCount}>
              <Text style={{ color: "white", fontWeight: "600" }}>
                {assignedProblems.length}
              </Text>
            </View>
          </View>

          {assignedProblems.map((problem) => (
            <View key={problem.id} style={styles.assignedProblemRow}>
              <View style={styles.problemInfoLeft}>
                <MaterialIcons name="schedule" size={16} color="#444" />
                <Text style={{ marginLeft: 6, fontWeight: "600" }}>
                  {problem.id}
                </Text>
              </View>

              <Text style={styles.assignedProblemTitle}>{problem.title}</Text>

              <View
                style={[
                  styles.priorityTagSmall,
                  { backgroundColor: priorityColors[problem.priority] },
                ]}
              >
                <Text style={{ fontWeight: "600" }}>{problem.priority}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Departments */}
        <View style={styles.card}>
          <Text style={styles.departmentsTitle}>Departments</Text>
          <View style={styles.departmentsGrid}>
            {departments.map((dep) => (
              <TouchableOpacity
                key={dep.name}
                style={[styles.departmentBox, { backgroundColor: dep.color }]}
              >
                <MaterialCommunityIcons
                  name={dep.icon}
                  size={30}
                  color="#444"
                  style={{ marginBottom: 4 }}
                />
                <Text style={{ fontWeight: "600" }}>{dep.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#FFF", padding: 12 },
  userCard: {
    backgroundColor: "#E0E7FF",
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: "center",
    marginBottom: 20,
  },
  userIcon: {
    backgroundColor: "#3B82F6",
    borderRadius: 50,
    padding: 14,
    marginBottom: 8,
  },
  userName: { fontWeight: "600", fontSize: 18, marginBottom: 2, color: "#000" },
  userId: { fontSize: 12, fontWeight: "600", color: "#64748B", marginBottom: 12 },
  performanceBox: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    justifyContent: "space-between",
    width: "75%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  pointsBadge: {
    backgroundColor: "#2563EB",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardHeader: { flexDirection: "row", alignItems: "center", marginBottom: 14 },
  cardHeaderText: { fontWeight: "600", fontSize: 18 },
  problemId: { fontWeight: "600", color: "#64748B", marginBottom: 6 },
  problemTitle: { fontWeight: "600", fontSize: 16, marginBottom: 6 },
  problemDescription: { color: "#64748B", marginBottom: 10 },
  problemTagsRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  priorityTag: { paddingVertical: 6, paddingHorizontal: 14, borderRadius: 20 },
  categoryTag: {
    backgroundColor: "#E0E7FF",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  assignedCount: {
    backgroundColor: "#F59E0B",
    borderRadius: 14,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 6,
  },
  assignedProblemRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    justifyContent: "space-between",
  },
  problemInfoLeft: { flexDirection: "row", alignItems: "center", width: "40%" },
  assignedProblemTitle: { fontWeight: "600", width: "45%" },
  priorityTagSmall: { paddingVertical: 4, paddingHorizontal: 10, borderRadius: 14 },
  departmentsTitle: { fontWeight: "600", fontSize: 18, marginBottom: 12 },
  departmentsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  departmentBox: {
    width: "30%",
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 14,
    alignItems: "center",
  },
});
