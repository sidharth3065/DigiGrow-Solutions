import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { useAuthStore } from './src/store/authStore';
import { ResponsiveFlex } from './src/components/ResponsiveFlex';
import { ThreeDBackground } from './src/components/ThreeDBackground';

export default function App() {
  const { checkAuth } = useAuthStore();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      await checkAuth();
      setIsReady(true);
    };
    void init();
  }, [checkAuth]);

  if (!isReady) return null; // Can render a splash screen here

  return (
    <SafeAreaProvider>
      <ResponsiveFlex>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
        <ThreeDBackground />
        <StatusBar style="light" />
      </ResponsiveFlex>
    </SafeAreaProvider>
  );
}
