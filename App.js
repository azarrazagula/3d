import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView, StatusBar, ImageBackground, Platform, Dimensions } from 'react-native';

import Header from './src/components/Header';
import Hero from './src/components/Hero';
import MealsList from './src/components/MealsList';
import CartModal from './src/components/CartModal';
import CheckoutModal from './src/components/CheckoutModal';
import SuccessModal from './src/components/SuccessModal';
import AuthScreen from './src/components/AuthScreen';

import { AVAILABLE_MEALS } from './src/data/meals';
import { colors } from './src/theme/colors';

const heroImage = require('./assets/images/hero_bg.png');

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartIsVisible, setCartIsVisible] = useState(false);
  const [checkoutIsVisible, setCheckoutIsVisible] = useState(false);
  const [successIsVisible, setSuccessIsVisible] = useState(false);

  // Auth Logic
  const handleLogin = (username) => {
    setCurrentUser(username);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  // Cart Logic
  const handleAddToCart = (mealId, amount) => {
    const meal = AVAILABLE_MEALS.find(m => m.id === mealId);
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(item => item.id === meal.id);
      if (existingItemIndex > -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].amount += amount;
        return updatedCart;
      }
      return [...prevCart, { id: meal.id, name: meal.name, price: meal.price, amount, image: meal.image }];
    });
  };

  const handleRemoveItem = (id) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(item => item.id === id);
      const existingItem = prevCart[existingItemIndex];
      if (existingItem.amount === 1) {
        return prevCart.filter(item => item.id !== id);
      } else {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].amount -= 1;
        return updatedCart;
      }
    });
  };

  const handleAddItem = (id) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(item => item.id === id);
      const updatedCart = [...prevCart];
      updatedCart[existingItemIndex].amount += 1;
      return updatedCart;
    });
  };

  // Modals Logic
  const handleOpenCart = () => setCartIsVisible(true);
  const handleCloseCart = () => setCartIsVisible(false);

  const handleOrder = () => {
    setCartIsVisible(false);
    setCheckoutIsVisible(true);
  };

  const handleCancelCheckout = () => {
    setCheckoutIsVisible(false);
    setCartIsVisible(true);
  };

  const handleConfirmOrder = () => {
    setCheckoutIsVisible(false);
    setSuccessIsVisible(true);
  };

  const handleCloseSuccess = () => {
    setSuccessIsVisible(false);
    setCart([]);
  };

  const totalCartItems = cart.reduce((sum, item) => sum + item.amount, 0);

  if (!currentUser) {
    return <AuthScreen onLogin={handleLogin} />;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      {/* Fixed Background Layer */}
      <View style={StyleSheet.absoluteFill}>
        <ImageBackground 
          source={heroImage} 
          style={styles.fixedBackground} 
          resizeMode="cover"
        >
          <View style={styles.overlay} />
        </ImageBackground>
      </View>

      <SafeAreaView style={styles.safeArea}>
        <Header 
          cartItemsCount={totalCartItems} 
          onOpenCart={handleOpenCart} 
          onLogout={handleLogout} 
        />
        
        <ScrollView 
          showsVerticalScrollIndicator={false} 
          contentContainerStyle={styles.scrollContent}
        >
          <Hero />
          <MealsList meals={AVAILABLE_MEALS} onAddToCart={handleAddToCart} />
        </ScrollView>
      </SafeAreaView>

      {/* Modals */}
      <CartModal 
        visible={cartIsVisible} 
        cartItems={cart} 
        onClose={handleCloseCart}
        onRemoveItem={handleRemoveItem}
        onAddItem={handleAddItem}
        onOrder={handleOrder}
      />

      <CheckoutModal
        visible={checkoutIsVisible}
        onCancel={handleCancelCheckout}
        onConfirm={handleConfirmOrder}
      />

      <SuccessModal
        visible={successIsVisible}
        onClose={handleCloseSuccess}
      />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    // On web, we force the root to be viewport height to prevent gaps
    ...Platform.select({
      web: {
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
      }
    })
  },
  fixedBackground: {
    width: '100%',
    height: Platform.OS === 'web' ? '100vh' : '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(9, 10, 15, 0.85)',
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    // Ensure content container is at least full height for the background
    minHeight: Platform.OS === 'web' ? '100vh' : '100%',
  },
});
