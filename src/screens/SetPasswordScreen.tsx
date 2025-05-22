import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import Header from '../components/Header';
import CommonButton from '../components/CommonButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootStackParamList';

export default function SetPasswordScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');

  const isValidPassword = (pw: string) =>
    pw.length >= 8 && /[a-zA-Z]/.test(pw) && /[0-9]/.test(pw);

  const savePassword = async () => {
    try {
      const res = await fetch('http://43.201.26.30:8080/wallets/set-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || '비밀번호 저장 실패');

      await AsyncStorage.setItem('isPasswordSet', 'true');
      Alert.alert('완료', '비밀번호가 설정되었습니다.', [
        { text: '확인', onPress: () => navigation.replace('EnterPassword') },
      ]);
    } catch (err: any) {
      console.error('❌ 서버 저장 실패:', err.message);
      setError(err.message);
    }
  };

  const handleConfirm = () => {
    setError('');
    if (password !== confirm) return setError('비밀번호가 일치하지 않습니다.');
    if (!isValidPassword(password)) {
      return setError('비밀번호는 8자 이상, 영어와 숫자를 포함해야 합니다.');
    }
    savePassword();
  };

  return (
    <View style={styles.container}>
      <Header title="비밀번호 설정" />
      <View style={styles.content}>
        <Text style={styles.label}>비밀번호 입력</Text>
        <TextInput style={styles.input} secureTextEntry value={password} onChangeText={setPassword} />
        <Text style={styles.label}>비밀번호 확인</Text>
        <TextInput style={styles.input} secureTextEntry value={confirm} onChangeText={setConfirm} />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <CommonButton label="확인" onPress={handleConfirm} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 24, marginTop: 60 },
  label: { fontSize: 14, marginBottom: 4, color: '#000' },
  input: {
    height: 44,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fafafa',
    marginBottom: 16,
  },
  error: { color: 'red', marginTop: 8, marginBottom: 16, fontSize: 13 },
});