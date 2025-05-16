import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import Header from '../components/Header';
import CommonButton from '../components/CommonButton';
import { useNavigation } from '@react-navigation/native'; 
import { RootStackParamList } from '../navigation/RootStackParamList';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type GenerateMnemonicScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'GenerateMnemonic'
>;


export default function GenerateMnemonicScreen() {
  const navigation = useNavigation<GenerateMnemonicScreenNavigationProp>();
  const [mnemonic, setMnemonic] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // API 호출
useEffect(() => {
  const fetchMnemonic = async () => {
    try {
      const res = await fetch('http://43.201.26.30:8080/wallets/create');
      const data = await res.json();

      //  문자열 → 배열 변환 추가!
      if (typeof data.mnemonic === 'string') {
        setMnemonic(data.mnemonic.trim().split(' '));
      } else {
        throw new Error('예상과 다른 응답 형식');
      }
    } catch (error) {
      console.error('❌ 니모닉 생성 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchMnemonic();
}, []);

  const renderItem = ({ item, index }: { item: string; index: number }) => (
    <View style={styles.wordBox}>
      <Text style={styles.wordIndex}>{index + 1}.</Text>
      <View style={styles.wordChip}>
        <Text style={styles.wordText}>{item}</Text>
      </View>
    </View>
  );

  function handleConfirm(): void {
    navigation.navigate('VerifyMnemonic', { mnemonic });
  }

  return (
    <View style={styles.container}>
      <Header title="지갑 복구 구문" />
      {loading ? (
        <ActivityIndicator size="large" color="#000" style={{ marginTop: 100 }} />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <FlatList
            data={mnemonic}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderItem}
            numColumns={2}
            columnWrapperStyle={{ gap: 32 }}
            scrollEnabled={false}
            contentContainerStyle={styles.flatListContent}
          />
          <CommonButton
            label="확인"
            onPress={handleConfirm}
            style={{ marginTop: 32 }}
          />
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff', alignItems: 'center' },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    alignItems: 'center',
  },
  flatListContent: {
    alignItems: 'center',
    marginTop: 30,
  },
  wordBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  wordIndex: {
    fontSize: 14,
    marginRight: 6,
    width: 24,
  },
  wordChip: {
    minWidth: 100,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  wordText: { fontSize: 14 },
});