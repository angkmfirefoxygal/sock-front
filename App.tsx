import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppNavigator from './src/navigation/AppNavigator';
import * as Keychain from 'react-native-keychain';


export default function App() {
  // 앱 배포할땐 삭제해야함 useEffect!!!!!!!!
  useEffect(() => {
    const clearAsyncStorage = async () => {
      await AsyncStorage.clear();
      await Keychain.resetGenericPassword({ service: 'wallet' });
    };
    clearAsyncStorage();
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}