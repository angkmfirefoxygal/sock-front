import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import WalletCreationModal from '../components/modals/WalletCreationMethodMadal';
import React, { useState } from 'react';


export default function WalletStartScreen() {

  const [modalVisible, setModalVisible] = useState(false); // 모달 상태 관리

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SOCK</Text>

      <View style={styles.circle} />

      <TouchableOpacity
        style={[styles.button, styles.primaryButton]}
        onPress={() => setModalVisible(true)} // 모달 오픈
      >
        <Text style={styles.buttonText}>지갑 생성</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.disabledButton]} disabled>
        <Text style={[styles.buttonText, { color: '#fff' }]}>지갑 복구</Text>
      </TouchableOpacity>

      <WalletCreationModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSelectHardware={() => {
          console.log('하드웨어 지갑 선택');
          setModalVisible(false);
        }}
        onSelectMobile={() => {
          console.log('모바일 지갑 선택');
          setModalVisible(false);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#073686',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  circle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#073686',
    marginBottom: 150,
  },
  button: {
    width: '100%',
    maxWidth: 240,
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButton: {
    backgroundColor: '#073686',
  },
  disabledButton: {
    backgroundColor: '#a1a7c2',
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});