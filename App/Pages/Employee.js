import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Platform,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";

const Employee = ({ navigation }) => {
  const [isPhoneLogin, setIsPhoneLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);
  const [open, setOpen] = useState(false);
  const [department, setDepartment] = useState(null);
  const [items, setItems] = useState([
    { label: "Water", value: "water" },
    { label: "Electricity", value: "electricity" },
    { label: "Sewage", value: "sewage" },
    { label: "Garbage", value: "garbage" },
  ]);

  const handleLogin = async () => {
    try {
      if (
        (isPhoneLogin && !phone) ||
        (!isPhoneLogin && !email) ||
        !password ||
        !department
      ) {
        Alert.alert("Error", "All fields are required");
        return;
      }

      const payload = isPhoneLogin
        ? { phone, password, department }
        : { email, password, department };

      const response = await fetch(
        "https://web-production-ff28.up.railway.app/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();

      if (result.success) {
        navigation.navigate("EmployeeHome");
      } else {
        Alert.alert("Login Failed", result.message || "Invalid credentials");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Something went wrong");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ImageBackground
          source={require("../assets/bg.jpeg")}
          style={styles.background}
          resizeMode="cover"
        >
          <View style={styles.container}>
            <Text style={styles.title}>Get started now</Text>
            <Text style={styles.subtitle}>Login access to your account</Text>

            {/* Toggle Tabs */}
            <View style={styles.tabContainer}>
              <TouchableOpacity
                style={[styles.tab, !isPhoneLogin && styles.activeTab]}
                onPress={() => setIsPhoneLogin(false)}
              >
                <Text
                  style={!isPhoneLogin ? styles.activeText : styles.inactiveText}
                >
                  Email
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tab, isPhoneLogin && styles.activeTab]}
                onPress={() => setIsPhoneLogin(true)}
              >
                <Text
                  style={isPhoneLogin ? styles.activeText : styles.inactiveText}
                >
                  Phone Number
                </Text>
              </TouchableOpacity>
            </View>

            {/* Input Fields */}
            {isPhoneLogin ? (
              <TextInput
                style={styles.input}
                placeholder="+91 9876543210"
                placeholderTextColor="#888"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
            ) : (
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#888"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            )}

            {/* Password Input */}
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Password"
                placeholderTextColor="#888"
                secureTextEntry={secureText}
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
                textAlignVertical={Platform.OS === "android" ? "center" : "auto"}
              />
              <TouchableOpacity onPress={() => setSecureText(!secureText)}>
                <Text style={styles.showText}>
                  {secureText ? "Show" : "Hide"}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Department Dropdown */}
            <DropDownPicker
              open={open}
              value={department}
              items={items}
              setOpen={setOpen}
              setValue={setDepartment}
              setItems={setItems}
              placeholder="Select Department"
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
              zIndex={1000}
              zIndexInverse={3000}
            />

            {/* Login Button */}
            <TouchableOpacity
              style={styles.loginButton}
              onPress={()=>navigation.navigate('EmployeeDashboard')}
            >
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>

            {/* Forgot Password */}
            <TouchableOpacity>
              <Text style={styles.forgotPassword}>Forgot your password?</Text>
            </TouchableOpacity>

            {/* Don't have an account */}
            <TouchableOpacity onPress={() => navigation.navigate("EmployeeRegister")}>
              <Text style={styles.registerText}>Don’t have an account?</Text>
            </TouchableOpacity>

            {/* Or sign in with */}
            <Text style={styles.orText}>Or sign in with</Text>

            {/* Social Buttons */}
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
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1, justifyContent: "center" },
  container: {
    padding: 20,
    backgroundColor: "rgba(255,255,255,0.8)",
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 15,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "green",
    borderRadius: 25,
    overflow: "hidden",
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "white",
  },
  activeTab: { backgroundColor: "#001F54" },
  activeText: { color: "white", fontWeight: "600" },
  inactiveText: { color: "#666", fontWeight: "600" },
  input: {
    borderWidth: 1,
    borderColor: "green",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15,
    backgroundColor: "white",
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "green",
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 15,
    backgroundColor: "white",
  },
  passwordInput: { flex: 1, height: "100%", fontSize: 16 },
  showText: {
    color: "#1A2B76",
    fontWeight: "600",
    paddingLeft: 12,
    paddingVertical: 6,
  },
  dropdown: {
    borderColor: "green",
    borderRadius: 25,
    marginBottom: 15,
    zIndex: 1000,
    elevation: 5,
  },
  dropdownContainer: {
    borderColor: "green",
    zIndex: 1000,
    elevation: 5,
  },
  loginButton: {
    backgroundColor: "#001F54",
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 10,
  },
  loginText: { color: "white", fontSize: 16, fontWeight: "bold" },
  forgotPassword: {
    color: "green",
    textAlign: "center",
    marginBottom: 10,
  },
  registerText: {
    color: "#001F54",
    textAlign: "center",
    marginBottom: 13,
    fontWeight: "600",
  },
  orText: { textAlign: "center", color: "#666", marginBottom: 10 },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 15,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 25,
    backgroundColor: "white",
  },
  socialText: { fontSize: 14, marginLeft: 5},
});

export default Employee;
