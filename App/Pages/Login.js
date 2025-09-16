import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Alert, Image } from 'react-native';

const Login = ({navigation}) => {
  const handlePress = (role) => {
    Alert.alert("Selected Role", `You chose: ${role}`);
  };

  return (
    <View style={styles.container}>
      {/* Background */}
      <ImageBackground
        source={require('../assets/bg.jpeg')} 
        style={styles.bgImage}
        blurRadius={1} // slight blur for a softer background
      />

      {/* Logo */}
      <Image 
        source={require('../assets/logo.png')} 
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Translucent card */}
      <View style={styles.card}>
        <Text style={styles.topsub}>Login as</Text>

        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('CitizenLogin')}
        >
          <Text style={styles.buttonText}>Citizen / नागरिक</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('EmployeeLogin')}
        >
          <Text style={styles.buttonText}>Employee / कर्मचारी</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <Text style={styles.bottomTxt}>powered by GenEva</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,                  
    justifyContent: 'center',  
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  bgImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  logo: {
    width: 200,
    height: 200,
    marginTop: -220,  // pull logo upward
    marginBottom: 50, // space between logo & card
  },
  topsub: {
    color: "#000",
    fontSize: 22,
    marginTop: 10,
    marginBottom: 20,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
    borderRadius: 20,
    paddingVertical: 25,
    paddingHorizontal: 30,
    alignItems: 'center',

    // Shadow
    elevation: 0, 
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,

    // Border
    borderWidth: 1.5,
    borderColor: "#1A237E",
  },
  button: {
    marginTop: 15,
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    borderWidth: 1.5,
    borderColor: "#1A237E",
    width: 220,
    alignItems: "center",

    // Shadow
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  buttonText: {
    color: "#1A237E",
    fontSize: 18,
    fontWeight: "bold",
  },
  bottomTxt: {
    position: "absolute",
    bottom: 50,
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },
});

export default Login;
