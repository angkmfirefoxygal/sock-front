//주소 진위 여부 체크 하지 않고 일단 네비게이션만 구현된 상태
//주소 진위 여부 체크!!!

import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity, Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import CommonButton from '../components/CommonButton';

const tokens = [
  { label: 'POL', value: 'POL', fee: '0.1 POL' },
  { label: 'ETH', value: 'ETH', fee: '0.005 ETH' },
];

export default function SelectAmountScreen() {
  const navigation = useNavigation();
  const [amount, setAmount] = useState('');
  const [token, setToken] = useState('POL');
  const [open, setOpen] = useState(false);

  const selected = tokens.find(t => t.value === token);

  return (
    <View style={styles.container}>
      {/* 상단 취소 버튼 */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.cancel}>취소</Text>
        </TouchableOpacity>
      </View>

      {/* 아래 컨텐츠 영역 */}
      <View style={styles.content}>
        {/* 드롭다운 */}
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
                borderWidth:0,
                borderRadius: 24,
                paddingHorizontal: 16,
            }}
            textStyle={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 14,
            }}
            listItemLabelStyle={{ color: '#000' }} // ✅ 이 부분 추가!
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
                borderRadius: 12,         // 선택적으로 모서리 둥글게
                backgroundColor: '#fff',  // 선택적으로 배경색
            }}
            listItemContainerStyle={{
                borderBottomWidth: 1,
                borderBottomColor: '#eee',
                paddingVertical: 10,
              }}
            />
        </View>

        {/* 금액 입력 */}
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

        {/* 수수료 */}
        <Text style={styles.fee}>수수료: {selected?.fee}</Text>

        {/* 버튼 */}
        <CommonButton
          label="다음"
          onPress={() => {
            // navigation.navigate('ConfirmSend', { amount, token });
          }}
        />
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
  dropdown: {
    backgroundColor: '#f0f0f0',
    borderWidth: 0,
  },
  label: {
    fontSize: 14,
    alignSelf: 'flex-start',
    marginBottom: 10,
    marginTop:25
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
  fee: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    marginBottom: 50,
  },
});
