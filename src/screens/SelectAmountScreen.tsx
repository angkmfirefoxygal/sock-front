import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import CommonButton from '../components/CommonButton';
import { RootStackParamList } from '../navigation/RootStackParamList';
import * as Keychain from 'react-native-keychain';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const tokens = [
  { label: 'ETH', value: 'ETH' },
  { label: 'POL', value: 'POL' },
];

export default function SelectAmountScreen() {

  type Navigation = NativeStackNavigationProp<RootStackParamList, 'SelectAmount'>;
 const navigation = useNavigation<Navigation>();
  const [amount, setAmount] = useState('');
  const [token, setToken] = useState('ETH');
  const [open, setOpen] = useState(false);
  const [gasFee, setGasFee] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    const fetchGas = async () => {
      try {
        const res = await fetch('http://43.201.26.30:8080/wallets/gas');
        const data = await res.json();
        const proposeGas = parseFloat(data.ProposeGasPrice); // Gwei
        const fee = (proposeGas * 21000) / 1e9; // ETH
        setGasFee(fee.toFixed(6));
      } catch (err) {
        console.error('가스비 불러오기 실패:', err);
        setGasFee(null);
      }
    };

    const fetchBalance = async () => {
      try {
        const creds = await Keychain.getGenericPassword({ service: 'wallet' });
        if (!creds) return;
        const address = creds.password;
        const res = await fetch(`http://43.201.26.30:8080/wallets/balance?address=${address}`);
        const data = await res.json();
        setBalance(Number(data.balance));
      } catch (err) {
        console.error('잔액 불러오기 실패:', err);
      }
    };

    fetchGas();
    fetchBalance();
  }, []);

  const handleNext = () => {
    setError('');

    if (!amount) {
      setError('이체 금액을 입력해주세요.');
      return;
    }

    const inputEth = parseFloat(amount);
    if (isNaN(inputEth)) {
      setError('숫자만 입력해주세요.');
      return;
    }

    if (balance !== null && inputEth > balance / 1e18) {
      setError(`현재 잔액은 ${(balance / 1e18).toFixed(6)} ETH 입니다.`);
      return;
    }

    // ✅ 조건 만족 → 다음 화면
    navigation.navigate('ConfirmSend', { amount, token });
  };

  return (
    <View style={styles.container}>
      {/* 상단 취소 버튼 */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.cancel}>취소</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.dropdownWrapper}>
          <DropDownPicker
            open={open}
            value={token}
            items={tokens}
            setOpen={setOpen}
            setValue={setToken}
            dropDownDirection="BOTTOM"
            style={{
              width: 100,
              height: 10,
              backgroundColor: '#073686',
              borderWidth: 0,
              borderRadius: 24,
              paddingHorizontal: 16,
            }}
            textStyle={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: 14,
            }}
            listItemLabelStyle={{ color: '#000' }}
            ArrowDownIconComponent={() => (
              <Text style={{ color: 'white', fontSize: 12 }}>▼</Text>
            )}
            ArrowUpIconComponent={() => (
              <Text style={{ color: 'white', fontSize: 12 }}>▲</Text>
            )}
            dropDownContainerStyle={{
              width: 100,
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 12,
              backgroundColor: '#fff',
            }}
            listItemContainerStyle={{
              borderBottomWidth: 1,
              borderBottomColor: '#eee',
              paddingVertical: 10,
            }}
          />
        </View>

        <Text style={styles.label}>이체 금액</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
            placeholder="0"
          />
          <Text style={styles.unit}>{token}</Text>
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Text style={styles.fee}>
          수수료: {token === 'ETH' && gasFee ? `${gasFee} ETH` : token !== 'ETH' ? '0.1 POL' : '불러오는 중...'}
        </Text>

        <CommonButton label="다음" onPress={handleNext} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: Platform.OS === 'ios' ? 60 : 24,
    backgroundColor: '#fff',
  },
  headerRow: {
    height: 40,
    justifyContent: 'center',
  },
  cancel: {
    fontSize: 14,
    color: '#000',
  },
  content: {
    flex: 1,
    marginTop: 40,
    alignItems: 'center',
  },
  dropdownWrapper: {
    alignItems: 'center',
    marginBottom: 40,
  },
  label: {
    fontSize: 14,
    alignSelf: 'flex-start',
    marginBottom: 10,
    marginTop: 25,
  },
  inputRow: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginBottom: 16,
    width: '100%',
  },
  input: {
    flex: 1,
    fontSize: 16,
    height: 44,
  },
  unit: {
    fontSize: 14,
    marginLeft: 8,
    fontWeight: 'bold',
  },
  error: {
    fontSize: 13,
    color: 'red',
    marginBottom: 8,
  },
  fee: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    marginBottom: 50,
  },
});