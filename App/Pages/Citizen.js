import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Platform,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const Citizen = ({navigation}) => {
  const [isPhoneLogin, setIsPhoneLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);

  const handleLogin = async () => {
    try {
      // Choose payload based on toggle
      const payload = isPhoneLogin
        ? { phone, password }
        : { email, password };

      const response = await fetch("https://server1-production-7ec8.up.railway.app/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(payload),
        
        
        
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Login Successful", JSON.stringify(data));
        // Navigate to next screen here if using react-navigation
      } else {
        Alert.alert("Login Failed", data.message || "Invalid credentials");
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };






  return (
    <ImageBackground
      source={require("../assets/bg.jpeg")} // <-- add your background image here
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
            <Text style={!isPhoneLogin ? styles.activeText : styles.inactiveText}>
              Email
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, isPhoneLogin && styles.activeTab]}
            onPress={() => setIsPhoneLogin(true)}
          >
            <Text style={isPhoneLogin ? styles.activeText : styles.inactiveText}>
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

        {/* Password Input (fixed alignment) */}
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            placeholderTextColor="#888"
            secureTextEntry={secureText}
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
            // Android needs this to vertically center placeholder/text
            textAlignVertical={Platform.OS === "android" ? "center" : "auto"}
          />
          <TouchableOpacity onPress={() => setSecureText(!secureText)}>
            <Text style={styles.showText}>{secureText ? "Show" : "Hide"}</Text>
          </TouchableOpacity>
        </View>

        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton} onPress={() => {navigation.navigate('CitizenHome');handleLogin;}}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        {/* Forgot Password */}
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot your password?</Text>
        </TouchableOpacity>

        {/* Or sign in with */}
        <Text style={styles.orText}>Or sign in with</Text>

        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <FontAwesome name="google" size={20} />
            <Text style={styles.socialText}> Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <FontAwesome name="facebook" size={20} />
            <Text style={styles.socialText}> Facebook</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    padding: 20,
    backgroundColor: "rgba(255,255,255,0.8)",
    margin: 20,
    borderRadius: 15,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
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
  activeTab: {
    backgroundColor: "#001F54",
  },
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

  /* Password container improvements: fixed height + centered children */
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center", // vertical center
    borderWidth: 1,
    borderColor: "green",
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 50, // fixed height for consistent vertical alignment
    marginBottom: 15,
    backgroundColor: "white",
  },
  passwordInput: {
    flex: 1,
    height: "100%", // fill the container height so placeholder is vertically centered
    padding: 0, // remove extra vertical padding (handled by container height)
    margin: 0,
    fontSize: 16,
  },
  showText: {
    color: "#1A2B76",
    fontWeight: "600",
    paddingLeft: 12,
    paddingVertical: 6,
  },
  loginButton: {
    backgroundColor: "#001F54",
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 10,
  },
  loginText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  forgotPassword: {
    color: "green",
    textAlign: "center",
    marginBottom: 20,
  },
  orText: {
    textAlign: "center",
    color: "#666",
    marginBottom: 10,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 25,
    backgroundColor: "white",
  },
  socialText: {
    fontSize: 14,
    marginLeft: 5,
  },
});

export default Citizen;
