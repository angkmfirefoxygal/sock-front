import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SetPasswordScreen from './src/screens/SetPasswordScreen';
import EnterPasswordScreen from './src/screens/EnterPasswordScreen';
import WalletStartScreen from './src/screens/WalletStartScreen';
import GenerateMnemonicScreen from './src/screens/GenerateMnemonicScreen';
import VerifyMnemonicScreen from './src/screens/VerifyMnemonicScreen';
import BottomTabNavigator from './src/navigation/BottomTabs';
//import AddressInputScreen from './src/screens/AdressInputScreen';
import ReceiveTokenScreen from './src/screens/ReceiveTokenScreen';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import SelectAmountScreen from './src/screens/SelectAmountScreen';
export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}