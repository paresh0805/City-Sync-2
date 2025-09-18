import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const EmployeeDashboard = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Employee Dashboard</Text>

      <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('EmployeeHome')}>
        <Text style={styles.buttonText}>Vansh</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#000",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default EmployeeDashboard;
