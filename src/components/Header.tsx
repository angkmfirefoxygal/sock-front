import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

export type HeaderProps = {
  title: string;
  onPressLeft?: () => void;
};

export default function Header({ title, onPressLeft }: HeaderProps) {
  const insets = useSafeAreaInsets();
  const topPadding = insets.top > 30 ? insets.top - 10 : insets.top;

  return (
    <SafeAreaView style={[styles.wrapper, { paddingTop: topPadding }]}>
      <View style={styles.container}>
        {/* 왼쪽 취소 버튼 */}
        {onPressLeft ? (
          <Pressable onPress={onPressLeft} style={styles.leftButton}>
            <Text style={styles.leftText}>취소</Text>
          </Pressable>
        ) : (
          <View style={styles.leftButtonPlaceholder} />
        )}

        {/* 중앙 타이틀 */}
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>{title}</Text>
        </View>

        {/* 오른쪽 공간 확보용 뷰 */}
        <View style={styles.rightPlaceholder} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    borderBottomWidth: 0.5,
    borderColor: '#ddd',
  },
  container: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  titleWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  leftButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  leftText: {
    color: '#002366',
    fontSize: 14,
  },
  leftButtonPlaceholder: {
    width: 40,
  },
  rightPlaceholder: {
    width: 40,
  },
});