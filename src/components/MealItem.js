import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import { colors } from '../theme/colors';

export default function MealItem({ meal, onAddToCart }) {
  const [amount, setAmount] = useState('1');

  const handleAdd = () => {
    const qty = parseInt(amount, 10);
    if (!isNaN(qty) && qty > 0 && qty <= 5) {
      onAddToCart(meal.id, qty);
    }
  };

  return (
    <View style={styles.mealItem}>
      <View style={styles.imageContainer}>
        <Image source={meal.image} style={styles.image} resizeMode="cover" />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{meal.name}</Text>
        <Text style={styles.description}>{meal.description}</Text>
        
        <View style={styles.bottomRow}>
          <Text style={styles.price}>${meal.price.toFixed(2)}</Text>
          
          <View style={styles.formSection}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>QTY:</Text>
              <TextInput
                style={styles.input}
                value={amount}
                onChangeText={setAmount}
                keyboardType="number-pad"
                maxLength={1}
              />
            </View>
            <TouchableOpacity style={styles.btn} onPress={handleAdd} activeOpacity={0.8}>
              <Text style={styles.btnText}>+ Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mealItem: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 20,
    overflow: 'hidden',
    width: '100%', // Take full width of the parent (which is 800px)
  },
  imageContainer: {
    height: 220,  
    width: '100%',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  content: {
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  description: {
    color: colors.textMuted,
    fontSize: 15,
    marginBottom: 24,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  price: {
    fontWeight: '700',
    color: colors.primary,
    fontSize: 24,
  },
  formSection: {
    alignItems: 'flex-end',
    gap: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  label: {
    fontSize: 13,
    color: colors.textMuted,
    fontWeight: '600',
  },
  input: {
    width: 56,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderColor: colors.border,
    borderWidth: 1,
    color: 'white',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    textAlign: 'center',
    fontSize: 16,
  },
  btn: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 9999,
  },
  btnText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
});
