import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  useWindowDimensions,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, FontAwesome5, MaterialIcons } from "@expo/vector-icons";

const Dashboard = () => {
  const { width } = useWindowDimensions();
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const cardWidth = (width - 60) / 2;

  const categories = [
    { title: "Road Issues", count: 23, color: "#ffe5e5", icon: "warning", textColor: "red" },
    { title: "Street Lighting", count: 15, color: "#fff9db", icon: "lightbulb", textColor: "#e6b800" },
    { title: "Waste Management", count: 18, color: "#e6ffe6", icon: "delete", textColor: "green" },
    { title: "Vandalism", count: 8, color: "#f5e6ff", icon: "spray-can", textColor: "purple", fontFamily: "FontAwesome5" },
    { title: "Parks & Trees", count: 12, color: "#e6fff7", icon: "park", textColor: "teal" },
    { title: "Infrastructure", count: 9, color: "#e6ecff", icon: "build", textColor: "navy" },
  ];

  const slides = [
    { id: "1", text: "Pothole on Broadway Street", status: "In Progress" },
    { id: "2", text: "Broken Streetlight near Park", status: "Pending" },
    { id: "3", text: "Overflowing Trash Bin at 5th Ave", status: "Resolved" },
  ];

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      flatListRef.current.scrollToIndex({ index: currentIndex - 1 });
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.points}>⭐ 156</Text>
          <View style={styles.avatar}>
            <Text style={{ color: "#fff", fontWeight: "bold" }}>S</Text>
          </View>
        </View>

        <Text style={styles.welcome}>Welcome back Paresh !</Text>
        <Text style={styles.subtitle}>Help make your community better</Text>

        {/* City Map */}
        <View style={styles.mapCard}>
          <Image
            source={{ uri: "https://via.placeholder.com/600x300.png?text=City+Map" }}
            style={styles.mapImage}
            resizeMode="cover"
          />
          <Text style={styles.mapText}>City Map</Text>
        </View>

        {/* Current Issues Carousel */}
        <Text style={styles.sectionTitle}>Current Issues</Text>
        <View style={styles.carouselContainer}>
          <TouchableOpacity onPress={handlePrev} disabled={currentIndex === 0}>
            <Ionicons name="chevron-back-circle" size={32} color={currentIndex === 0 ? "gray" : "black"} />
          </TouchableOpacity>

          <FlatList
            ref={flatListRef}
            data={slides}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={[styles.issueCard, { width: width * 0.75 }]}>
                <Text style={styles.issueText}>{item.text}</Text>
                <Text style={styles.issueStatus}>{item.status}</Text>
              </View>
            )}
          />

          <TouchableOpacity onPress={handleNext} disabled={currentIndex === slides.length - 1}>
            <Ionicons name="chevron-forward-circle" size={32} color={currentIndex === slides.length - 1 ? "gray" : "black"} />
          </TouchableOpacity>
        </View>

        {/* Categories */}
        <Text style={styles.sectionTitle}>Report by Category</Text>
        <View style={styles.grid}>
          {categories.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.card, { backgroundColor: item.color, width: cardWidth }]}
              activeOpacity={0.8}
            >
              {item.fontFamily === "FontAwesome5" ? (
                <FontAwesome5 name={item.icon} size={24} color={item.textColor} />
              ) : (
                <MaterialIcons name={item.icon} size={24} color={item.textColor} />
              )}
              <Text style={[styles.cardTitle, { color: item.textColor }]}>{item.title}</Text>
              <Text style={styles.count}>{item.count}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Report Button */}
        <TouchableOpacity style={styles.reportBtn}>
          <Ionicons name="camera" size={20} color="#fff" />
          <Text style={styles.reportText}>Report New Issue</Text>
        </TouchableOpacity>
        <Text style={styles.footer}>Help improve your community</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9", padding: 15 },
  header: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
  points: { fontSize: 16, fontWeight: "600" },
  avatar: {
    backgroundColor: "#000080",
    borderRadius: 20,
    width: 35,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  welcome: { fontSize: 20, fontWeight: "bold", marginTop: 10 },
  subtitle: { fontSize: 14, color: "gray", marginBottom: 15 },
  mapCard: { borderRadius: 12, overflow: "hidden", marginBottom: 15, backgroundColor: "#ddd" },
  mapImage: { width: "100%", aspectRatio: 2 },
  mapText: { position: "absolute", bottom: 10, left: 10, color: "#fff", fontWeight: "bold" },
  carouselContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  issueCard: {
    backgroundColor: "#eef5f9",
    padding: 15,
    borderRadius: 12,
    marginHorizontal: 10,
    alignItems: "center",
  },
  issueText: { fontSize: 16, fontWeight: "600" },
  issueStatus: {
    marginTop: 5,
    backgroundColor: "#d6eaff",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
    fontSize: 12,
  },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  card: { padding: 15, borderRadius: 12, marginBottom: 15, alignItems: "center" },
  cardTitle: { fontSize: 15, fontWeight: "600", marginTop: 5, textAlign: "center" },
  count: {
    marginTop: 5,
    fontSize: 14,
    backgroundColor: "#eee",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  reportBtn: {
    flexDirection: "row",
    backgroundColor: "green",
    borderRadius: 12,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30,
  },
  reportText: { color: "#fff", fontWeight: "600", marginLeft: 8 },
  footer: { textAlign: "center", marginTop: 5, color: "gray" },
});
