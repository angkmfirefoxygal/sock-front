// src/screens/ReceiveScreen.tsx

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CommonButton from '../components/CommonButton';

export default function ReceiveTokenScreen() {
  const navigation = useNavigation();
  const walletAddress = '0x12345687898';

  const handleCopy = () => {
    console.log('주소 복사:', walletAddress);
    // 클립보드 복사: Clipboard.setString(walletAddress); // 필요 시 import
  };

  const handleShare = () => {
    console.log('공유하기 눌림');
    // Share API 연동 가능
  };

  const handleClose = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* 닫기 버튼 */}
      <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
        <Text style={styles.closeText}>×</Text>
      </TouchableOpacity>

      {/* QR 코드 */}
      <View style={styles.qrBox}>
        <Image
          source={require('../assets/qr_placeholder.png')} // TODO: 실제 QR 이미지로 교체
          style={styles.qrImage}
        />
        <TouchableOpacity style={styles.downloadIcon}>
          <Text style={{ fontSize: 16 }}>⬇️</Text>
        </TouchableOpacity>
      </View>

      {/* 주소 텍스트 + 복사 아이콘 */}
      <View style={styles.addressRow}>
        <Text style={styles.addressText}>주소: {walletAddress}</Text>
        <TouchableOpacity onPress={handleCopy}>
          <Image
            source={require('../assets/copy_icon.png')}
            style={styles.copyIcon}
          />
        </TouchableOpacity>
      </View>

      {/* 공유하기 버튼 */}
      <CommonButton label="공유하기" onPress={handleShare} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 24,
    right: 24,
    zIndex: 10,
  },
  closeText: {
    fontSize: 24,
    color: '#666',
  },
  qrBox: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 12,
    padding: 24,
    marginBottom: 24,
    position: 'relative',
  },
  qrImage: {
    width: 160,
    height: 160,
  },
  downloadIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  addressRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  addressText: {
    fontSize: 14,
    color: '#000',
    marginRight: 8,
  },
  copyIcon: {
    width: 16,
    height: 16,
  },
});