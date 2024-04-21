import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import PlanScreen from './Plan';
import SaveScreen from './Save';
import ProfileScreen from './Profile';
// import { Feather } from '@expo/vector-icons';
// import { Octicons } from '@expo/vector-icons';
// import { FontAwesome6 } from '@expo/vector-icons';
import { View } from 'react-native';

const Tab = createBottomTabNavigator();

const MainScreen = () => {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator screenOptions={{tabBarStyle:{backgroundColor:"#545353"}}}>
        <Tab.Screen name="Plan" component={PlanScreen} options={{headerShown: false, 
        tabBarStyle:{backgroundColor:"#ededed", borderTopColor: "#121212", borderTopWidth: 1},
        tabBarLabelStyle:{color:"#000", marginBottom: "-5%"},
        tabBarIconStyle:{marginBottom: "-5%"}
        }} />
        <Tab.Screen name="Save" component={SaveScreen} options={{headerShown: false, 
        tabBarStyle:{backgroundColor:"#ededed", borderTopColor: "#121212", borderTopWidth: 1},
        tabBarLabelStyle:{color:"#000", marginBottom: "-5%"},
        tabBarIconStyle:{marginBottom: "-5%"}
        }} />
        <Tab.Screen name="Profile" component={ProfileScreen} options={{headerShown: false, 
        tabBarStyle:{backgroundColor:"#ededed", borderTopColor: "#121212", borderTopWidth: 1},
        tabBarLabelStyle:{color:"#000", marginBottom: "-5%"},
        tabBarIconStyle:{marginBottom: "-5%"}
        }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MainScreen;
