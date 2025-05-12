import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import WalletCreationModal from '../components/modals/WalletCreationMethodMadal';
import CommonButton from '../components/CommonButton';

export default function WalletStartScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SOCK</Text>

      <View style={styles.circle} />

      <View style={styles.buttonGroup}>
        <CommonButton
          label="지갑 생성"
          onPress={() => setModalVisible(true)}
        />

        <CommonButton
          label="지갑 복구"
          onPress={() => {}}
          variant="secondary"
        />
      </View>

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
  buttonGroup: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 1
  },
});