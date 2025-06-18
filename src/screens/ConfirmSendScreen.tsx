import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootStackParamList';
import * as Keychain from 'react-native-keychain';
import CommonButton from '../components/CommonButton';

type Route = RouteProp<RootStackParamList, 'ConfirmSend'>;
type Navigation = NativeStackNavigationProp<RootStackParamList>;

export default function ConfirmSendScreen() {
  const route = useRoute<Route>();
  const navigation = useNavigation<Navigation>();
  const { amount, token, toAddress, gasFee, balance } = route.params;

  const [loading, setLoading] = useState(false);
  const shortenAddress = (addr: string) =>
    `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  const handleSend = async () => {
    const userBalance = parseFloat(balance);
    const total = parseFloat(amount) + parseFloat(gasFee);

    if (userBalance < total) {
      Alert.alert(
        '송금 불가',
        `현재 잔액이 부족합니다.\n현재 잔액: ${userBalance.toFixed(6)}\n필요 금액: ${total.toFixed(6)}`
      );
      return;
    }

    setLoading(true);
    try {
      const creds = await Keychain.getGenericPassword({ service: 'wallet' });
      if (!creds) {
        Alert.alert('에러', '지갑 정보가 없습니다.');
        return;
      }

      const rawPrivateKey = creds.username;
      const normalizedPrivateKey = rawPrivateKey.replace(/^0x/, '');

      // ✅ 서버에서 송금 가능 여부 최종 확인
      const checkRes = await fetch(
        `https://moply.me/sock/wallets/check?to=${toAddress}&amount=${amount}&private_key=${normalizedPrivateKey}`
      );
      const checkData = await checkRes.json();

      if (!checkRes.ok || !checkData.can_send) {
        Alert.alert('송금 불가', '서버 확인 결과: 잔액 부족 또는 가스비 부족');
        return;
      }

      // ✅ 실제 송금 요청
      const sendUrl = `https://moply.me/sock/wallets/send?to=${toAddress}&amount=${amount}&private_key=${normalizedPrivateKey}`;
      console.log('📡 송금 요청:', sendUrl);

      const sendRes = await fetch(sendUrl, {
        method: 'GET',
        headers: {
          'X-User-Address': creds.password, // 지갑 주소를 헤더로 전송
        },
      });
      const sendData = await sendRes.json();

      if (sendRes.ok && sendData.tx_hash) {
        console.log('✅ 트랜잭션 해시:', sendData.tx_hash);
        Alert.alert(
          '송금 완료',
          '토큰 전송이 성공적으로 완료되었습니다.',
          [{ text: '확인', onPress: () => navigation.navigate('Main') }]
        );
      } else {
        Alert.alert('❌ 송금 실패', sendData.error ?? '송금 처리 중 문제가 발생했습니다.');
      }
    } catch (err) {
      console.error('❌ 송금 오류:', err);
      Alert.alert('오류', '송금 중 문제가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.description}>
        <Text style={styles.address}>{shortenAddress(toAddress)}</Text>로{'\n'}
        <Text style={styles.amount}>{amount} {token}</Text>을 보내시겠습니까?
      </Text>

      <Text style={styles.feeText}>
        수수료: {gasFee ? `${gasFee} ${token}` : '계산 중...'}
      </Text>

      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 40 }} />
      ) : (
        <>
          <CommonButton label="보내기" onPress={handleSend} />
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 16 }}>
            <Text style={styles.cancel}>취소</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 24,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 28,
  },
  address: {
    fontWeight: '500',
    color: '#000',
  },
  amount: {
    fontWeight: 'bold',
  },
  feeText: {
    fontSize: 13,
    color: '#888',
    marginBottom: 40,
  },
  cancel: {
    fontSize: 14,
    color: '#aaa',
  },
});