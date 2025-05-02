import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Header from '../components/Header'; // 헤더 불러오기

export default function PasswordScreen() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');

  const handleConfirm = () => {
    if (password !== confirm) {
      setError('비밀번호가 일치하지 않습니다.');
    } else {
      setError('');
      console.log('비밀번호 설정 완료');
    }
  };

  return (
    <View style={styles.container}>
      <Header title="비밀번호 입력" />

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
          onBlur={handleConfirm}
        />
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  label: { fontSize: 14, marginBottom: 4, color: '#000' },
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
    fontSize: 13,
  },
});