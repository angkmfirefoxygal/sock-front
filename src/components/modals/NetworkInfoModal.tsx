// components/modals/NetworkInfoModal.tsx
import React from 'react';
import { Modal, View, Text, StyleSheet, Pressable } from 'react-native';

type Props = {
  visible: boolean;
  onClose: () => void;
  networkInfo: {
    network: string;
    chain_id: string;
    block_number: number;
  } | null;
};

export default function NetworkInfoModal({ visible, onClose, networkInfo }: Props) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Pressable onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>×</Text>
          </Pressable>

          <View style={styles.circle}>
            <Text style={styles.checkmark}>ⓘ</Text>
          </View>

          <Text style={styles.title}>현재 네트워크 정보</Text>
          {networkInfo ? (
            <>
              <Text style={styles.subtitle}>Network: {networkInfo.network}</Text>
              <Text style={styles.subtitle}>Chain ID: {networkInfo.chain_id}</Text>
              <Text style={styles.subtitle}>Block Number: {networkInfo.block_number}</Text>
            </>
          ) : (
            <Text style={styles.subtitle}>정보를 불러오는 중입니다...</Text>
          )}
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
    minHeight: 320,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    position: 'relative',
  },
  closeButton: { position: 'absolute', top: 16, right: 16 },
  closeText: { fontSize: 20, color: '#666' },
  circle: {
    width: 80, height: 80, borderRadius: 40, backgroundColor: '#073686',
    justifyContent: 'center', alignItems: 'center', marginBottom: 24, marginTop: 30,
  },
  checkmark: { color: '#fff', fontSize: 32 },
  title: { fontSize: 16, fontWeight: 'bold', color: '#000', marginBottom: 15, textAlign: 'center' },
  subtitle: { fontSize: 13, color: '#888', marginBottom: 8, textAlign: 'center' },
});