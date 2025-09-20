import React, { useRef, useState, useEffect } from "react";
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
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import MapView, { Marker, Heatmap } from "react-native-maps";
import * as Location from "expo-location";

const CitizenHome = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pendingIssues, setPendingIssues] = useState([]);
  const [location, setLocation] = useState(null);

  const cardWidth = (width - 60) / 2;

  // ------------------ Fetch pending issues ------------------
  const fetchPendingIssues = async () => {
    try {
      const response = await fetch("https://backend-production-e436.up.railway.app/issue");
      const data = await response.json();
      if (data.success) {
        const pending = data.issues.filter((issue) => issue.status === "pending");
        setPendingIssues(pending);
      } else {
        setPendingIssues([]);
      }
    } catch (err) {
      console.error("Error fetching pending issues:", err);
      setPendingIssues([]);
    }
  };

  // ------------------ Get live location ------------------
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    })();
  }, []);

  useEffect(() => {
    fetchPendingIssues();
  }, []);

  // ------------------ Auto carousel ------------------
  useEffect(() => {
    if (pendingIssues.length === 0) return;
    const interval = setInterval(() => {
      const nextIndex = currentIndex < pendingIssues.length - 1 ? currentIndex + 1 : 0;
      setCurrentIndex(nextIndex);
      flatListRef.current.scrollToIndex({ index: nextIndex });
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex, pendingIssues]);

  const handleNext = () => {
    if (currentIndex < pendingIssues.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      flatListRef.current.scrollToIndex({ index: nextIndex });
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      flatListRef.current.scrollToIndex({ index: prevIndex });
    }
  };

  // ------------------ Heatmap Issues ------------------
  const issues = [
    { latitude: 30.7333, longitude: 76.7794, weight: 1 },
    { latitude: 30.734, longitude: 76.782, weight: 1 },
    { latitude: 30.7355, longitude: 76.784, weight: 1 },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={require("../assets/homelogo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <View style={styles.rightSection}>
            {/* ⭐ Points as Clickable Button */}
            <TouchableOpacity onPress={() => navigation.navigate('Leaderboard')}>
              <Text style={styles.points}>⭐ 156</Text>
            </TouchableOpacity>

            <View style={styles.avatar}>
              <Text style={{ color: "#fff", fontWeight: "bold" }}>S</Text>
            </View>
          </View>
        </View>

        <Text style={styles.welcome}>Welcome back Paresh !</Text>
        <Text style={styles.subtitle}>Help make your community better</Text>

        {/* Map Section */}
        <View style={styles.mapCard}>
          {location ? (
            <>
              <MapView
                style={styles.mapImage}
                initialRegion={{
                  latitude: 30.7333,
                  longitude: 76.7794,
                  latitudeDelta: 0.05,
                  longitudeDelta: 0.05,
                }}
                showsUserLocation={true}
              >
                <Marker
                  coordinate={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                  }}
                  title="You are here"
                />
                <Heatmap
                  points={issues}
                  opacity={0.7}
                  radius={50}
                  gradient={{
                    colors: ["green", "yellow", "red"],
                    startPoints: [0.1, 0.5, 1],
                    colorMapSize: 256,
                  }}
                />
              </MapView>
              <Text style={styles.mapText}>City Map</Text>
            </>
          ) : (
            <Text style={{ padding: 20, textAlign: "center" }}>
              Loading map...
            </Text>
          )}
        </View>

        {/* Current Issues Carousel */}
        <Text style={styles.sectionTitle}>Current Issues</Text>
        <View style={styles.carouselContainer}>
          <TouchableOpacity onPress={handlePrev} disabled={currentIndex === 0}>
            <Ionicons
              name="chevron-back-circle"
              size={32}
              color={currentIndex === 0 ? "gray" : "black"}
            />
          </TouchableOpacity>

          <FlatList
            ref={flatListRef}
            data={pendingIssues}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={[styles.issueCard, { width: width * 0.75 }]}>
                <Text style={styles.issueText}>{item.description}</Text>
                <Text style={styles.issueStatus}>{item.status}</Text>
                <Text style={{ fontSize: 12, color: "gray" }}>{item.location}</Text>
              </View>
            )}
          />

          <TouchableOpacity
            onPress={handleNext}
            disabled={currentIndex === pendingIssues.length - 1}
          >
            <Ionicons
              name="chevron-forward-circle"
              size={32}
              color={currentIndex === pendingIssues.length - 1 ? "gray" : "black"}
            />
          </TouchableOpacity>
        </View>

        {/* Report Button */}
        <TouchableOpacity
          style={styles.reportBtn}
          onPress={() => navigation.navigate("ReportNewIssue")}
        >
          <Ionicons name="camera" size={20} color="#fff" />
          <Text style={styles.reportText}>Report New Issue</Text>
        </TouchableOpacity>

        {/* Categories Section */}
        <Text style={styles.sectionTitle}>Report by Category</Text>
        <View style={styles.grid}>
          {/* Road Issues */}
          <TouchableOpacity
            style={[styles.card, { backgroundColor: "#ffe5e5", width: cardWidth }]}
            onPress={() => navigation.navigate("RoadIssues")}
          >
            <MaterialIcons name="warning" size={24} color="red" />
            <Text style={[styles.cardTitle, { color: "red" }]}>Road Issues</Text>
          </TouchableOpacity>

          {/* Street Lighting */}
          <TouchableOpacity
            style={[styles.card, { backgroundColor: "#fff9db", width: cardWidth }]}
            onPress={() => navigation.navigate("StreetLightingIssues")}
          >
            <MaterialIcons name="lightbulb" size={24} color="#e6b800" />
            <Text style={[styles.cardTitle, { color: "#e6b800" }]}>
              Street Lighting
            </Text>
          </TouchableOpacity>

          {/* Waste Management */}
          <TouchableOpacity
            style={[styles.card, { backgroundColor: "#e6ffe6", width: cardWidth }]}
            onPress={() => navigation.navigate("WasteIssues")}
          >
            <MaterialIcons name="delete" size={24} color="green" />
            <Text style={[styles.cardTitle, { color: "green" }]}>
              Waste Management
            </Text>
          </TouchableOpacity>

          {/* Vandalism */}
          <TouchableOpacity
            style={[styles.card, { backgroundColor: "#f5e6ff", width: cardWidth }]}
          >
            <FontAwesome5 name="spray-can" size={24} color="purple" />
            <Text style={[styles.cardTitle, { color: "purple" }]}>Vandalism</Text>
          </TouchableOpacity>

          {/* Parks & Trees */}
          <TouchableOpacity
            style={[styles.card, { backgroundColor: "#e6fff7", width: cardWidth }]}
          >
            <MaterialIcons name="park" size={24} color="teal" />
            <Text style={[styles.cardTitle, { color: "teal" }]}>Parks & Trees</Text>
          </TouchableOpacity>

          {/* Infrastructure */}
          <TouchableOpacity
            style={[styles.card, { backgroundColor: "#e6ecff", width: cardWidth }]}
          >
            <MaterialIcons name="build" size={24} color="navy" />
            <Text style={[styles.cardTitle, { color: "navy" }]}>
              Infrastructure
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footer}>Help improve your community</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CitizenHome;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9", padding: 15 },
  header: { flexDirection: "row", marginBottom: 10, alignItems: "center" },
  logo: { width: 70, height: 70, borderRadius: 8 },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
    gap: 10,
  },
  points: { fontSize: 16, fontWeight: "600", marginRight: 4 },
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
  mapCard: {
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 15,
    backgroundColor: "#ddd",
    height: 200,
  },
  mapImage: { width: "100%", height: "100%" },
  mapText: {
    position: "absolute",
    top: 10,
    left: 10,
    color: "#fff",
    fontWeight: "bold",
    backgroundColor: "rgba(0,0,0,0.4)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 5,
  },
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
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 20 },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  card: { padding: 15, borderRadius: 12, marginBottom: 15, alignItems: "center" },
  cardTitle: { fontSize: 15, fontWeight: "600", marginTop: 5, textAlign: "center" },
  reportBtn: {
    flexDirection: "row",
    backgroundColor: "green",
    borderRadius: 12,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  reportText: { color: "#fff", fontWeight: "600", marginLeft: 8 },
  footer: { textAlign: "center", marginTop: 5, color: "gray" },
});
