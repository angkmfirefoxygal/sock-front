import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import CommonButton from '../components/CommonButton';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootStackParamList';

export default function SetPasswordScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');

  // ✅ 비밀번호 유효성 검사 함수
  const isValidPassword = (pw: string) => {
    const lengthOK = pw.length >= 8;
    const hasLetter = /[a-zA-Z]/.test(pw);
    const hasNumber = /[0-9]/.test(pw);
    return lengthOK && hasLetter && hasNumber;
  };

  // ✅ 서버에 비밀번호 저장 요청
  const savePassword = async (password: string) => {
    try {
      const res = await fetch('http://43.201.26.30:8080/wallets/set-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || '비밀번호 저장 실패');
      }

      console.log('✅ 비밀번호 저장 성공:', json.status);
      navigation.replace('EnterPassword'); // ✅ 성공 시 이동
    } catch (err: any) {
      console.error('❌ 서버 저장 실패:', err.message);
      setError(err.message);
    }
  };

  // ✅ 확인 버튼 눌렀을 때
  const handleConfirm = () => {
    setError('');

    if (password !== confirm) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (!isValidPassword(password)) {
      setError('비밀번호는 8자 이상, 영어와 숫자를 포함해야 합니다.');
      return;
    }

    savePassword(password);
  };

  return (
    <View style={styles.container}>
      <Header title="비밀번호 설정" />

      <View style={styles.content}>
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

        <Text style={styles.label}>비밀번호 확인</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="비밀번호 확인"
            secureTextEntry
            value={confirm}
            onChangeText={setConfirm}
          />
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <CommonButton label="확인" onPress={handleConfirm} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  content: {
    paddingHorizontal: 24,
    marginTop: 60,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
    color: '#000',
  },
  inputContainer: {
    borderColor: '#eee',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
    backgroundColor: '#fafafa',
  },
  input: {
    height: 40,
    fontSize: 14,
  },
  error: {
    color: 'red',
    marginTop: 8,
    marginBottom: 16,
    fontSize: 13,
  },
});