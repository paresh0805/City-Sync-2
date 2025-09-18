// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// const EmployeeDashboard = ({ navigation }) => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Employee Dashboard</Text>

//       <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('EmployeeHome')}>
//         <Text style={styles.buttonText}>Vansh</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#fff",
//   },
//   heading: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },
//   button: {
//     backgroundColor: "#000",
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     borderRadius: 8,
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// });

// export default EmployeeDashboard;
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

// Departments data
const departments = [
  {
    id: "water",
    name: "Water",
    image:
      "https://images.unsplash.com/photo-1521207418485-99c705420785?w=800&q=80", // flowing water
  },
  {
    id: "graffiti",
    name: "Graffiti",
    image:
      "https://images.unsplash.com/photo-1581785974428-c58bd9df97da?w=800&q=80", // graffiti wall
  },
  {
    id: "sanitation",
    name: "Sanitation",
    image:
      "https://images.unsplash.com/photo-1591267989190-5e32c0aaf645?w=800&q=80", // cleaning worker
  },
  {
    id: "infrastructure",
    name: "Infrastructure",
    image:
      "https://images.unsplash.com/photo-1505842465776-3d90f616310d?w=800&q=80", // bridge/road
  },
  {
    id: "electricity",
    name: "Electricity",
    image:
      "https://images.unsplash.com/photo-1509395176047-4a66953fd231?w=800&q=80", // power lines
  },
  {
    id: "sewage",
    name: "Sewage",
    image:
      "https://images.unsplash.com/photo-1606813902734-2f5b98e65ce1?w=800&q=80", // drainage pipes
  },
];

export default function EmployeeDashboard() {
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const handleDepartmentClick = (id) => {
    setSelectedDepartment(id);
    console.log(`Selected department: ${id}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>CompanyApp</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Employee Performance Card */}
        <View style={styles.cardWrapper}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80",
            }}
            style={styles.performanceCard}
          />
        </View>

        {/* Department Grid */}
        <View style={styles.grid}>
          {departments.map((dept) => (
            <TouchableOpacity
              key={dept.id}
              style={styles.deptCard}
              onPress={() => handleDepartmentClick(dept.name)}
            >
              <Image source={{ uri: dept.image }} style={styles.deptImage} />
              <Text style={styles.deptText}>{dept.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Selected Department Feedback */}
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
  container: { flex: 1, backgroundColor: "#f0f4ff" },
  header: {
    backgroundColor: "#2563eb",
    paddingVertical: 14,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  headerText: { color: "white", fontSize: 20, fontWeight: "bold" },
  content: { padding: 16, paddingBottom: 100 },
  cardWrapper: { alignItems: "center", marginBottom: 20 },
  performanceCard: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  deptCard: {
    width: "47%",
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  deptImage: { width: "100%", height: 100 },
  deptText: {
    textAlign: "center",
    paddingVertical: 10,
    fontWeight: "600",
    color: "#333",
  },
  toast: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#2563eb",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  toastText: { color: "white", fontWeight: "bold" },
});