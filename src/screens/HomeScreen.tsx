import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CommonButton from '../components/CommonButton';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootStackParamList';
import * as Keychain from 'react-native-keychain';

const WALLET_KEY = 'wallet';

export default function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [address, setAddress] = useState<string | null>(null);
  const [tokens, setTokens] = useState<{ id: string; name: string; amount: string; icon: any }[]>([]);

  useEffect(() => {
    const fetchWalletAndBalance = async () => {
      try {
        const creds = await Keychain.getGenericPassword({ service: WALLET_KEY });
        let finalAddress: string | null = null;

        if (creds) {
          finalAddress = creds.password;
        }

        // ✅ 1. 주소가 없으면 개인키 및 주소 생성
        if (!finalAddress) {
          // 개인키 생성
          const pkRes = await fetch('http://43.201.26.30:8080/wallets/private-key');
          const pkData = await pkRes.json();
          const privateKey = pkData.private_key;

          // 주소 생성
          const addrRes = await fetch('http://43.201.26.30:8080/wallets/address');
          const addrData = await addrRes.json();
          finalAddress = addrData.address;

          // 저장
          if (finalAddress && privateKey) {
            await Keychain.setGenericPassword(privateKey, finalAddress, { service: WALLET_KEY });
          }
        }

        setAddress(finalAddress);

        // ✅ 2. 잔액 조회
        if (finalAddress) {
          const balRes = await fetch(`http://43.201.26.30:8080/wallets/balance?address=${finalAddress}`);
          const balData = await balRes.json();
          const ethBalance = `${Number(balData.balance).toFixed(6)} ETH`;

          setTokens([
            {
              id: '1',
              name: 'ETH',
              amount: ethBalance,
              icon: require('../assets/logo/ethereum_logo.png'),
            },
          ]);
        }
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
        {/* 상단 계정 정보 영역 */}
        <View style={styles.header}>
          <Image source={require('../assets/icon/network_icon.png')} style={styles.icon} />
          <View style={styles.accountTextContainer}>
            <Text style={styles.accountName}>Account 1</Text>
            <Text style={styles.accountAddress}>
              {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '주소 로딩 중...'}
            </Text>
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
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  icon: {
    position: 'absolute',
    left: 0,
    width: 24,
    height: 24,
  },
  accountTextContainer: {
    alignItems: 'center',
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
  buttonGroup: {
    width: '100%',
    alignItems: 'center',
  },
});