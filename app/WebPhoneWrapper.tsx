import React from 'react';
import { View, Platform, StyleSheet, ScrollView } from 'react-native';

type Props = {
  children: React.ReactNode;
};

export default function WebPhoneWrapper({ children }: Props) {
  if (Platform.OS !== 'web') return <>{children}</>;

  return (
    <View style={styles.outer}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>{children}</View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#e5e5e5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 24,
  },
  container: {
    width: 390,
    height: 844,
    backgroundColor: '#fff',
    borderRadius: 24,
    overflow: 'hidden',
    boxShadow: '0 0 20px rgba(0,0,0,0.2)',
  },
});
