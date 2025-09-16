import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './App/Pages/Login.js';
import Employee from './App/Pages/Employee.js';
import Citizen from './App/Pages/Citizen.js';
import CitizenHome from './App/Pages/CitizenHome.js';
import EmployeeHome from './App/Pages/EmployeeHome.js';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown:false}}>
        <Stack.Screen name="Home" component={Login} />
        <Stack.Screen name="EmployeeLogin" component={Employee} />
        <Stack.Screen name="CitizenLogin" component={Citizen} />
        <Stack.Screen name="CitizenHome" component={CitizenHome} />
        <Stack.Screen name="EmployeeHome" component={EmployeeHome} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
