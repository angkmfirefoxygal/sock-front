import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import CommonButton from '../components/CommonButton';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';

const dummyTokens = [
  { id: '1', name: 'POL', amount: '1 POL', icon: require('../assets/logo/polygon_logo.png') },
  { id: '2', name: 'Ethereum', amount: '1 ETH', icon: require('../assets/logo/ethereum_logo.png') },
  { id: '3', name: 'BNB', amount: '1 BNB', icon: require('../assets/logo/bnb_logo.png') },
];

const helpTexts = {
  token: '현재 보유하고 있는 토큰의 종류와 수량을 확인할 수 있어요.',
  send: '주소를 입력하고 원하는 코인 종류를 선택해 보낼 수 있어요.',
  receive: '내 주소를 텍스트로 복사하거나 QR 코드 이미지를 다운받아 친구에게 공유할 수 있어요.',
  history: '현재까지의 거래 내역을 확인할 수 있어요.',
  setting: '도움말 다시 보기가 가능해요.',
};

function MainContent() {
  const [helpType, setHelpType] = useState<null | keyof typeof helpTexts>(null);
  const route = useRoute();
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      if (route.name === '거래내역') setHelpType('history');
      else if (route.name === '설정') setHelpType('setting');
      else setHelpType(null);
    }, [route.name])
  );

  const toggleHelp = (type: keyof typeof helpTexts) => {
    setHelpType(prev => (prev === type ? null : type));
  };

  const renderItem = ({ item }: { item: typeof dummyTokens[0] }) => (
    <View style={styles.tokenItem}>
      <View style={styles.tokenLeft}>
        <Image source={item.icon} style={styles.tokenIcon} />
        <Text style={styles.tokenSymbol}>{item.name}</Text>
      </View>
      <Text style={styles.tokenAmount}>{item.amount}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="도움말" onPressLeft={() => navigation.goBack()} />

      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.accountName}>Account 1</Text>
          <Text style={styles.accountAddress}>0x123456...7898</Text>
        </View>
        <View>
         <View style={styles.sectionHeaderWrapper}>
        <Text style={styles.sectionTitle}>보유 토큰</Text>
        </View>
          <Pressable onPress={() => toggleHelp('token')}>
            <FlatList
              data={dummyTokens}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
          </Pressable>
          {helpType === 'token' && <View style={styles.tooltip}><Text style={styles.tooltipText}>{helpTexts.token}</Text></View>}
        </View>
        <View style={styles.flexSpacer} />

        <View style={styles.buttonGroupFixed}>
          <View style={styles.buttonWithTooltip}>
            {helpType === 'send' && <View style={styles.tooltipAbove}><Text style={styles.tooltipText}>{helpTexts.send}</Text></View>}
            <CommonButton label="보내기" onPress={() => toggleHelp('send')} />
          </View>
          <View style={styles.buttonWithTooltip}>
            <CommonButton label="받기" variant="secondary" onPress={() => toggleHelp('receive')} />
            {helpType === 'receive' && (
              <View style={styles.tooltipBelowInline}>
                <Text style={styles.tooltipText}>{helpTexts.receive}</Text>
              </View>
            )}
          </View>
        </View>

        {(helpType === 'history' || helpType === 'setting') && (
          <View style={styles.tooltipBottom}>
            <Text style={styles.tooltipText}>{helpTexts[helpType]}</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const Tab = createBottomTabNavigator();

export default function HomeScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarIcon: ({ focused }) => {
          let iconSource;
          let iconStyle = {
            width: 25,
            height: 25,
            tintColor: focused ? '#002366' : 'black',
            marginBottom: -12,
          };

          switch (route.name) {
            case '홈':
              iconSource = require('../assets/icon/home_icon.png');
              iconStyle = { ...iconStyle, width: 29, height: 29 };
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

          return <Image source={iconSource} style={iconStyle} resizeMode="contain" />;
        },
        tabBarActiveTintColor: '#002366',
        tabBarInactiveTintColor: 'black',
        headerShown: false,
      })}
    >
      <Tab.Screen name="홈" component={MainContent} />
      <Tab.Screen name="거래내역" component={MainContent} />
      <Tab.Screen name="설정" component={MainContent} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1, padding: 24 },
  header: {
    alignItems: 'center',
    marginBottom: 24,
    alignSelf: 'stretch',
    paddingTop: 4,
  },
  accountName: { fontWeight: 'bold', fontSize: 16 },
  accountAddress: { color: '#888', fontSize: 12 },
    sectionHeaderWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 8,
    marginBottom: 16,
    width: '100%', // ⭐ 화면 전체 너비 확보
    alignItems: 'center', // 텍스트 정중앙
    },
    sectionTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
    },
  tokenItem: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  tokenLeft: { flexDirection: 'row', alignItems: 'center' },
  tokenIcon: { width: 20, height: 20, marginRight: 8 },
  tokenSymbol: { fontSize: 14 },
  tokenAmount: { fontSize: 14 },
  buttonGroupFixed: {
    position: 'absolute',
    bottom: 150,
    left: 24,
    right: 24,
  },
  tooltipBelowInline: {
    marginTop: 8,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  buttonWithTooltip: { alignItems: 'center' },
  tooltip: {
    marginTop: 8,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    alignSelf: 'flex-start',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  tooltipAbove: {
    position: 'absolute',
    bottom: 90,
    alignSelf: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  tooltipBelow: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  tooltipBottom: {
    position: 'absolute',
    bottom: 80,
    alignSelf: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  tooltipText: { fontSize: 13, color: '#000' },
  tabIcon: { marginTop: 40, alignItems: 'center' },
  tabIconText: { color: '#444', fontSize: 13 },
  flexSpacer: { flex: 1 },
});