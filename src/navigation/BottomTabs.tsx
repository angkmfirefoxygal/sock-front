// src/navigation/BottomTabNavigator.tsx

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from '../screens/HomeScreen';
import TradeScreen from '../screens/TradeScreen';
import WalletScreen from '../screens/WalletScreen';
import HelpScreen from '../screens/HelpScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#002366',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        }}
      >
        <Tab.Screen name="홈" component={HomeScreen} />
        <Tab.Screen name="거래" component={TradeScreen} />
        <Tab.Screen name="지갑" component={WalletScreen} />
        <Tab.Screen name="도움말" component={HelpScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}