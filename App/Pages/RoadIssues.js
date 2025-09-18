import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const posts = [
  {
    id: "1",
    username: "🔥 civic_hero_2024",
    avatar: "https://i.pravatar.cc/150?img=1",
    points: "2,847 pts",
    time: "2h",
    location: "Downtown, Main Street",
    tag: "Garbage",
    image: require("../assets/1.jpeg"),
    likes: 87,
    comments: 23,
    progress: 25,
    description:
      "Massive garbage dump blocking the entire sidewalk on Main Street. This has been here for over a week! 😤 #CivicDuty #CleanStreets",
  },
  {
    id: "2",
    username: "🔥 roadwatch_community",
    avatar: "https://i.pravatar.cc/150?img=2",
    points: "1,532 pts",
    time: "5h",
    location: "Green Park",
    tag: "Roads",
    image: require("../assets/2.jpeg"),
    likes: 120,
    comments: 45,
    progress: 50,
    description:
      "Huge pothole causing accidents on Elm Avenue. Multiple cars have damaged their tires here. City needs to fix this ASAP! 🚗💥",
  },
  {
    id: "3",
    username: "🔥 road_savior",
    avatar: "https://i.pravatar.cc/150?img=3",
    points: "3,201 pts",
    time: "1d",
    location: "Central Avenue",
    tag: "Lighting",
    image: require("../assets/3.jpg"),
    likes: 200,
    comments: 67,
    progress: 75,
    description:
      "Street light has been broken for months. This area is completely dark at night, making it unsafe for pedestrians. 🌙💡",
  },
  {
    id: "4",
    username: "🔥 city_watcher",
    avatar: "https://i.pravatar.cc/150?img=4",
    points: "980 pts",
    time: "3d",
    location: "Riverfront",
    tag: "Vandalism",
    image: require("../assets/4.avif"),
    likes: 45,
    comments: 12,
    progress: 10,
    description:
      "Fresh graffiti covering the entire community center wall. This beautiful building deserves better! Let's organize a cleanup day 🎨🚫",
  },
];

const tagColors = {
  Garbage: "orange",
  Roads: "red",
  Lighting: "blue",
  Vandalism: "purple",
};

export default function RoadIssues() {
  const renderPost = ({ item }) => (
    <View style={styles.card}>
      {/* Post Header */}
      <View style={styles.postHeader}>
        <Image source={{ uri: item.avatar }} style={styles.avatarSmall} />
        <View style={{ flex: 1 }}>
          <Text style={styles.username}>{item.username}</Text>
          <Text style={styles.meta}>
            {item.points} · {item.time}
          </Text>
          <Text style={styles.location}>{item.location}</Text>
        </View>
      </View>

      {/* Post Image */}
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.postImage} />
        <View
          style={[
            styles.tag,
            { backgroundColor: tagColors[item.tag] || "gray" },
          ]}
        >
          <Text style={styles.tagText}>{item.tag}</Text>
        </View>
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionBtn}>
          <Ionicons name="heart-outline" size={22} color="#333" />
          <Text style={styles.actionText}>{item.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn}>
          <Ionicons name="chatbubble-outline" size={22} color="#333" />
          <Text style={styles.actionText}>{item.comments}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn}>
          <Ionicons name="share-social-outline" size={22} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressBox}>
        <View style={styles.progressBarBackground}>
          <View
            style={[
              styles.progressBarFill,
              { width: `${item.progress}%` },
            ]}
          />
        </View>
        <Text style={styles.progressText}>
          Resolution Progress {item.progress}%
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

      {/* Posts List */}
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      />
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
  actions: {
    flexDirection: "row",
    marginTop: 8,
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  actionText: {
    marginLeft: 5,
    fontSize: 14,
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
