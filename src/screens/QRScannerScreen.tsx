import React, { useEffect, useState } from 'react';
import { Image, View,Text, StyleSheet, PermissionsAndroid, Platform } from 'react-native';
import Header from '../components/Header';

export default function QRScannerScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    const requestPermission = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: '카메라 권한 요청',
              message: 'QR 스캔 기능을 위해 카메라 권한이 필요합니다.',
              buttonPositive: '확인',
            }
          );
          setHasPermission(granted === PermissionsAndroid.RESULTS.GRANTED);
        } catch (e) {
          console.warn('카메라 권한 요청 실패:', e);
          setHasPermission(false);
        }
      } else {
        setHasPermission(true);
      }
    };

    requestPermission();
  }, []);

  return (
    <View style={styles.container}>
      <Header title="QR 스캐너" />
      <View style={styles.circle}>
      <Image
        source={require('../assets/logo/SOCK_logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
      
      <Text style={styles.info}>
        현재는 QR 코드 스캔 기능이 비활성화되어 있습니다. {'\n'}
        추후 업데이트에서 연결될 예정입니다.
      </Text>
      {hasPermission === false && (
        <Text style={styles.error}>카메라 권한이 허용되지 않았습니다.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  circle: {
    width: 160,
    height: 160,
    backgroundColor: '#002366',
    borderRadius: 80,
    marginTop: 60,
    marginBottom: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 60,
    color: '#fff',
  },
  label: {
    fontSize: 14,
    alignSelf: 'flex-start',
    marginBottom: 4,
    color: '#000',
  },
  info: {
    fontSize: 14,
    color: '#444',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 12,
  },
  error: {
    color: 'red',
    fontSize: 13,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  logo: {
    width: 120,
    height: 120,
  },
});