import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import CommonButton from '../components/CommonButton';
import Clipboard from '@react-native-clipboard/clipboard';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

export default function AddressInputScreen() {
  const [address, setAddress] = useState('');
  const [showScanner, setShowScanner] = useState(false);

  const handlePasteFromClipboard = async () => {
    const content = await Clipboard.getString();
    setAddress(content.trim());
  };

  const handleScanSuccess = (e: { data: string }) => {
    setAddress(e.data.trim());
    setShowScanner(false);
  };

  const handleConfirm = () => {
    console.log('입력한 주소:', address);
    // TODO: 주소 유효성 검사 및 다음 단계
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.wrapper}
    >
      <View style={styles.container}>
        <Text style={styles.label}>수신자 주소 입력</Text>

        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="0x1234...abcd"
            value={address}
            onChangeText={setAddress}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TouchableOpacity onPress={handlePasteFromClipboard}>
            <Text style={{ fontSize: 18, marginLeft: 8 }}>📋</Text>
          </TouchableOpacity>
        </View>

        {/* QR 버튼은 아래로 배치 */}
        <TouchableOpacity style={styles.qrButton} onPress={() => setShowScanner(true)}>
          <Text style={styles.qrButtonText}>📷 QR로 주소 스캔</Text>
        </TouchableOpacity>

        {/* 하단 버튼 */}
        <CommonButton label="다음" onPress={handleConfirm} />

        {/* QR 스캐너 */}
        <Modal visible={showScanner} animationType="slide">
          <QRCodeScanner
            onRead={handleScanSuccess}
            flashMode={RNCamera.Constants.FlashMode.off}
            topContent={
              <Text style={styles.scannerLabel}>QR 코드를 스캔해주세요</Text>
            }
            bottomContent={
              <TouchableOpacity onPress={() => setShowScanner(false)}>
                <Text style={styles.cancelText}>닫기</Text>
              </TouchableOpacity>
            }
          />
        </Modal>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 120,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 14,
    alignSelf: 'flex-start',
    marginBottom: 8,
    color: '#000',
  },
  inputRow: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
    backgroundColor: '#fafafa',
  },
  input: {
    flex: 1,
    fontSize: 14,
  },
  qrButton: {
    marginBottom: 24,
  },
  qrButtonText: {
    color: '#002366',
    fontSize: 15,
  },
  scannerLabel: {
    marginTop: 40,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  cancelText: {
    marginTop: 24,
    fontSize: 16,
    color: 'blue',
    textAlign: 'center',
  },
});