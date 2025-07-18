import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import DashboardScreen from '../screens/main/DashboardScreen';
import AdvanceRequestScreen from '../screens/main/AdvanceRequestScreen';
import StationFinderScreen from '../screens/main/StationFinderScreen';
import TransactionHistoryScreen from '../screens/main/TransactionHistoryScreen';
import ProfileScreen from '../screens/main/ProfileScreen';
import PaymentScreen from '../screens/main/PaymentScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Dashboard') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Advance') {
            iconName = focused ? 'card' : 'card-outline';
          } else if (route.name === 'Stations') {
            iconName = focused ? 'location' : 'location-outline';
          } else if (route.name === 'History') {
            iconName = focused ? 'time' : 'time-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else {
            iconName = 'help-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2196f3',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Advance" component={AdvanceRequestScreen} />
      <Tab.Screen name="Stations" component={StationFinderScreen} />
      <Tab.Screen name="History" component={TransactionHistoryScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function MainNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Main" 
        component={TabNavigator} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Payment" 
        component={PaymentScreen}
        options={{ title: 'Payment' }}
      />
    </Stack.Navigator>
  );
}
