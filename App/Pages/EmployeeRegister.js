import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import { BlurView } from "expo-blur";

const EmployeeRegister = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Dropdown state
  const [open, setOpen] = useState(false);
  const [department, setDepartment] = useState(null);
  const [items, setItems] = useState([
    { label: "Water", value: "water" },
    { label: "Electricity", value: "electricity" },
    { label: "Sewage", value: "sewage" },
    { label: "Garbage", value: "garbage" },
  ]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require("../assets/bg.jpeg")}
        style={styles.background}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          {/* White card with blur */}
          <BlurView intensity={80} tint="light" style={styles.card}>
            <Text style={styles.heading}>Create Account</Text>
            <Text style={styles.subtitle}>Sign up to get started</Text>

            {/* Name */}
            <View style={styles.inputContainer}>
              <FontAwesome
                name="user"
                size={20}
                color="#333"
                style={styles.icon}
              />
              <TextInput
                placeholder="Name"
                placeholderTextColor="#888"
                value={name}
                onChangeText={setName}
                style={styles.input}
              />
            </View>

            {/* Email */}
            <View style={styles.inputContainer}>
              <FontAwesome
                name="envelope"
                size={20}
                color="#333"
                style={styles.icon}
              />
              <TextInput
                placeholder="Email"
                placeholderTextColor="#888"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                autoCapitalize="none"
              />
            </View>

            {/* Password */}
            <View style={styles.inputContainer}>
              <FontAwesome
                name="lock"
                size={20}
                color="#333"
                style={styles.icon}
              />
              <TextInput
                placeholder="Password"
                placeholderTextColor="#888"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
                autoCapitalize="none"
              />
            </View>

            {/* Department Dropdown with briefcase icon */}
            <View style={styles.dropdownContainer}>
              <FontAwesome
                name="briefcase"
                size={20}
                color="#333"
                style={styles.dropdownIcon}
              />
              <DropDownPicker
                open={open}
                value={department}
                items={items}
                setOpen={setOpen}
                setValue={setDepartment}
                setItems={setItems}
                placeholder="Select Department"
                placeholderStyle={{ color: "#888", fontSize: 16 }}
                style={styles.dropdown}
                dropDownContainerStyle={styles.dropDownList}
                listMode="SCROLLVIEW"
                zIndex={1000}
                zIndexInverse={3000}
              />
            </View>

            {/* Sign Up Button */}
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("EmployeeDashboard")}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            {/* Social Login */}
            <Text style={styles.orText}>Or sign up with</Text>
            <View style={styles.socialContainer}>
              <TouchableOpacity
                style={[styles.socialButton, { borderColor: "#DB4437" }]}
              >
                <FontAwesome name="google" size={20} color="#DB4437" />
                <Text style={styles.socialText}> Google</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.socialButton, { borderColor: "#4267B2" }]}
              >
                <FontAwesome name="facebook" size={20} color="#4267B2" />
                <Text style={styles.socialText}> Facebook</Text>
              </TouchableOpacity>
            </View>

            {/* Already have an account */}
            <TouchableOpacity
              onPress={() => navigation.navigate("EmployeeLogin")}
              style={{ marginTop: 15 }}
            >
              <Text style={styles.loginRedirect}>
                Already have an account? Login
              </Text>
            </TouchableOpacity>
          </BlurView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1, resizeMode: "cover" },
  container: { flex: 1, justifyContent: "center", paddingHorizontal: 10 },
  card: {
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 20,
    marginHorizontal: 5,
    padding: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  heading: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
    color: "#001F54",
  },
  subtitle: { fontSize: 14, color: "#666", textAlign: "center", marginBottom: 20 },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "green",
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 15,
    height: 50,
  },
  icon: { marginRight: 10, alignSelf: "center" },
  input: { flex: 1, height: "100%", fontSize: 16 },
  dropdownContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "green",
    borderRadius: 25,
    marginBottom: 15,
    backgroundColor: "white",
    height: 50,
    paddingHorizontal: 20,
    paddingRight:40,
  },
  dropdownIcon: { marginRight: 10 },
  dropdown: {
    flex: 1,
    borderWidth: 0,
    height: "100%",
    backgroundColor: "transparent",
  },
  dropDownList: {
    borderColor: "green",
    borderRadius: 15,
    marginTop: Platform.OS === "android" ? -10 : 0,
  },
  button: {
    backgroundColor: "#001F54",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  orText: { textAlign: "center", color: "#666", marginVertical: 10 },
  socialContainer: { flexDirection: "row", justifyContent: "space-evenly", marginBottom: 15 },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 25,
    backgroundColor: "white",
  },
  socialText: { fontSize: 14, marginLeft: 5 },
  loginRedirect: { color: "green", textAlign: "center", fontWeight: "600" },
});

export default EmployeeRegister;
