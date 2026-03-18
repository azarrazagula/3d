import React from 'react';
import { View, StyleSheet } from 'react-native';
import MealItem from './MealItem';

export default function MealsList({ meals, onAddToCart }) {
  return (
    <View style={styles.list}>
      {meals.map((meal) => (
        <MealItem key={meal.id} meal={meal} onAddToCart={onAddToCart} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 40,
    marginTop: -40,
    zIndex: 10,
    width: '100%',
    maxWidth: 800, // Reduced for vertical single-column layout
    alignSelf: 'center',
    flexDirection: 'column',
    gap: 24,
  },
});
