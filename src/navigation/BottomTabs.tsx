// ✅ 수정된 BottomTabs.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, ImageStyle } from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import TradeScreen from '../screens/TradeScreen';
import SettingScreen from '../screens/SettingScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarIcon: ({ focused }) => {
          let iconSource;
          let iconStyle: ImageStyle = {
            width: 25,
            height: 25,
            tintColor: focused ? '#002366' : 'black',
            marginBottom: -12,
            
          };

          switch (route.name) {
            case '홈':
              iconSource = require('../assets/icon/home_icon.png');
              iconStyle = {
                ...iconStyle,
                width: 29,
                height: 29,
                marginTop: 1,
              };
              break;
            case '거래내역':
              iconSource = require('../assets/icon/transaction_icon.png');
              break;
            case '설정':
              iconSource = require('../assets/icon/setting_icon.png');
              break;
            default:
              return null;
          }

          return (
            <Image
              source={iconSource}
              style={iconStyle}
              resizeMode="contain"
            />
          );
        },
        tabBarActiveTintColor: '#002366',
        tabBarInactiveTintColor: 'black',
        headerShown: false,
      })}
    >
      <Tab.Screen name="홈" component={HomeScreen} />
      <Tab.Screen name="거래내역" component={TradeScreen} />
      <Tab.Screen name="설정" component={SettingScreen} />
    </Tab.Navigator>
  );
}