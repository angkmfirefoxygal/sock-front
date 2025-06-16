import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import CommonButton from '../components/CommonButton';
import { RootStackParamList } from '../navigation/RootStackParamList';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute, RouteProp } from '@react-navigation/native';


const tokens = [
  { label: 'POL', value: 'POL' },
  { label: 'ETH', value: 'ETH' },
];

export default function SelectAmountScreen() {
  type Navigation = NativeStackNavigationProp<RootStackParamList, 'SelectAmount'>;
  const navigation = useNavigation<Navigation>();

  const [amount, setAmount] = useState('');
  const [token, setToken] = useState('POL');
  const [open, setOpen] = useState(false);
  const [gasFee, setGasFee] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [balance, setBalance] = useState<number | null>(null);
  const route = useRoute<RouteProp<RootStackParamList, 'SelectAmount'>>();
  const { toAddress } = route.params;

  useEffect(() => {
    fetchGas();
    fetchStoredBalance();
  }, []);

  const fetchGas = async () => {
    try {
      const res = await fetch('https://moply.me/sock/wallets/gas');
      const data = await res.json();
      const gasGwei = parseFloat(data.gas_price_gwei);
      const fee = (gasGwei * 21000) / 1e9;
      setGasFee(fee.toFixed(6));
    } catch (err) {
      console.error('가스비 불러오기 실패:', err);
      setGasFee(null);
    }
  };

  const fetchStoredBalance = async () => {
    try {
      const stored = await AsyncStorage.getItem('walletBalance');
      if (stored !== null) {
        const numericBalance = Number(stored);
        console.log('✅ 저장된 잔액 불러옴:', numericBalance);
        setBalance(numericBalance);
      } else {
        console.warn('❗️ AsyncStorage에 저장된 잔액 없음');
      }
    } catch (err) {
      console.error('❌ AsyncStorage에서 잔액 불러오기 실패:', err);
    }
  };

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

    if (balance !== null && inputEth > balance) {
      setError(`현재 잔액은 ${(balance).toFixed(6)} ${token} 입니다.`);
      return;
    }

    navigation.navigate('ConfirmSend', {
      amount,
      token,
      toAddress,
      gasFee: gasFee ?? '0',
      balance: balance?.toString() ?? '0',
    });
  };

  return (
    <View style={styles.container}>
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
          수수료: {gasFee ? `${gasFee} ${token}` : '불러오는 중...'}
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