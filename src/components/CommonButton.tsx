import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, StyleProp } from 'react-native';

type Props = {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary'; // ✅ 색상 타입
  fullWidth?: boolean; // 선택: 너비 제한 없애기
  style?: StyleProp<ViewStyle>; // ✅ 여기에 style prop 추가
 
};

export default function CommonButton({
  label,
  onPress,
  variant = 'primary',
  fullWidth = false,
}: Props) {
  const isPrimary = variant === 'primary';

  return (
    <TouchableOpacity
      style={[
        styles.button,
        isPrimary ? styles.primary : styles.secondary,
        fullWidth && { width: '100%' },
      ]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: 'center',
    marginTop:10,
    marginBottom: 10,
    maxWidth: 240,
    width: '100%',
    alignSelf: 'center',
  },
  primary: {
    backgroundColor: '#073686',
  },
  secondary: {
    backgroundColor: '#a1a7c2',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});