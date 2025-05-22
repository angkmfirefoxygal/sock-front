// AppNavigator.tsx
import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';

import WalletStartScreen from '../screens/WalletStartScreen';
import BottomTabNavigator from './BottomTabs';
import ReceiveTokenScreen from '../screens/ReceiveTokenScreen';
import SendTokenScreen from '../screens/SendTokenScreen';
import SelectAmountScreen from '../screens/SelectAmountScreen';
import QRScannerScreen from '../screens/QRScannerScreen';
import VerifyMnemonicScreen from '../screens/VerifyMnemonicScreen';
import GenerateMnemonicScreen from '../screens/GenerateMnemonicScreen';
import ConfirmSendScreen from '../screens/ConfirmSendScreen';
import SetPasswordScreen from '../screens/SetPasswordScreen';
import EnterPasswordScreen from '../screens/EnterPasswordScreen';
import { RootStackParamList } from './RootStackParamList';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const [initialRoute, setInitialRoute] = useState<keyof RootStackParamList | null>(null);

  useEffect(() => {
    const checkInitialRoute = async () => {
      const isPasswordSet = await AsyncStorage.getItem('isPasswordSet');
      if (isPasswordSet !== 'true') setInitialRoute('SetPassword');
      else setInitialRoute('EnterPassword');
    };
    checkInitialRoute();
  }, []);

  if (!initialRoute) return null; // 혹은 로딩 컴포넌트 반환

  return (
  
      <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SetPassword" component={SetPasswordScreen} />
        <Stack.Screen name="EnterPassword" component={EnterPasswordScreen} />
        <Stack.Screen name="WalletStart" component={WalletStartScreen} />
        <Stack.Screen name="Main" component={BottomTabNavigator} />
        <Stack.Screen name="ReceiveToken" component={ReceiveTokenScreen} />
        <Stack.Screen name="SendToken" component={SendTokenScreen} />
        <Stack.Screen name="SelectAmount" component={SelectAmountScreen} />
        <Stack.Screen name="QRScanner" component={QRScannerScreen} />
        <Stack.Screen name="GenerateMnemonic" component={GenerateMnemonicScreen} />
        <Stack.Screen name="VerifyMnemonic" component={VerifyMnemonicScreen} />
        <Stack.Screen name="ConfirmSend" component={ConfirmSendScreen} />
      </Stack.Navigator>
  
  );
}
