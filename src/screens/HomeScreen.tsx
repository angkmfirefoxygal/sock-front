import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CommonButton from '../components/CommonButton';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootStackParamList';
import NetworkInfoModal from '../components/modals/NetworkInfoModal';
import * as Keychain from 'react-native-keychain';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WALLET_KEY = 'wallet';

export default function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [address, setAddress] = useState<string | null>(null);
  const [tokens, setTokens] = useState<{ id: string; name: string; amount: string; icon: any }[]>([]);
  const [networkInfoModalVisible, setNetworkInfoModalVisible] = useState(false);
  const [networkInfo, setNetworkInfo] = useState<{ network: string; chain_id: string; block_number: number } | null>(null);

  const handleFetchNetworkInfo = async () => {
    try {
      const res = await fetch('https://moply.me/sock/wallets/network');
      const data = await res.json();
      setNetworkInfo(data);
      setNetworkInfoModalVisible(true);
    } catch (err) {
      console.error('❌ 네트워크 정보 조회 실패:', err);
    }
  };

  useEffect(() => {
    const fetchWalletAndBalance = async () => {
      try {
        const creds = await Keychain.getGenericPassword({ service: WALLET_KEY });

        if (!creds) {
          console.warn('Keychain에 저장된 지갑 정보가 없습니다.');
          return;
        }

        const storedAddress = creds.password;
        setAddress(storedAddress);

        const balRes = await fetch(`https://moply.me/sock/wallets/balance?address=${storedAddress}`);
        const balData = await balRes.json();
        const numericBalance = Number(balData.balance);
        const balanceStr = `${numericBalance.toFixed(6)} POL`;

        setTokens([
          {
            id: '1',
            name: 'POL',
            amount: balanceStr,
            icon: require('../assets/logo/polygon_logo.png'),
          },
        ]);

        await AsyncStorage.setItem('walletBalance', String(numericBalance));
      } catch (error) {
        console.error('❌ 주소 또는 잔액 조회 실패:', error);
      }
    };

    fetchWalletAndBalance();
  }, []);

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
        <View style={styles.header}>
          <Pressable onPress={handleFetchNetworkInfo} style={styles.iconWrapper}>
            <Image source={require('../assets/icon/network_icon.png')} style={styles.icon} />
          </Pressable>

          <View style={styles.accountTextContainer}>
            <Text style={styles.accountName}>Account 1</Text>
            <Text style={styles.accountAddress}>
              {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '주소 로딩 중...'}
            </Text>
          </View>

          <View style={styles.rightSpacer} />
        </View>

        <View style={styles.tokenSection}>
        <Text style={styles.sectionTitle}>보유 토큰</Text>
        </View>
        <FlatList
          data={tokens}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingBottom: 24 }}
        />

        <View style={{ flex: 1 }} />

        <View style={styles.buttonGroup}>
          <CommonButton label="보내기" onPress={() => navigation.navigate('SendToken')} />
          <CommonButton label="받기" onPress={() => navigation.navigate('ReceiveToken')} variant="secondary" />
        </View>

        <NetworkInfoModal
          visible={networkInfoModalVisible}
          onClose={() => setNetworkInfoModalVisible(false)}
          networkInfo={networkInfo}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1, padding: 24 },
   tokenSection: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  iconWrapper: {
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 25,
    height: 25,
  },
  accountTextContainer: {
    flex: 1,
    alignItems: 'center',
  },
  rightSpacer: {
    width: 25,
  },
  accountName: { fontWeight: 'bold', fontSize: 16 },
  accountAddress: { color: '#888', fontSize: 12, marginTop: 2 },
  tokenItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  tokenLeft: { flexDirection: 'row', alignItems: 'center' },
  tokenIcon: { width: 24, height: 24, marginRight: 8 },
  tokenSymbol: { fontSize: 14, fontWeight: 'bold' },
  tokenAmount: { fontSize: 14, fontWeight: '500' },
  buttonGroup: { width: '100%', alignItems: 'center' },
});