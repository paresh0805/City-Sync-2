import React from "react";
import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import { Card, Divider, Badge } from "react-native-paper";
import { MapPin, User, Clock, DollarSign } from "lucide-react-native";

const reportData = {
  problemId: "RPT-2024-0892",
  problemTitle: "Printer Jamming and Paper Feed Issues",
  priority: "High",
  reporterName: "Sarah Johnson",
  location: "Office Floor 3, Room 315",
  problemImage:
    "https://images.unsplash.com/photo-1648898211946-34bee731ca39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjBlcXVpcG1lbnQlMjBwcm9ibGVtJTIwbWFpbnRlbmFuY2V8ZW58MXx8fHwxNzU4MjYwMDA3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  recommendedSteps: [
    "Clean paper feed rollers with lint-free cloth",
    "Check for debris in paper path and remove any obstructions",
    "Replace worn paper feed rollers if necessary",
    "Update printer firmware to latest version",
    "Calibrate paper tray alignment settings",
  ],
  costAnalysis: {
    laborHours: "2-3 hours",
    estimatedCost: "$120 - $180",
    partsNeeded: "Paper feed roller kit ($45), Cleaning supplies ($15)",
  },
};

const getPriorityColor = (priority) => {
  switch (priority.toLowerCase()) {
    case "high":
      return "red";
    case "medium":
      return "orange";
    case "low":
      return "gray";
    default:
      return "gray";
  }
};

export default function EmployeeReport() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>REPORT</Text>

      {/* Problem Details */}
      <Card style={styles.card}>
        <Card.Title title="Problem Details" titleStyle={styles.cardHeader} />
        <Card.Content>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>Problem ID</Text>
              <Text style={styles.value}>{reportData.problemId}</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>Problem Title</Text>
              <Text style={styles.value}>{reportData.problemTitle}</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>Priority</Text>
              <Badge style={{ backgroundColor: getPriorityColor(reportData.priority) }}>
                {reportData.priority}
              </Badge>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Problem Image */}
      <Card style={styles.card}>
        <Card.Title title="Problem Image" titleStyle={styles.cardHeader} />
        <Card.Content>
          <Image
            source={{ uri: reportData.problemImage }}
            style={styles.image}
            resizeMode="cover"
          />
        </Card.Content>
      </Card>

      {/* Reporter Information */}
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.row}>
            <View style={styles.iconRow}>
              <User color="gray" size={20} />
              <View style={{ marginLeft: 8 }}>
                <Text style={styles.label}>Reported by</Text>
                <Text style={styles.value}>{reportData.reporterName}</Text>
              </View>
            </View>
            <View style={styles.iconRow}>
              <MapPin color="gray" size={20} />
              <View style={{ marginLeft: 8 }}>
                <Text style={styles.label}>Location</Text>
                <Text style={styles.value}>{reportData.location}</Text>
              </View>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Recommended Steps */}
      <Card style={styles.card}>
        <Card.Title title="Recommended Steps" titleStyle={styles.cardHeader} />
        <Card.Content>
          {reportData.recommendedSteps.map((step, index) => (
            <View key={index} style={styles.stepRow}>
              <View style={styles.stepNumber}>
                <Text style={{ color: "white" }}>{index + 1}</Text>
              </View>
              <Text style={{ flex: 1 }}>{step}</Text>
            </View>
          ))}
        </Card.Content>
      </Card>

      {/* Cost and Time Analysis */}
      <Card style={styles.card}>
        <Card.Title title="Cost and Time Analysis" titleStyle={styles.cardHeader} />
        <Card.Content>
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <View style={styles.iconRow}>
                <Clock color="gray" size={20} />
                <View style={{ marginLeft: 8 }}>
                  <Text style={styles.label}>Estimated Time</Text>
                  <Text style={styles.value}>{reportData.costAnalysis.laborHours}</Text>
                </View>
              </View>
              <View style={styles.iconRow}>
                <DollarSign color="gray" size={20} />
                <View style={{ marginLeft: 8 }}>
                  <Text style={styles.label}>Labor Cost</Text>
                  <Text style={styles.value}>{reportData.costAnalysis.estimatedCost}</Text>
                </View>
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.label, { marginBottom: 4 }]}>Parts Needed</Text>
              <Text style={styles.value}>{reportData.costAnalysis.partsNeeded}</Text>
            </View>
          </View>
          <Divider style={{ marginVertical: 12 }} />
          <View style={styles.totalCost}>
            <Text style={{ color: "#374151" }}>Total Estimated Cost</Text>
            <Text style={{ fontWeight: "bold", color: "#111827" }}>
              $180 - $240 (including parts and labor)
            </Text>
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f1f5f9" },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 16 },
  card: { marginBottom: 16, borderWidth: 1, borderColor: "#1e293b" },
  cardHeader: { color: "#fff", backgroundColor: "#1e293b" },
  row: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  column: { flex: 1, marginBottom: 8, paddingRight: 8 },
  label: { color: "gray", fontSize: 12 },
  value: { fontWeight: "500", fontSize: 14 },
  iconRow: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  image: { width: "100%", height: 200, borderRadius: 8 },
  stepRow: { flexDirection: "row", alignItems: "flex-start", marginBottom: 8 },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#1e293b",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  totalCost: {
    backgroundColor: "#e2e8f0",
    borderColor: "#1e293b",
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
  },
});
