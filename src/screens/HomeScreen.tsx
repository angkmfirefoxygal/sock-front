import React from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CommonButton from '../components/CommonButton';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootStackParamList';


const tokens = [
  { id: '1', name: 'POL', amount: '1 POL', icon: require('../assets/logo/polygon_logo.png') }
];

export default function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const renderItem = ({ item }: { item: typeof tokens[0] }) => (
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
      <View style={styles.container}>
        {/* 상단 계정 정보 영역 */}
        <View style={styles.header}>
          <Image source={require('../assets/icon/network_icon.png')} style={styles.icon} />
          <View style={styles.accountInfo}>
            <Text style={styles.accountName}>Account 1</Text>
            <Text style={styles.accountAddress}>0×12345687898</Text>
          </View>
        </View>

        {/* 보유 토큰 */}
        <Text style={styles.sectionTitle}>보유 토큰</Text>
        <FlatList
          data={tokens}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingBottom: 24 }}
        />

        {/* 여백으로 버튼 아래 정렬 */}
        <View style={{ flex: 1 }} />

        {/* 버튼 */}
        <View style={styles.buttonGroup}>
          <CommonButton label="보내기" onPress={() => navigation.navigate('SendToken')} />
          <CommonButton label="받기" onPress={() => navigation.navigate('ReceiveToken')} variant="secondary" />
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 12,
  },
  accountInfo: {
    justifyContent: 'center',
  },
  accountName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  accountAddress: {
    color: '#888',
    fontSize: 12,
    marginTop: 2,
  },
  sectionTitle: {
    marginVertical: 12,
    fontWeight: 'bold',
    fontSize: 15,
  },
  tokenItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  tokenLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tokenIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  tokenSymbol: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  tokenAmount: {
    fontSize: 14,
    fontWeight: '500',
  },
  buttonGroup: { // 버튼 아래 정렬을 위해서!!
    width: '100%',
    alignItems: 'center',
  },
});