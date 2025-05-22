import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, Modal, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CommonButton from '../components/CommonButton';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootStackParamList';
import NetworkInfoModal from '../components/modals/NetworkInfoModal';
import * as Keychain from 'react-native-keychain';

const WALLET_KEY = 'wallet';

export default function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [address, setAddress] = useState<string | null>(null);
  const [tokens, setTokens] = useState<{ id: string; name: string; amount: string; icon: any }[]>([]);
  const [networkInfoModalVisible, setNetworkInfoModalVisible] = useState(false);
  const [networkInfo, setNetworkInfo] = useState<{ network: string; chain_id: string; block_number: number } | null>(null);

  const handleFetchNetworkInfo = async () => {
    try {
      const res = await fetch('http://43.201.26.30:8080/wallets/network');
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
        let finalAddress: string | null = null;

        if (creds) {
          finalAddress = creds.password;
        }

        if (!finalAddress) {
          const pkRes = await fetch('http://43.201.26.30:8080/wallets/private-key');
          const pkData = await pkRes.json();
          const privateKey = pkData.private_key;

          const addrRes = await fetch('http://43.201.26.30:8080/wallets/address');
          const addrData = await addrRes.json();
          finalAddress = addrData.address;

          if (finalAddress && privateKey) {
            await Keychain.setGenericPassword(privateKey, finalAddress, { service: WALLET_KEY });
          }
        }

        setAddress(finalAddress);

        if (finalAddress) {
          const balRes = await fetch(`http://43.201.26.30:8080/wallets/balance?address=${finalAddress}`);
          const balData = await balRes.json();
          const balanceStr = `${Number(balData.balance).toFixed(6)} POL`;

          setTokens([
            {
              id: '1',
              name: 'POL',
              amount: balanceStr,
              icon: require('../assets/logo/polygon_logo.png'),
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
        <View style={styles.header}>
          {/* 네트워크 아이콘 왼쪽 상단 */}
          <Pressable onPress={handleFetchNetworkInfo} style={styles.iconWrapper}>
            <Image source={require('../assets/icon/network_icon.png')} style={styles.icon} />
          </Pressable>

          {/* 계정 정보 가운데 정렬 */}
          <View style={styles.accountTextContainer}>
            <Text style={styles.accountName}>Account 1</Text>
            <Text style={styles.accountAddress}>
              {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '주소 로딩 중...'}
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>보유 토큰</Text>
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
    header: {
    position: 'relative',
    marginBottom: 24,
    justifyContent: 'center',
  },
  iconWrapper: {
    position: 'absolute',
    left: 0,
    top: 0,
    padding: 4,
  },

  icon: {
    width: 24,
    height: 24,
  },

  accountTextContainer: {
    alignItems: 'center',
    alignSelf: 'center',
  },
  accountName: { fontWeight: 'bold', fontSize: 16 },
  accountAddress: { color: '#888', fontSize: 12, marginTop: 2 },
  sectionTitle: { marginVertical: 12, fontWeight: 'bold', fontSize: 15 },
  tokenItem: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16,
  },
  tokenLeft: { flexDirection: 'row', alignItems: 'center' },
  tokenIcon: { width: 24, height: 24, marginRight: 8 },
  tokenSymbol: { fontSize: 14, fontWeight: 'bold' },
  tokenAmount: { fontSize: 14, fontWeight: '500' },
  buttonGroup: { width: '100%', alignItems: 'center' },

});