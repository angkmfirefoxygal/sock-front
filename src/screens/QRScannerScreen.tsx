import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';

export default function QRScannerScreen() {
  return (
    <View style={styles.container}>
      <Header title="QR 스캐너" />
      <View style={styles.content}>
        <Text style={styles.text}>QR 스캐너 기능은 추후 구현 예정입니다.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  text: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});