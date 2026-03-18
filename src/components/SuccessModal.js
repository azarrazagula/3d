import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Platform } from 'react-native';
import { colors } from '../theme/colors';

export default function SuccessModal({ visible, onClose }) {
  return (
    <Modal visible={visible} animationType="fade" transparent={true} onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.modalView}>
          <Text style={styles.title}>🎉 Order Placed Successfully!</Text>
          <Text style={styles.text}>Your delicious meal is being prepared and will be tracked shortly.</Text>
          
          <TouchableOpacity style={styles.btn} onPress={onClose}>
            <Text style={styles.btnText}>Back to Menu</Text>
          </TouchableOpacity>
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
    width: Platform.OS === 'web' ? '50%' : '90%',
    maxWidth: Platform.OS === 'web' ? 500 : '100%',
    backgroundColor: 'rgba(15, 17, 26, 0.98)',
    borderRadius: 20,
    padding: 32,
    borderColor: colors.border,
    borderWidth: 1,
    alignItems: 'center',
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 30,
    elevation: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.success,
    marginBottom: 16,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    color: colors.textMuted,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  btn: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 9999,
  },
  btnText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});
