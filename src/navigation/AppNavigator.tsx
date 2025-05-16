// AppNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabs';
import ReceiveTokenScreen from '../screens/ReceiveTokenScreen';
import SendTokenScreen from '../screens/SendTokenScreen';
import SelectAmountScreen from '../screens/SelectAmountScreen';
import QRScannerScreen from '../screens/QRScannerScreen';
import VerifyMnemonicScreen from '../screens/VerifyMnemonicScreen';
import GenerateMnemonicScreen from '../screens/GenerateMnemonicScreen';
const Stack = createNativeStackNavigator();
      //<Stack.Screen name="GenerateMnemonic" component={GenerateMnemonicScreen} />
      //<Stack.Screen name="VerifyMnemonic" component={VerifyMnemonicScreen} />

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>

      <Stack.Screen name="Main" component={BottomTabNavigator} />
      <Stack.Screen name="ReceiveToken" component={ReceiveTokenScreen} />
      <Stack.Screen name="SendToken" component={SendTokenScreen} />
      <Stack.Screen name="SelectAmount" component={SelectAmountScreen} />
      <Stack.Screen name="QRScanner" component={QRScannerScreen} />
      
    </Stack.Navigator>
  );
}