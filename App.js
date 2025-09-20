import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './App/Pages/Login.js';
import Employee from './App/Pages/Employee.js';
import Citizen from './App/Pages/Citizen.js';
import CitizenHome from './App/Pages/CitizenHome.js';
import EmployeeHome from './App/Pages/EmployeeHome.js';
import ReportNewIssue from './App/Pages/ReportNewIssue.js';
import RoadIssues from './App/Pages/RoadIssues.js';
import StreetLightingIssues from './App/Pages/StreetLightingIssues.js';
import WasteIssues from './App/Pages/WasteIssues.js';
import SpecificIssueEmployee from './App/Pages/SpecificIssueEmployee.js';
import EmployeeDashboard from './App/Pages/EmployeeDashboard.js';
import EmployeeReport from './App/Pages/EmployeeReport.js';
import Leaderboard from './App/Pages/Leaderboard.js';
import CitizenRegister from './App/Pages/CitizenRegister.js';
import EmployeeRegister from './App/Pages/EmployeeRegister.js';


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
        <Stack.Screen name="ReportNewIssue" component={ReportNewIssue} />
        <Stack.Screen name="RoadIssues" component={RoadIssues} />
        <Stack.Screen name="WasteIssues" component={WasteIssues} />
        <Stack.Screen name="StreetLightingIssues" component={StreetLightingIssues} />
        <Stack.Screen name="SpecificIssueEmployee" component={SpecificIssueEmployee} />
        <Stack.Screen name="EmployeeDashboard" component={EmployeeDashboard} />
        <Stack.Screen name="EmployeeReport" component={EmployeeReport} />
        <Stack.Screen name="Leaderboard" component={Leaderboard} />
        <Stack.Screen name="EmployeeRegister" component={EmployeeRegister} />
        <Stack.Screen name="CitizenRegister" component={CitizenRegister} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;