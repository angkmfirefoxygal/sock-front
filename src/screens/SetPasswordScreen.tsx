import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import CommonButton from '../components/CommonButton';

export default function SetPasswordScreen() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');


  const handleConfirm = () => {
    if (password === confirm) {
    }
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
  }
});