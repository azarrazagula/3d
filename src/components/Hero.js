import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

export default function Hero() {
  return (
    <View style={styles.heroContainer}>
      <View style={styles.heroTextContainer}>
        <Text style={styles.title}>Delicious Food, Delivered To You</Text>
        <Text style={styles.subtitle}>
          Choose your favorite meal from our broad selection of available meals and enjoy a delicious lunch or dinner at home.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  heroContainer: {
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroTextContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginHorizontal: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#d1d5db',
    textAlign: 'center',
    lineHeight: 24,
  },
});
