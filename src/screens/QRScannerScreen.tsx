import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, PermissionsAndroid, Platform, Alert } from 'react-native';
import Header from '../components/Header';

export default function QRScannerScreen() {
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    const requestCameraPermission = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: '카메라 권한 요청',
              message: 'QR 스캔을 위해 카메라 권한이 필요합니다.',
              buttonNeutral: '나중에',
              buttonNegative: '거부',
              buttonPositive: '허용',
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('✅ 카메라 권한 허용됨');
            setHasPermission(true);
          } else {
            console.log('❌ 카메라 권한 거부됨');
            Alert.alert('카메라 권한이 거부되었습니다.');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };

    requestCameraPermission();
  }, []);

  return (
    <View style={styles.container}>
      <Header title="QR 스캐너" />
      <View style={styles.content}>
        <Text style={styles.text}>
          {hasPermission
            ? '카메라 권한 허용됨. 나중에 스캐너 추가할 수 있어요.'
            : '카메라 권한 확인 중...'}
        </Text>
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