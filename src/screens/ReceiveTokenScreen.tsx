import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Clipboard from '@react-native-clipboard/clipboard';
import CommonButton from '../components/CommonButton';
import * as Keychain from 'react-native-keychain';
import Share from 'react-native-share';
import RNFS from 'react-native-fs';

const WALLET_KEY = 'wallet';

export default function ReceiveTokenScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [qrUri, setQrUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStoredAddress = async () => {
      try {
        const creds = await Keychain.getGenericPassword({ service: WALLET_KEY });

        if (creds) {
          setWalletAddress(creds.password);
          setQrUri(`https://moply.me/sock/wallets/qrcode?address=${creds.password}`);
        } else {
          console.warn('저장된 주소가 없습니다.');
        }
      } catch (error) {
        console.error('QR 코드 로드 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStoredAddress();
  }, []);

  const handleCopy = () => {
    if (walletAddress) {
      Clipboard.setString(walletAddress);
      console.log('주소 복사됨:', walletAddress);
    }
  };

  const handleShare = async () => {
    if (!qrUri) return;

    try {
      const fileName = 'qr_share.png';
      const path = `${RNFS.CachesDirectoryPath}/${fileName}`;

      const downloadResult = await RNFS.downloadFile({
        fromUrl: qrUri,
        toFile: path,
      }).promise;

      if (downloadResult.statusCode === 200) {
        await Share.open({
          url: 'file://' + path,
          type: 'image/png',
          failOnCancel: false,
        });
      } else {
        console.warn('QR 다운로드 실패');
      }
    } catch (err) {
      console.error('공유 실패:', err);
    }
  };

  const handleClose = () => {
    navigation.goBack();
  };

  const renderFormattedAddress = (address: string) => {
    if (address.length <= 40) return address;
    return `${address.slice(0, 8)}...${address.slice(-8)}`;
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* 닫기 버튼 */}
      <TouchableOpacity
        onPress={handleClose}
        style={[styles.closeButton, { top: insets.top + 8 }]}
      >
        <Text style={styles.closeText}>×</Text>
      </TouchableOpacity>

      {/* QR 코드 */}
      <View style={styles.qrBox}>
        {loading ? (
          <ActivityIndicator size="large" />
        ) : qrUri ? (
          <Image source={{ uri: qrUri }} style={styles.qrImage} />
        ) : (
          <Text style={{ color: '#999' }}>QR 코드 불러오기 실패</Text>
        )}
      </View>

      {/* 주소 줄임 표시 + 복사 */}
      <View style={styles.addressWrapper}>
        <Text style={styles.addressText}>
          {walletAddress ? renderFormattedAddress(walletAddress) : '로딩 중...'}
        </Text>
        <TouchableOpacity onPress={handleCopy}>
          <Image
            source={require('../assets/icon/copy_icon.png')}
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
    paddingHorizontal: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  closeButton: {
    position: 'absolute',
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
    marginBottom: 20,
    position: 'relative',
  },
  qrImage: {
    width: 160,
    height: 160,
    resizeMode: 'contain',
  },
  addressWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  addressText: {
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
    lineHeight: 20,
    marginRight: 8,
  },
  copyIcon: {
    width: 20,
    height: 20,
    tintColor: '#333',
  },
});