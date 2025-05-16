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
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootStackParamList';
export default function EnterPasswordScreen() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleConfirm = async () => {
    setError('');

    try {
      const res = await fetch('http://43.201.26.30:8080/wallets/verify-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || '비밀번호 인증 실패');
      }

      if (json.status === 'password match') {
        console.log('✅ 비밀번호 인증 성공');
        // TODO: 다음 화면으로 이동
      }
    } catch (err: any) {
      console.error('❌ 인증 실패:', err.message);
      if (err.message === 'Password mismatch') {
        setError('비밀번호가 일치하지 않습니다.');
      } else if (err.message === 'No password found') {
        setError('저장된 비밀번호가 없습니다.');
      } else {
        setError('오류가 발생했습니다. 다시 시도해주세요.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Header title="비밀번호 입력" />

      {/* 원형 아이콘 영역 */}
      <View style={styles.circle} />

      <Text style={styles.label}>비밀번호 입력</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="비밀번호"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}
      <CommonButton label="확인" onPress={handleConfirm} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  circle: {
    width: 160,
    height: 160,
    backgroundColor: '#002366',
    borderRadius: 80,
    marginTop: 60,
    marginBottom: 48,
  },
  label: {
    fontSize: 14,
    alignSelf: 'flex-start',
    marginBottom: 4,
    color: '#000',
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#eee',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
    backgroundColor: '#fafafa',
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 14,
  },
  error: {
    color: 'red',
    fontSize: 13,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
});