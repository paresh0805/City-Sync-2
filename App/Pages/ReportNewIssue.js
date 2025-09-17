import React, { useState } from "react";
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
import { Picker } from "@react-native-picker/picker";

export default function ReportNewIssue() {
  const [image, setImage] = useState(null);
  const [issueType, setIssueType] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");

  // Open Camera
  const openCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: [ImagePicker.MediaType.IMAGE],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // Submit report
  const handleSubmit = () => {
    console.log({
      issueType,
      description,
      priority,
      image,
    });
    alert("Report Submitted!");
  };

  return (
    <ScrollView style={styles.container}>
        <View style={styles.toptxt}>
            <Text style={styles.newreport}>New Report</Text>
        </View>
      {/* Location */}
      <View style={styles.locationBox}>
        <Text style={styles.locationTitle}>📍 Current Location</Text>
        <Text style={styles.locationText}>123 Main Street, Downtown</Text>
      </View>

      {/* Add Photo */}
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

      {/* Issue Type */}
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

      {/* Description */}
      <Text style={styles.sectionTitle}>Description</Text>
      <TextInput
        style={styles.input}
        placeholder="Describe the issue in detail..."
        value={description}
        onChangeText={setDescription}
        multiline
      />

      {/* Priority */}
      <Text style={styles.sectionTitle}>Priority Level</Text>
      <View style={styles.priorityBox}>
        {["Low", "Medium", "High"].map((level) => (
          <TouchableOpacity
            key={level}
            style={[
              styles.priorityBtn,
              priority === level && styles.prioritySelected,
              level === "Low"
                ? { borderColor: "green" }
                : level === "Medium"
                ? { borderColor: "orange" }
                : { borderColor: "red" },
            ]}
            onPress={() => setPriority(level)}
          >
            <Text style={styles.priorityText}>{level}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Submit Button */}
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
    paddingTop:60,
  },
  toptxt:{
    flex:1,
    alignItems:"center",
    marginBottom:10,
  },
  newreport:{
    fontSize:20,
    fontWeight:"bold",
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

  priorityBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  priorityBtn: {
    flex: 1,
    padding: 10,
    borderWidth: 2,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
  },
  prioritySelected: { backgroundColor: "#eee" },
  priorityText: { fontWeight: "bold" },

  submitBtn: {
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 30,
  },
  submitText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
