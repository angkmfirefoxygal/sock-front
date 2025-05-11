import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
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
        returnKeyType="next"
      />
    </View>
  );

  function handleConfirm(): void {
    console.log('입력한 복구 구문:', inputs);
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0} // 필요시 조정
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Header title="복구 구문 입력" />

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
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 24,
    alignItems: 'center',
    backgroundColor: '#fff',
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