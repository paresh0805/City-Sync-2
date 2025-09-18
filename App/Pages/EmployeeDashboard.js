import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";

export default function EmployeeDashboard({navigation}) {
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const handleDepartmentClick = (name) => {
    setSelectedDepartment(name);
    console.log(`Selected department: ${name}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Performance Card */}
        <View style={styles.performanceCard}>
          <View style={styles.headerRow}>
            <Text style={styles.nameText}>Vansh Kapila</Text>
            <Text style={styles.idText}>CIT-2024-1043</Text>
          </View>

          <View style={styles.pointsContainer}>
            <Text style={styles.pointsLabel}>Performance Points</Text>
            <View style={styles.pointsBadge}>
              <Text style={styles.pointsText}>850 pts</Text>
            </View>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={[styles.statValue, { color: "#22c55e" }]}>5</Text>
              <Text style={styles.statLabel}>Assigned</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={[styles.statValue, { color: "#16a34a" }]}>12</Text>
              <Text style={styles.statLabel}>Completed</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={[styles.statValue, { color: "#0284c7" }]}>1</Text>
              <Text style={styles.statLabel}>Working On</Text>
            </View>
          </View>
        </View>

        {/* Department Grid */}
        <View style={styles.grid}>
          {/* Water */}
          <TouchableOpacity
            style={styles.deptCard}
            onPress={() => navigation.navigate("EmployeeHome")}
          >
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1521207418485-99c705420785?w=800&q=80",
              }}
              style={styles.deptImage}
            />
            <View style={styles.deptInfo}>
              <Text style={styles.deptText}>Water</Text>
            </View>
          </TouchableOpacity>

          {/* Graffiti */}
          <TouchableOpacity
            style={styles.deptCard}
            onPress={() => handleDepartmentClick("Graffiti")}
          >
            <Image
              source={{
                uri: "https://vistanow.org/wp-content/uploads/2016/11/8385870630_f86414be9c_b-1024x768.jpg",
              }}
              style={styles.deptImage}
            />
            <View style={styles.deptInfo}>
              <Text style={styles.deptText}>Graffiti</Text>
            </View>
          </TouchableOpacity>

          {/* Sanitation */}
          <TouchableOpacity
            style={styles.deptCard}
            onPress={() => handleDepartmentClick("Sanitation")}
          >
            <Image
              source={{
                uri: "https://aecom.com/blog/wp-content/uploads/2017/11/Addressing-Urban-Sanitation-Crisis-e1511277087204.jpg",
              }}
              style={styles.deptImage}
            />
            <View style={styles.deptInfo}>
              <Text style={styles.deptText}>Sanitation</Text>
            </View>
          </TouchableOpacity>

          {/* Infrastructure */}
          <TouchableOpacity
            style={styles.deptCard}
            onPress={() => handleDepartmentClick("Infrastructure")}
          >
            <Image
              source={{
                uri: "https://media.licdn.com/dms/image/v2/C4E12AQHoaVc1r5bWqw/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1553250509285?e=2147483647&v=beta&t=SXjFoj8x9KADHg-dFB7I-TVDF-wdkq8rLqy3fd0GbkY",
              }}
              style={styles.deptImage}
            />
            <View style={styles.deptInfo}>
              <Text style={styles.deptText}>Infrastructure</Text>
            </View>
          </TouchableOpacity>

          {/* Electricity */}
          <TouchableOpacity
            style={styles.deptCard}
            onPress={() => handleDepartmentClick("Electricity")}
          >
            <Image
              source={{
                uri: "https://img.mathrubhumi.com/view/acePublic/alias/contentid/1jqpyiu4qo6bxcug5y3/0/electricity-2-jpg.webp?f=3%3A2&q=0.75&w=900",
              }}
              style={styles.deptImage}
            />
            <View style={styles.deptInfo}>
              <Text style={styles.deptText}>Electricity</Text>
            </View>
          </TouchableOpacity>

          {/* Sewage */}
          <TouchableOpacity
            style={styles.deptCard}
            onPress={() => handleDepartmentClick("Sewage")}
          >
            <Image
              source={{
                uri: "https://s3.eu-west-2.amazonaws.com/assets.theriverstrust.org/Images/_1200x675_crop_center-center_60_line/Sewage-website_2024-02-12-122219_qtcj.jpg",
              }}
              style={styles.deptImage}
            />
            <View style={styles.deptInfo}>
              <Text style={styles.deptText}>Sewage</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Selected Department Toast */}
      {selectedDepartment && (
        <View style={styles.toast}>
          <Text style={styles.toastText}>
            Selected: {selectedDepartment.toUpperCase()}
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9fafb" },
  content: { padding: 16, paddingBottom: 100 },

  // Performance card
  performanceCard: {
    backgroundColor: "#eef2ff",
    borderRadius: 12,
    padding: 16,
    marginTop:30,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#c7d2fe",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  nameText: { fontSize: 16, fontWeight: "600", color: "#111827" },
  idText: { fontSize: 12, color: "#6b7280", fontWeight: "500" },
  pointsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  pointsLabel: { fontSize: 14, fontWeight: "500", color: "#111827" },
  pointsBadge: {
    backgroundColor: "#2563eb",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  pointsText: { color: "white", fontWeight: "600" },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statBox: { alignItems: "center" },
  statValue: { fontSize: 16, fontWeight: "700" },
  statLabel: { fontSize: 12, color: "#6b7280" },

  // Department grid
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  deptCard: {
    width: "47%",
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    overflow: "hidden",
  },
  deptImage: {
    width: "100%",
    height: 120,
  },
  deptInfo: {
    paddingVertical: 10,
    alignItems: "center",
  },
  deptText: {
    fontWeight: "600",
    fontSize: 14,
    color: "#111827",
  },

  // Toast
  toast: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#2563eb",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  toastText: { color: "white", fontWeight: "bold" },
});
