import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Login = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.txt}>Login page</Text>
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
  txt: {
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
  },
});

export default Login;
