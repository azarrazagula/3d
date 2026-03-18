import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { colors } from '../theme/colors';

export default function CheckoutModal({ visible, onCancel, onConfirm }) {
  const [name, setName] = useState('');
  const [street, setStreet] = useState('');
  const [postal, setPostal] = useState('');
  const [city, setCity] = useState('');

  const handleConfirm = () => {
    if (!name.trim() || !street.trim() || !postal.trim() || !city.trim()) {
      return; // Basic validation
    }
    onConfirm();
    // Optional: reset fields
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onCancel}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.backdrop}
      >
        <View style={styles.modalView}>
          <Text style={styles.title}>Delivery Details</Text>
          
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.formControl}>
              <Text style={styles.label}>Your Name</Text>
              <TextInput style={styles.input} value={name} onChangeText={setName} />
            </View>
            <View style={styles.formControl}>
              <Text style={styles.label}>Street</Text>
              <TextInput style={styles.input} value={street} onChangeText={setStreet} />
            </View>
            <View style={styles.formControl}>
              <Text style={styles.label}>Postal Code</Text>
              <TextInput style={styles.input} value={postal} onChangeText={setPostal} />
            </View>
            <View style={styles.formControl}>
              <Text style={styles.label}>City</Text>
              <TextInput style={styles.input} value={city} onChangeText={setCity} />
            </View>
          </ScrollView>

          <View style={styles.actionsRow}>
            <TouchableOpacity style={[styles.btn, styles.btnAlt]} onPress={onCancel}>
              <Text style={styles.btnAltText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={handleConfirm}>
              <Text style={styles.btnText}>Confirm Order</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
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
    width: '100%',
    maxHeight: '90%',
    backgroundColor: 'rgba(15, 17, 26, 0.98)',
    borderRadius: 20,
    padding: 24,
    borderColor: colors.border,
    borderWidth: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 20,
  },
  formControl: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: colors.textMuted,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderColor: colors.border,
    borderWidth: 1,
    color: 'white',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 16,
    marginTop: 24,
  },
  btn: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 9999,
  },
  btnText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  btnAlt: {
    backgroundColor: 'transparent',
    borderColor: colors.primary,
    borderWidth: 1,
  },
  btnAltText: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: 16,
  },
});
