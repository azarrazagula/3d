import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../theme/colors';
import { Ionicons } from '@expo/vector-icons';

export default function Header({ cartItemsCount, onOpenCart, onLogout }) {
  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <Text style={styles.logo}>
          Crave<Text style={styles.logoHighlight}>Tracker</Text>
        </Text>
        
        <View style={styles.actions}>
          <TouchableOpacity style={styles.cartBtn} onPress={onOpenCart} activeOpacity={0.8}>
            <Ionicons name="cart" size={18} color={colors.primary} />
            <Text style={styles.cartText}>Cart</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cartItemsCount}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.logoutBtn} onPress={onLogout} activeOpacity={0.8}>
            <Ionicons name="log-out-outline" size={20} color={colors.textMuted} />
          </TouchableOpacity>
        </View>
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
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cartBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    borderColor: 'rgba(255, 68, 68, 0.2)',
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 9999,
  },
  logoutBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartText: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 6,
  },
  badge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 9999,
    marginLeft: 6,
  },
  badgeText: {
    color: 'white',
    fontSize: 11,
    fontWeight: 'bold',
  },
});
