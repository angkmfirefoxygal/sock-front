import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView } from 'react-native';
import Header from '../components/Header';
import CommonButton from '../components/CommonButton';

export default function GenerateMnemonicScreen() {
  // 추후 api 연결하면 랜덤으로 받아옴
  const [mnemonic] = useState([
    'garage', 'pencil', 'ocean', 'sunset',
    'voice', 'ticket', 'drum', 'yellow',
    'stone', 'brisk', 'label', 'equal',
    'maple', 'orchard', 'moment', 'scheme',
    'rely', 'metal', 'hint', 'jeans',
    'brave', 'funny', 'dust', 'finish'
  ]);

  const renderItem = ({ item, index }: { item: string; index: number }) => (
    <View style={styles.wordBox}>
      <Text style={styles.wordIndex}>{index + 1}.</Text>
      <View style={styles.wordChip}>
        <Text style={styles.wordText}>{item}</Text>
      </View>
    </View>
  );

  function handleConfirm(): void {
    console.log('확인 버튼 눌림');
  }

  return (
    <View style={styles.container}>
      <Header title="지갑 복구 구문" />
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

        {/* ✅ 버튼도 스크롤 안에 포함되게 */}
        <CommonButton
          label="확인"
          onPress={handleConfirm}
          style={{ marginTop: 32 }}
        />
      </ScrollView>
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