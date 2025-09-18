import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const tagColors = {
  "Road Issues": "red",
  "Waste Management": "orange",
  "Lighting": "blue",
  "Vandalism": "purple",
};

export default function WasteIssues() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://backend-production-e436.up.railway.app/issue?category=Waste%20Management"
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setIssues(data.issues);
        }
      })
      .catch((err) => console.error("Fetch Waste Issues Error:", err))
      .finally(() => setLoading(false));
  }, []);

  const renderIssue = ({ item }) => (
    <View style={styles.card}>
      {/* Post Header */}
      <View style={styles.postHeader}>
        <Image
          source={{ uri: "https://i.pravatar.cc/150?u=" + item.citizenId }}
          style={styles.avatarSmall}
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.username}>Citizen {item.citizenId}</Text>
          <Text style={styles.meta}>{item.status.toUpperCase()}</Text>
          <Text style={styles.location}>{item.location}</Text>
        </View>
      </View>

      {/* Post Image */}
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: `https://backend-production-e436.up.railway.app${item.imageUrl}`,
          }}
          style={styles.postImage}
        />
        <View
          style={[
            styles.tag,
            { backgroundColor: tagColors[item.category] || "gray" },
          ]}
        >
          <Text style={styles.tagText}>{item.category}</Text>
        </View>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressBox}>
        <View style={styles.progressBarBackground}>
          <View
            style={[
              styles.progressBarFill,
              { width: item.status === "pending" ? "25%" : "100%" },
            ]}
          />
        </View>
        <Text style={styles.progressText}>
          Resolution Progress: {item.status === "pending" ? "25%" : "100%"}
        </Text>
      </View>

      {/* Description */}
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      {/* White Custom Header */}
      <View style={styles.header}>
        <Image
          source={require("../assets/homelogo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.rightSection}>
          <Text style={styles.points}>⭐ 156</Text>
          <View style={styles.avatarCircle}>
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
              S
            </Text>
          </View>
        </View>
      </View>

      {/* Loader or List */}
      {loading ? (
        <ActivityIndicator size="large" color="#000" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={issues}
          renderItem={renderIssue}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  logo: {
    width: 70,
    height: 70,
    borderRadius: 8,
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
  },
  points: { fontSize: 16, fontWeight: "600", marginRight: 10 },
  avatarCircle: {
    backgroundColor: "#000080",
    borderRadius: 20,
    width: 35,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    paddingVertical: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginVertical: 15,
    marginHorizontal: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  avatarSmall: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  username: {
    fontWeight: "bold",
    fontSize: 14,
  },
  meta: {
    fontSize: 12,
    color: "#888",
  },
  location: {
    fontSize: 12,
    color: "#555",
  },
  imageContainer: {
    position: "relative",
    marginTop: 8,
  },
  postImage: {
    width: "100%",
    height: 220,
    borderRadius: 10,
  },
  tag: {
    position: "absolute",
    top: 10,
    left: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
  },
  tagText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  progressBox: {
    marginTop: 8,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: "#ddd",
    borderRadius: 5,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#4CAF50",
  },
  progressText: {
    fontSize: 12,
    color: "#333",
    marginTop: 3,
  },
  description: {
    marginTop: 8,
    fontSize: 14,
    color: "#333",
  },
});
