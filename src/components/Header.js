import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../theme/colors';
import { Ionicons } from '@expo/vector-icons';

export default function Header({ cartItemsCount, onOpenCart }) {
  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <Text style={styles.logo}>
          Crave<Text style={styles.logoHighlight}>Tracker</Text>
        </Text>
        
        <TouchableOpacity style={styles.cartBtn} onPress={onOpenCart} activeOpacity={0.8}>
          <Ionicons name="cart" size={20} color={colors.primary} />
          <Text style={styles.cartText}>Your Cart</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{cartItemsCount}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 100, // Includes status bar height on non-safe area handling if not using provider, but we will likely use SafeAreaView in App.js
    backgroundColor: 'rgba(9, 10, 15, 0.85)',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    justifyContent: 'flex-end',
    paddingBottom: 15,
    zIndex: 50,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    letterSpacing: -0.5,
  },
  logoHighlight: {
    color: colors.primary,
  },
  cartBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 9999,
    gap: 8,
  },
  cartText: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 6,
  },
  badge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 9999,
    marginLeft: 6,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
