import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ImageBackground, 
  KeyboardAvoidingView, 
  Platform, 
  ActivityIndicator,
  Dimensions,
  Alert,
  Animated
} from 'react-native';
import { colors } from '../theme/colors';

const { width } = Dimensions.get('window');
const FIREBASE_URL = 'https://http-bfc51-default-rtdb.asia-southeast1.firebasedatabase.app/';

export default function AuthScreen({ onLogin }) {
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [stage, setStage] = useState('login'); // 'login' or 'otp'
  const [loading, setLoading] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState(null);

  // Animation values
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(30)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleGetOtp = async () => {
    if (!username.trim() || !phoneNumber.trim()) {
      Alert.alert('Error', 'Please enter both username and phone number.');
      return;
    }

    setLoading(true);
    try {
      // Simulate OTP generation
      const mockOtp = Math.floor(1000 + Math.random() * 9000).toString();
      setGeneratedOtp(mockOtp);

      // Save to Firebase
      await fetch(`${FIREBASE_URL}/logins.json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          phoneNumber,
          otp: mockOtp,
          timestamp: new Date().toISOString(),
        }),
      });

      setStage('otp');
      // In a real app, this would be an SMS. Here we show an alert for testing.
      if (Platform.OS === 'web') {
        alert(`Debug OTP: ${mockOtp}`);
      } else {
        Alert.alert('OTP Sent', `Your OTP is: ${mockOtp}`);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to connect to backend.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = () => {
    if (otp === generatedOtp) {
      onLogin(username);
    } else {
      Alert.alert('Error', 'Invalid OTP. Please try again.');
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
      <Animated.View 
        style={[
          styles.glassCard, 
          { 
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <Text style={styles.title}>CraveTracker</Text>
        <Text style={styles.subtitle}>
          {stage === 'login' ? 'Welcome! Please login to continue.' : 'Enter the 4-digit code sent to your phone.'}
        </Text>

        {stage === 'login' ? (
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Username</Text>
              <TextInput 
                style={styles.input} 
                placeholder="Enter your name"
                placeholderTextColor="rgba(255,255,255,0.4)"
                value={username}
                onChangeText={setUsername}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Phone Number</Text>
              <TextInput 
                style={styles.input} 
                placeholder="e.g. +91 9876543210"
                placeholderTextColor="rgba(255,255,255,0.4)"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
              />
            </View>

            <TouchableOpacity 
              style={styles.button} 
              onPress={handleGetOtp}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.buttonText}>Get OTP</Text>
              )}
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>OTP Code</Text>
              <TextInput 
                placeholder="0 0 0 0"
                placeholderTextColor="rgba(255,255,255,0.4)"
                keyboardType="number-pad"
                maxLength={4}
                value={otp}
                onChangeText={setOtp}
                textAlign="center"
                style={[styles.input, { letterSpacing: 10, fontSize: 24 }]}
              />
            </View>

            <TouchableOpacity 
              style={styles.button} 
              onPress={handleVerifyOtp}
            >
              <Text style={styles.buttonText}>Verify & Enter</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.backButton} 
              onPress={() => setStage('login')}
            >
              <Text style={styles.backButtonText}>Change Number</Text>
            </TouchableOpacity>
          </View>
        )}
      </Animated.View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(9, 10, 15, 0.8)',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  glassCard: {
    width: Platform.OS === 'web' ? Math.min(width * 0.9, 400) : '100%',
    padding: 32,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 20,
  },
  form: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
    textTransform: 'uppercase',
    marginBottom: 8,
    letterSpacing: 1,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    height: 50,
    paddingHorizontal: 16,
    color: 'white',
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  button: {
    backgroundColor: colors.primary,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
  backButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  backButtonText: {
    color: colors.textMuted,
    fontSize: 14,
  }
});
