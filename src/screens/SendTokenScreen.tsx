import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import CommonButton from '../components/CommonButton';
import { RootStackParamList } from '../navigation/RootStackParamList';

type RecentAddress = {
  address: string;
  last_used: string;
};

export default function SendTokenScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const insets = useSafeAreaInsets();

  const [address, setAddress] = useState('');
  const [recentAddresses, setRecentAddresses] = useState<RecentAddress[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecentAddresses = async () => {
      try {
        const res = await fetch('http://43.201.26.30:8080/wallets/recent');
        const data: RecentAddress[] = await res.json();
        setRecentAddresses(data);
      } catch (error) {
        console.error('최근 주소 불러오기 실패:', error);
      }
    };

    fetchRecentAddresses();
  }, []);

  const handlePaste = async () => {
    const content = await Clipboard.getString();
    setAddress(content);
    setError('');
  };

  const handleRecentPress = (addr: string) => {
    Clipboard.setString(addr);
    setAddress(addr);
    setError('');
  };

  const validateAndProceed = () => {
    setError('');

    if (!address.trim()) {
      setError('주소를 입력해주세요.');
      return;
    }

    const isValidEthereumAddress = /^0x[a-fA-F0-9]{40}$/.test(address);
    if (!isValidEthereumAddress) {
      setError('올바른 이더리움 주소 형식이 아닙니다.');
      return;
    }

    navigation.navigate('SelectAmount');
  };

  const renderItem = ({ item }: { item: RecentAddress }) => (
    <TouchableOpacity style={styles.recentItem} onPress={() => handleRecentPress(item.address)}>
      <Image source={require('../assets/avatar/avatar1.png')} style={styles.avatar} />
      <View>
        <Text style={styles.accountLabel}>{item.address.slice(0, 6)}...{item.address.slice(-4)}</Text>
        <Text style={styles.accountAddress}>
          최근 사용: {new Date(item.last_used).toLocaleString()}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
      >
        {/* 상단 영역 */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.cancel}>취소</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('QRScanner')}>
            <Image source={require('../assets/icon/qrcode_icon.png')} style={styles.qrIcon} />
          </TouchableOpacity>
        </View>

        {/* 입력창 */}
        <Text style={styles.label}>수신자 주소 입력</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="0x1234...abcd"
            value={address}
            onChangeText={(text) => {
              setAddress(text);
              setError('');
            }}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TouchableOpacity onPress={handlePaste}>
            <Image source={require('../assets/icon/copy_icon.png')} style={styles.pasteIcon} />
          </TouchableOpacity>
        </View>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {/* 최근 보낸 주소 */}
        <Text style={styles.recentTitle}>최근 보낸 주소</Text>
        <FlatList
          data={recentAddresses}
          renderItem={renderItem}
          keyExtractor={(item) => item.address}
        />

        {/* 버튼 */}
        <CommonButton label="다음" onPress={validateAndProceed} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cancel: {
    fontSize: 14,
    color: '#000',
  },
  qrIcon: {
    width: 20,
    height: 20,
  },
  label: {
    fontSize: 14,
    marginTop: 40,
    marginBottom: 10,
  },
  inputRow: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginBottom: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    height: 44,
  },
  pasteIcon: {
    width: 15,
    height: 15,
    tintColor: '#666',
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    marginBottom: 8,
    marginTop: 4,
  },
  recentTitle: {
    fontSize: 13,
    color: '#666',
    marginTop: 20,
    marginBottom: 12,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
  },
  accountLabel: {
    fontWeight: 'bold',
  },
  accountAddress: {
    fontSize: 12,
    color: '#555',
  },
});