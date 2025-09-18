import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { Picker } from "@react-native-picker/picker";

export default function ReportNewIssue() {
  const [image, setImage] = useState(null);
  const [issueType, setIssueType] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState(null);

  // 📍 Get real-time location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      let address = await Location.reverseGeocodeAsync(loc.coords);

      if (address.length > 0) {
        const place = address[0];
        setLocation(
          `${place.name || ""} ${place.street || ""}, ${place.city || ""}`
        );
      } else {
        setLocation(`${loc.coords.latitude}, ${loc.coords.longitude}`);
      }
    })();
  }, []);

  // 📸 Open Camera
  const openCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Camera permission is required!");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // 🚀 Submit Report to backend
  const handleSubmit = async () => {
    if (!issueType || !description || !location || !image) {
      alert("Please fill all fields and add an image!");
      return;
    }

    let formData = new FormData();
    formData.append("description", description);
    formData.append("location", location);
    formData.append("citizenId", "12345"); // 🔹 Replace with actual logged-in user ID
    formData.append("issueType", issueType);

    formData.append("image", {
      uri: image,
      name: "report.jpg",
      type: "image/jpeg",
    });

    try {
      const response = await fetch(
        "https://web-production-ff28.up.railway.app/issue",
        {
          method: "POST",
          body: formData,
        }
      );

      const text = await response.text();
      console.log("📩 Raw server response:", text);

      let data;
      try {
        data = JSON.parse(text);
      } catch (err) {
        throw new Error("Server did not return JSON");
      }

      if (response.ok && data.success) {
        alert("✅ Issue reported successfully!");
        console.log("Server response:", data);

        // Clear form
        setIssueType("");
        setDescription("");
        setImage(null);
      } else {
        alert("❌ Failed: " + (data.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error submitting report:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.toptxt}>
        <Text style={styles.newreport}>New Report</Text>
      </View>

      {/* 📍 Location */}
      <View style={styles.locationBox}>
        <Text style={styles.locationTitle}>📍 Current Location</Text>
        <Text style={styles.locationText}>
          {location ? location : "Fetching location..."}
        </Text>
      </View>

      {/* 📸 Add Photo */}
      <View style={styles.photoBox}>
        <Text style={styles.sectionTitle}>Add Photo</Text>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Text style={styles.placeholder}>Take a photo of the issue</Text>
        )}
        <TouchableOpacity style={styles.cameraBtn} onPress={openCamera}>
          <Text style={styles.cameraBtnText}>Open Camera</Text>
        </TouchableOpacity>
      </View>

      {/* 🏷 Issue Type */}
      <Text style={styles.sectionTitle}>Issue Type</Text>
      <View style={styles.dropdown}>
        <Picker
          selectedValue={issueType}
          onValueChange={(itemValue) => setIssueType(itemValue)}
        >
          <Picker.Item label="Select issue category" value="" />
          <Picker.Item label="Pothole" value="Pothole" />
          <Picker.Item label="Broken Streetlight" value="Broken Streetlight" />
          <Picker.Item label="Overflowing Trash" value="Overflowing Trash" />
          <Picker.Item label="Graffiti" value="Graffiti" />
          <Picker.Item label="Sidewalk Issue" value="Sidewalk Issue" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
      </View>

      {/* 📝 Description */}
      <Text style={styles.sectionTitle}>Description</Text>
      <TextInput
        style={styles.input}
        placeholder="Describe the issue in detail..."
        value={description}
        onChangeText={setDescription}
        multiline
      />

      {/* 🚀 Submit Button */}
      <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit Report</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    paddingTop: 60,
  },
  toptxt: {
    flex: 1,
    alignItems: "center",
    marginBottom: 10,
  },
  newreport: {
    fontSize: 20,
    fontWeight: "bold",
  },
  locationBox: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
    marginBottom: 16,
  },
  locationTitle: { fontWeight: "bold", fontSize: 16 },
  locationText: { fontSize: 14, color: "gray" },

  photoBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 6,
  },
  placeholder: {
    fontSize: 14,
    color: "gray",
    marginVertical: 8,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginVertical: 8,
  },
  cameraBtn: {
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 8,
    marginTop: 8,
  },
  cameraBtnText: { color: "#fff" },

  dropdown: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 16,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    minHeight: 80,
    textAlignVertical: "top",
  },

  submitBtn: {
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 30,
  },
  submitText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
