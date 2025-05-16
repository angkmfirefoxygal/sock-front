import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const settings = [
  { title: '일반', subtitle: '통화 변환, 언어 변경' },
  { title: '보안 & 개인정보 보호', subtitle: '비밀번호 변경, 비밀번호 복구 구문, 지갑 삭제' },
  { title: '네트워크', subtitle: '맞춤 PRC 네트워크 추가 및 편집' },
  { title: '고급', subtitle: '개발자 기능 액세스, 테스트넷 설정, 상태 로그, 계정 초기화' },
  { title: '연락처', subtitle: '계정 추가, 편집, 제거 및 관리' },
  { title: '도움말 다시 보기', subtitle: 'SOCK 사용 튜토리얼' },
  { title: '문의하기', subtitle: '' },
];

export default function SettingScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>설정</Text>
      {settings.map((item, index) => (
        <TouchableOpacity key={index} style={styles.row}>
          <View>
            <Text style={styles.label}>{item.title}</Text>
            {!!item.subtitle && <Text style={styles.sub}>{item.subtitle}</Text>}
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: 80,
    paddingHorizontal: 20,
    paddingBottom: 40,
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  row: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  sub: {
    fontSize: 13,
    color: '#666',
  },
});