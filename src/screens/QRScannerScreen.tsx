import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import CommonButton from '../components/CommonButton';

//급한대로 비번입력화면 추후 수정

export default function QRScannerScreen() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  const handleConfirm = () => {
    if (password !== '1234') { //추후 로컬에 저장한 비밀번호와 비교 
      setError('비밀번호가 일치하지 않습니다.');
    } else {
      setError('');
      console.log('비밀번호 인증 성공');
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
  container: { flex: 1, padding: 24, backgroundColor: '#fff', alignItems: 'center' },
  circle: {
    width: 160,
    height: 160,
    backgroundColor: '#002366',
    borderRadius: 80,
    marginTop: 60,
    marginBottom: 48,
  },
  label: { fontSize: 14, alignSelf: 'flex-start', marginBottom: 4, color: '#000' },
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
  }
});