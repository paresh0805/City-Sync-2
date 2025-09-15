import React from 'react';
import { View, Text, StyleSheet, ImageBackground,Button,TouchableOpacity,Alert } from 'react-native';

const Login = () => {
   const handlePress = () => {
    Alert.alert("Button Pressed!", "You clicked the button.");
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/bg.jpeg')} 
        style={styles.bgImage}
        blurRadius={3}
      />
      <View style={styles.textContainer}>
      <Text style={styles.topsub}>Login </Text>
      
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText} onPress={handlePress}>   Citizen/नागरिक   </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} >
          <Text style={styles.buttonText} onPress={handlePress}>Employee/कर्मचारी</Text>
        </TouchableOpacity>
      </View>
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
    position: 'absolute', // makes it behave like a background
  },
  textContainer:{
    marginTop: 40, // pushes both texts down together
    marginBottom:60,
    alignItems: 'center',

  },
  top:{
  color: "#000",
    fontSize: 35,
    fontWeight: "bold",
  },
  topsub:{
    color: "#fff",
    fontSize: 20,
    marginTop: 20, // space between City Sync & You are a
    fontWeight:"bold",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#fff", // White button
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25, // Rounded edges
    borderWidth: 1.5,           // 🔹 added border width
    borderColor: "#1A237E",   // 🔹 same as text color
    elevation:50,
  },
  buttonText: {
    color: "#1A237E", // Blue text
    fontSize: 18,
    fontWeight: "bold",
    paddingLeft:35,
    paddingRight:35,
  },
  bottomTxt:{
  position: "absolute",
  bottom: 35,          // distance from bottom of the screen
  color: "#fff",       // make it visible on bg
  fontSize: 14,
  fontWeight: "600",
  },
  
});

export default Login;
