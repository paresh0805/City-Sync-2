import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import * as Progress from "react-native-progress";

export default function EmployeeHome() {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.issueTitle}>Water Leak in Building Foundation</Text>
        <View style={styles.imageRow}>
          <Image
            source={require("../assets/homelogo.png")}
            style={styles.issueImage}
          />
          <Image
            source={require("../assets/homelogo.png")}
            style={styles.issueImage}
          />
        </View>
        <Text style={styles.updateText}>
          Initial assessment complete. Water source identified from damaged
          pipe-junction. Temporary containment measure in place.
        </Text>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressCard}>
        <Text style={styles.sectionTitle}>Progress</Text>
        <Progress.Bar progress={0.45} width={null} color="#4CAF50" />
        <Text style={styles.progressText}>Completion: 45%</Text>
      </View>

      {/* Risk Factors + Steps */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Step-by-Step Plan</Text>
        <View style={styles.step}>
          <Text style={styles.stepTitle}>1. Emergency Water Extraction</Text>
          <Text style={styles.stepStatus}>Pending</Text>
        </View>
        <View style={styles.step}>
          <Text style={styles.stepTitle}>2. Pipe Replacement</Text>
          <Text style={styles.stepStatus}>Scheduled</Text>
        </View>
        <View style={styles.step}>
          <Text style={styles.stepTitle}>3. Moisture Monitoring Installation</Text>
          <Text style={styles.stepStatus}>In Progress</Text>
        </View>
        <View style={styles.step}>
          <Text style={styles.stepTitle}>4. Follow-up Inspection</Text>
          <Text style={styles.stepStatus}>Pending</Text>
        </View>
      </View>

      {/* Cost Analysis */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Cost Analysis</Text>
        <Text>Total Estimated Cost: $2,500 - $4,200</Text>
        <Text>Labor: $1200 - $1500</Text>
        <Text>Materials: $800 - $1000</Text>
        <Text>Equipment: $300 - $450</Text>
        <Text>Permits: $150 - $250</Text>
        <Text>Contingency: $200 - $500</Text>
      </View>

      {/* Task Management */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Task Management</Text>
        <View style={styles.task}>
          <Text>✔ Contact insurance company</Text>
        </View>
        <View style={styles.task}>
          <Text>⬜ Order moisture monitoring equipment</Text>
        </View>
        <View style={styles.task}>
          <Text>⬜ Notify tenants about temporary water shutdown</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 15,
  },
  header: {
    marginBottom: 15,
  },
  issueTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  imageRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  issueImage: {
    width: "48%",
    height: 120,
    borderRadius: 8,
    backgroundColor: "#ddd",
  },
  updateText: {
    marginTop: 10,
    fontSize: 14,
    color: "#444",
  },
  progressCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 8,
  },
  progressText: {
    marginTop: 8,
    fontSize: 14,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
  },
  step: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 6,
  },
  stepTitle: {
    fontSize: 14,
  },
  stepStatus: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#2196F3",
  },
  task: {
    marginVertical: 6,
  },
});