import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, ScrollView } from 'react-native';
import Header from '../components/Header';
import CommonButton from '../components/CommonButton';

export default function VerifyMnemonicScreen() {
  const [inputs, setInputs] = useState<string[]>(Array(24).fill(''));

  const handleChange = (text: string, index: number) => {
    const updated = [...inputs];
    updated[index] = text.trim();
    setInputs(updated);
  };

  const renderInput = ({ item, index }: { item: string; index: number }) => (
    <View style={styles.wordBox}>
      <Text style={styles.wordIndex}>{index + 1}.</Text>
      <TextInput
        style={styles.input}
        placeholder=""
        value={inputs[index]}
        onChangeText={(text) => handleChange(text, index)}
        autoCapitalize="none"
        autoCorrect={false}
      />
    </View>
  );

  function handleConfirm(): void {
    console.log('입력한 복구 구문:', inputs);
  }

  return (
    <View style={styles.container}>
      <Header title="복구 구문 입력" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <FlatList
          data={inputs}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderInput}
          numColumns={2}
          columnWrapperStyle={{ gap: 32 }}
          scrollEnabled={false}
          contentContainerStyle={styles.flatListContent}
        />
        <CommonButton label="확인" onPress={handleConfirm} style={{ marginTop: 32 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 24, alignItems: 'center' },
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
  input: {
    minWidth: 100,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 14,
  },
});