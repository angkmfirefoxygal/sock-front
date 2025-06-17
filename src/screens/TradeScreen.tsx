import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  Image,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Keychain from 'react-native-keychain';

type Transaction = {
  hash: string;
  from_address: string;
  to_address: string;
  value: string;
  block_timestamp?: string;
};

export default function TradeScreen() {
  const [search, setSearch] = useState('');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [myAddress, setMyAddress] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const creds = await Keychain.getGenericPassword({ service: 'wallet' });
        if (!creds) throw new Error('저장된 지갑 주소 없음');
        const address = creds.password.toLowerCase();
        setMyAddress(address);

        const res = await fetch(
          `https://moply.me/sock/wallets/history/go?address=${address}`
        );
        const data = await res.json();

        if (!res.ok || !data.result) {
          throw new Error(data.error || '거래 내역 불러오기 실패');
        }

        setTransactions(data.result);
      } catch (err: any) {
        console.error('❌ 거래 내역 오류:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderItem = ({ item }: { item: Transaction }) => {
    const eth = (parseFloat(item.value) / 1e18).toString();
    const date = item.block_timestamp?.split('T')[0] || '';
    const isReceived = item.to_address.toLowerCase() === myAddress;
    const direction = isReceived ? '수신' : '전송';
    const sign = isReceived ? '+' : '-';
    const color = isReceived ? '#067b1e' : '#D32F2F';
    const maskAddress = (addr: string) =>
      `${addr.slice(0, 6)}...${addr.slice(-4)}`;

    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{direction}</Text>
          <Text style={styles.cardDate}>{date}</Text>
        </View>
        <Text style={[styles.cardAmount, { color }]}>
          {sign} {eth} POL
        </Text>
        <Text style={styles.cardSender}>From: {maskAddress(item.from_address)}</Text>
        <Text style={styles.cardSender}>To: {maskAddress(item.to_address)}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* 검색창 */}
        <View style={styles.searchBar}>
          <TextInput
            placeholder="검색"
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
          />
          <Image
            source={require('../assets/icon/search_icon.png')}
            style={styles.searchIcon}
          />
        </View>

        {/* 목록 */}
        {loading ? (
          <ActivityIndicator size="large" color="#002366" style={{ marginTop: 40 }} />
        ) : (
          <FlatList
            data={transactions.filter(tx =>
              tx.hash.includes(search) ||
              tx.from_address.includes(search) ||
              tx.to_address.includes(search)
            )}
            renderItem={renderItem}
            keyExtractor={item => item.hash}
            contentContainerStyle={{ 
              paddingTop: 8,   
              paddingBottom: 24, 
              paddingHorizontal: 8,  // ✅ 좌우 여백 추가로 카드 잘림 방지
            }}
          />
        )}
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
    paddingTop:20,
    paddingRight: 20,
    paddingLeft: 20,
    flex: 1,
  },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: '#f4f4f4',
    borderRadius: 20,
    alignItems: 'center',
    paddingHorizontal: 12,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    height: 36,
    fontSize: 14,
  },
  searchIcon: {
    width: 16,
    height: 16,
    tintColor: '#aaa',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    overflow: Platform.OS === 'android' ? 'visible' : 'hidden', // ✅ 그림자 잘리지 않도록 처리
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  cardDate: {
    color: '#666',
    fontSize: 12,
  },
  cardAmount: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardSender: {
    fontSize: 12,
    color: '#666',
  },
});