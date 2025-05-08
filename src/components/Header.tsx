import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

type HeaderProps = {
  title: string;
};

export default function Header({ title }: HeaderProps) {
  const insets = useSafeAreaInsets();
  const topPadding = insets.top > 30 ? insets.top - 10 : insets.top;

  return (
    <View style={[styles.container, { paddingTop: topPadding }]}>
      <Text style={styles.title}>
        {typeof title === 'string' ? title : String(title)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 12,
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});