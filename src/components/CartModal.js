import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView, Image, Platform } from 'react-native';
import { colors } from '../theme/colors';

export default function CartModal({
  visible,
  cartItems,
  onClose,
  onRemoveItem,
  onAddItem,
  onOrder,
}) {
  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.amount, 0);

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.modalView}>
          <Text style={styles.title}>Shopping Cart</Text>
          
          <ScrollView style={styles.cartItems} showsVerticalScrollIndicator={false}>
            {cartItems.length === 0 ? (
              <Text style={styles.emptyText}>Your cart is empty.</Text>
            ) : (
              cartItems.map((item) => (
                <View key={item.id} style={styles.cartItem}>
                  <Image source={item.image} style={styles.itemImage} />
                  <View style={styles.cartItemInfo}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <View style={styles.itemSummary}>
                      <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
                      <Text style={styles.itemAmount}>x {item.amount}</Text>
                    </View>
                  </View>
                  <View style={styles.cartItemActions}>
                    <TouchableOpacity style={styles.actionBtn} onPress={() => onRemoveItem(item.id)}>
                      <Text style={styles.actionBtnText}>−</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionBtn} onPress={() => onAddItem(item.id)}>
                      <Text style={styles.actionBtnText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            )}
          </ScrollView>

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalValue}>${totalAmount.toFixed(2)}</Text>
          </View>

          <View style={styles.actionsRow}>
            <TouchableOpacity style={[styles.btn, styles.btnAlt]} onPress={onClose}>
              <Text style={styles.btnAltText}>Close</Text>
            </TouchableOpacity>
            {cartItems.length > 0 && (
              <TouchableOpacity style={styles.btn} onPress={onOrder}>
                <Text style={styles.btnText}>Order</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalView: {
    width: Platform.OS === 'web' ? '60%' : '90%',
    maxWidth: Platform.OS === 'web' ? 600 : '100%',
    maxHeight: '90%',
    backgroundColor: 'rgba(15, 17, 26, 0.98)',
    borderRadius: 20,
    padding: 24,
    borderColor: colors.border,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
    marginBottom: 20,
  },
  cartItems: {
    marginBottom: 20,
  },
  emptyText: {
    textAlign: 'center',
    color: colors.textMuted,
    padding: 20,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginBottom: 12,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 12,
  },
  itemImage: {
    width: Platform.OS === 'web' ? 120 : 60,
    height: Platform.OS === 'web' ? 120 : 60,
    borderRadius: 8,
    marginRight: 16,
  },
  cartItemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '600',
    marginBottom: 4,
  },
  itemSummary: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  itemPrice: {
    fontWeight: '700',
    color: colors.primary,
    fontSize: 14,
  },
  itemAmount: {
    fontWeight: '600',
    color: colors.text,
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    fontSize: 12,
  },
  cartItemActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionBtnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 20,
    marginBottom: 24,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 16,
  },
  btn: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 9999,
  },
  btnText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  btnAlt: {
    backgroundColor: 'transparent',
    borderColor: colors.primary,
    borderWidth: 1,
  },
  btnAltText: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: 14,
  },
});
