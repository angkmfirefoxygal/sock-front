import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';

type WalletCreationModalProps = {
  visible: boolean;
  onClose: () => void;
  onSelectHardware: () => void;
  onSelectMobile: () => void;
};

export default function WalletCreationModal({
  visible,
  onClose,
  onSelectHardware,
  onSelectMobile,
}: WalletCreationModalProps) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* 닫기 버튼 (오른쪽 상단 X) */}
          <Pressable onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>×</Text>
          </Pressable>

          {/* 체크 아이콘 원형 */}
          <View style={styles.circle}>
            <Text style={styles.checkmark}>✓</Text>
          </View>

          {/* 타이틀 / 설명 */}
          <Text style={styles.title}>지갑 생성 방법을 선택해주세요</Text>
          <Text style={styles.subtitle}>도움말입니다</Text>

          {/* 버튼들 */}
          <View style={{ width: '100%', marginTop: 50}}>
            <TouchableOpacity style={styles.primaryButton} onPress={onSelectHardware}>
              <Text style={styles.buttonText}>하드웨어 지갑 생성</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.secondaryButton, { marginTop: 12 }]}
              onPress={onSelectMobile}
            >
              <Text style={styles.buttonText}>모바일 지갑 생성</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    minHeight: 440,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    position: 'relative'
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  closeText: {
    fontSize: 20,
    color: '#666',
  },
  circle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#073686',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 30,
  },
  checkmark: {
    color: '#fff',
    fontSize: 32,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 13,
    color: '#888',
    marginBottom: 24,
    textAlign: 'center',
  },
  primaryButton: {
    backgroundColor: '#073686',
    borderRadius: 20,
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center'
  },
  secondaryButton: {
    backgroundColor: '#a1a7c2',
    borderRadius: 20,
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});