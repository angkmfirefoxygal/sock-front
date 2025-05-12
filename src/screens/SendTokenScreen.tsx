// src/screens/SendTokenScreen.tsx
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
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
import CommonButton from '../components/CommonButton';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootStackParamList';

const recentAddresses = [
  {
    id: '1',
    label: 'Account 2',
    address: '0x123bh45jh678907',
    avatar: require('../assets/avatar/avatar1.png'),
  },
  {
    id: '2',
    label: 'Account 3',
    address: '0x23d5547677d9809',
    avatar: require('../assets/avatar/avatar2.png'),
  },
  {
    id: '3',
    label: 'Account 4',
    address: '0xcd065095034gflv4',
    avatar: require('../assets/avatar/avatar3.png'),
  },
];

export default function SendTokenScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();    
  const insets = useSafeAreaInsets();
  const [address, setAddress] = useState('');

  const handlePaste = async () => {
    const content = await Clipboard.getString();
    setAddress(content);
  };

  const handleRecentPress = (addr: string) => {
    Clipboard.setString(addr);
    setAddress(addr);
  };

  const renderItem = ({ item }: { item: typeof recentAddresses[0] }) => (
    <TouchableOpacity style={styles.recentItem} onPress={() => handleRecentPress(item.address)}>
      <Image source={item.avatar} style={styles.avatar} />
      <View>
        <Text style={styles.accountLabel}>{item.label}</Text>
        <Text style={styles.accountAddress}>{item.address}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.safeArea]}>
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
            onChangeText={setAddress}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TouchableOpacity onPress={handlePaste}>
            <Image
              source={require('../assets/icon/paste_icon.png')}
              style={styles.pasteIcon}
            />
          </TouchableOpacity>
        </View>

        {/* 최근 보낸 주소 */}
        <Text style={styles.recentTitle}>최근 보낸 주소</Text>
        <FlatList
          data={recentAddresses}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />

        {/* 버튼 */}
        <CommonButton label="다음" onPress={() => navigation.navigate('SelectAmount')} />
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
    alignItems: 'center'
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
    marginTop:40,
    marginBottom: 10,
  },
  inputRow: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginBottom: 50,
  },
  input: {
    flex: 1,
    fontSize: 14,
    height: 44,
  },
  pasteIcon: {
    width: 18,
    height: 18,
    tintColor: '#666',
  },
  recentTitle: {
    fontSize: 13,
    color: '#666',
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