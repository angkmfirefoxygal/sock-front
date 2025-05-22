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
  Alert,
} from 'react-native';
import Header from '../components/Header';
import CommonButton from '../components/CommonButton';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootStackParamList';
import * as Keychain from 'react-native-keychain';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Navigation = NativeStackNavigationProp<RootStackParamList, 'VerifyMnemonic'>;
type Route = RouteProp<RootStackParamList, 'VerifyMnemonic'>;

export default function VerifyMnemonicScreen() {
  const [inputs, setInputs] = useState<string[]>(Array(24).fill(''));
  const navigation = useNavigation<Navigation>();
  const route = useRoute<Route>();
  const originalMnemonic = route.params.mnemonic;

  const handleChange = (text: string, index: number) => {
    const updated = [...inputs];
    updated[index] = text.trim();
    setInputs(updated);
  };

  const handleConfirm = async () => {
    const inputMnemonic = inputs.join(' ').trim();

    if (inputMnemonic.split(' ').length !== 24) {
      Alert.alert('에러', '24개의 단어를 모두 입력해주세요.');
      return;
    }

    try {
      // 1. 유효성 검사
      const verifyRes = await fetch(
        `http://43.201.26.30:8080/wallets/verify?mnemonic=${encodeURIComponent(inputMnemonic)}`
      );
      const verifyData = await verifyRes.json();

      if (!verifyData.valid) {
        Alert.alert('유효하지 않은 구문', '입력한 니모닉이 유효하지 않습니다.');
        return;
      }

      // 2. 주소 + 프라이빗 키 복구
      const recoverRes = await fetch(
        `http://43.201.26.30:8080/wallets/recover?mnemonic=${encodeURIComponent(inputMnemonic)}`
      );
      const recoverData = await recoverRes.json();
      const wallet = JSON.parse(recoverData.wallet);
      const { address, private_key } = wallet;

      if (!address || !private_key) {
        throw new Error('복구된 주소 또는 개인키가 없습니다.');
      }

      // 3. Keychain 저장
      await Keychain.resetGenericPassword({ service: 'wallet' });
      await Keychain.setGenericPassword(private_key, address, { service: 'wallet' });


      // 복구 완료 플래그 저장
      
      await AsyncStorage.setItem('isWalletRestored', 'true');
      // 4. 이동
      navigation.replace('Main');
    } catch (error: any) {
      console.error('❌ 검증 또는 복구 실패:', error);
      Alert.alert('오류', error.message || '복구 중 문제가 발생했습니다.');
    }
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

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingBottom: 60,
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
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 14,
  },
});