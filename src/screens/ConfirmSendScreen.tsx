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
import { RootStackParamList } from '../navigation/RootStackParamList';
import * as Keychain from 'react-native-keychain';
import CommonButton from '../components/CommonButton';

type Route = RouteProp<RootStackParamList, 'ConfirmSend'>;

export default function ConfirmSendScreen() {
  const route = useRoute<Route>();
  const navigation = useNavigation();
  const { amount, token } = route.params;

  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    setLoading(true);
    try {
      const creds = await Keychain.getGenericPassword({ service: 'wallet' });
      if (!creds) {
        Alert.alert('에러', '지갑 정보가 없습니다.');
        return;
      }

      const privateKey = creds.username;
      const toAddress = creds.password;

      const res = await fetch(
        `http://43.201.26.30:8080/wallets/check?to=${toAddress}&amount=${amount}&private_key=${privateKey}`
      );
      const data = await res.json();

      if (res.ok && data.can_send) {
        Alert.alert('성공', '송금 가능합니다! (TODO: 실제 전송 처리)');
        // TODO: /wallets/send API로 실제 송금 구현
      } else {
        Alert.alert('송금 불가', '잔액 부족 또는 오류로 송금이 불가능합니다.');
      }
    } catch (err) {
      console.error('❌ 송금 확인 오류:', err);
      Alert.alert('오류', '송금 가능 여부 확인 중 문제가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.description}>
        <Text style={styles.address}>0×1234567895435</Text>로{'\n'}
        <Text style={styles.amount}>{amount} {token}</Text>을 보내시겠습니까?
      </Text>

      <Text style={styles.feeText}>수수료: {token === 'POL' ? '0.1 POL' : '네트워크 기준 가스비'}</Text>

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