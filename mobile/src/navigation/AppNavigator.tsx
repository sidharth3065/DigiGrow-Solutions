import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuthStore } from '../store/authStore';
import { LayoutDashboard, Receipt } from 'lucide-react-native';

// Screens
import LoginScreen from '../screens/auth/LoginScreen';
import DashboardScreen from '../screens/client/DashboardScreen';
import InvoicesScreen from '../screens/client/InvoicesScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function ClientTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: '#0B0F1A' },
        headerTintColor: '#fff',
        tabBarStyle: {
          backgroundColor: '#0B0F1A',
          borderTopColor: '#2A3050',
          paddingBottom: 5,
        },
        tabBarActiveTintColor: '#00D2FF',
        tabBarInactiveTintColor: '#7B83A1',
      }}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardScreen} 
        options={{
          tabBarIcon: ({ color, size }) => <LayoutDashboard color={color} size={size} />
        }}
      />
      <Tab.Screen 
        name="Invoices" 
        component={InvoicesScreen} 
        options={{
          tabBarIcon: ({ color, size }) => <Receipt color={color} size={size} />
        }}
      />
      {/* 
      <Tab.Screen 
        name="Messages" 
        component={MessagesScreen} 
        options={{
          tabBarIcon: ({ color, size }) => <MessageSquare color={color} size={size} />
        }}
      /> 
      */}
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const { isAuthenticated } = useAuthStore();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        <Stack.Screen name="Login" component={LoginScreen} />
      ) : (
        <>
          {/* We assume mostly CLIENTs use the mobile app for now */}
          <Stack.Screen name="ClientPortal" component={ClientTabs} />
        </>
      )}
    </Stack.Navigator>
  );
}
