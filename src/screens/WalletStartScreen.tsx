import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import WalletCreationModal from '../components/modals/WalletCreationMethodMadal';
import CommonButton from '../components/CommonButton';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootStackParamList';

export default function WalletStartScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SOCK</Text>

      {/* 원 안에 로고 이미지 */}
      <View style={styles.circle}>
        <Image
          source={require('../assets/logo/SOCK_logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.buttonGroup}>
        <CommonButton
          label="지갑 생성"
          onPress={() => setModalVisible(true)}
        />

        <CommonButton
          label="지갑 복구"
          onPress={() => navigation.navigate('VerifyMnemonic', { mnemonic: [] })}
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
          setModalVisible(false);
          navigation.navigate('GenerateMnemonic');
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
  },
  buttonGroup: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 1,
  },
});