import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet, Alert,
} from 'react-native';
import Header from '../components/Header';
import CommonButton from '../components/CommonButton';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootStackParamList';
import { Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

export default function EnterPasswordScreen() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleConfirm = async () => {
    setError('');
    try {
      const res = await fetch('https://moply.me/sock/wallets/verify-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || '비밀번호 인증 실패');

      if (json.status === 'password match') {
        // AsyncStorage에서 지갑 복구 여부 확인
        const isWalletRestored = await AsyncStorage.getItem('isWalletRestored');

        if (isWalletRestored === 'true') {
          console.log('✅ 복구된 지갑 있음 → Main으로');
          navigation.replace('Main');
        } else {
          console.log('🧭 복구 안 됨 → WalletStart로');
          navigation.replace('WalletStart');
        }
      } else {
        setError('비밀번호가 일치하지 않습니다.');
      }
    } catch (err: any) {
      if (err.message === 'Password mismatch') {
        setError('비밀번호가 일치하지 않습니다.');
      } else if (err.message === 'No password found') {
        setError('저장된 비밀번호가 없습니다.');
      } else {
        setError('오류가 발생했습니다. 다시 입력해주세요.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Header title="비밀번호 입력" />
      <View style={styles.circle}>
      <Image
        source={require('../assets/logo/SOCK_logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
      <Text style={styles.label}>비밀번호 입력</Text>
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <CommonButton label="확인" onPress={handleConfirm} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff', alignItems: 'center' },
  circle: {
    width: 160,
    height: 160,
    backgroundColor: '#002366',
    borderRadius: 80,
    marginTop: 60,
    marginBottom: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: { fontSize: 14, alignSelf: 'flex-start', marginBottom: 4, color: '#000' },
  input: {
    width: '100%', height: 44, fontSize: 14, paddingHorizontal: 10,
    borderWidth: 1, borderRadius: 8, backgroundColor: '#fafafa',
    borderColor: '#eee', marginBottom: 16,
  },
  error: { color: 'red', fontSize: 13, alignSelf: 'flex-start', marginBottom: 8 },
  logo: {
  width: 120,
  height: 120,
},
});