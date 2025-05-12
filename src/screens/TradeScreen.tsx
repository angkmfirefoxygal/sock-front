// src/screens/TradeScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  Image,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Transaction = {
  hash: string;
  from_address: string;
  to_address: string;
  value: string;
  date?: string;
  description?: string;
  symbol?: string;
};

export default function TradeScreen() {
  const [search, setSearch] = useState('');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: 추후 API 연동 시 이 부분 수정
    const fetchData = async () => {
      try {
        // 임시 하드코딩 데이터
        const dummyData: Transaction[] = [
          {
            hash: '0xabc1',
            from_address: '0x1234567895435',
            to_address: '0xmyWalletAddress',
            value: '1000000000000000000',
            date: '23/11/11 23:03',
            description: '산학협력 전송',
            symbol: 'POL',
          },
          {
            hash: '0xabc2',
            from_address: '0x12d34789543d5',
            to_address: '0xmyWalletAddress',
            value: '1000000000000000000',
            date: '23/11/11 23:03',
            description: '숙명여대 전송',
            symbol: 'ETH',
          },
        ];

        setTransactions(dummyData);
      } catch (err) {
        console.error('Error fetching transactions', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderItem = ({ item }: { item: Transaction }) => {
    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{item.description}</Text>
          <Text style={styles.cardDate}>{item.date}</Text>
        </View>
        <Text style={styles.cardAmount}>+ {item.value === '1000000000000000000' ? '1' : '?'} {item.symbol}</Text>
        <Text style={styles.cardSender}>송신자: {item.from_address}</Text>
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
              tx.description?.includes(search) || tx.from_address.includes(search)
            )}
            renderItem={renderItem}
            keyExtractor={item => item.hash}
            contentContainerStyle={{ paddingBottom: 24 }}
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
    padding: 20,
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
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  cardTitle: {
    fontWeight: 'bold',
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