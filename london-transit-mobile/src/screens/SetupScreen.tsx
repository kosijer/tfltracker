import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import { RootStackParamList } from '../types';
import { saveApiKey } from '../utils/storage';
import { validateApiKey } from '../services/api';
import { TFL_API_KEY_URL } from '../constants';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Setup'>;
};

export default function SetupScreen({ navigation }: Props) {
  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const trimmedKey = apiKey.trim();
    
    if (!trimmedKey) {
      Alert.alert('Error', 'Please enter your TfL API key');
      return;
    }

    setLoading(true);

    try {
      // Validate the API key
      const isValid = await validateApiKey(trimmedKey);
      
      if (!isValid) {
        Alert.alert(
          'Invalid API Key',
          'The API key you entered appears to be invalid. Please check and try again.'
        );
        setLoading(false);
        return;
      }

      // Save the API key
      await saveApiKey(trimmedKey);
      
      // Navigate to home
      navigation.replace('Home');
    } catch (error) {
      Alert.alert(
        'Error',
        'Failed to validate API key. Please check your internet connection and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const openInstructions = () => {
    navigation.navigate('Instructions');
  };

  const openTfLWebsite = () => {
    Linking.openURL(TFL_API_KEY_URL);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Ionicons name="train" size={48} color="#1C3F94" />
          </View>
          <Text style={styles.title}>TfL Tracker</Text>
          <Text style={styles.subtitle}>
            Live departures for London transport
          </Text>
        </View>

        {/* API Key Input */}
        <View style={styles.inputSection}>
          <Text style={styles.label}>TfL API Key</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your API key"
            placeholderTextColor="#999"
            value={apiKey}
            onChangeText={setApiKey}
            autoCapitalize="none"
            autoCorrect={false}
            editable={!loading}
          />
          <Text style={styles.helperText}>
            You need a free TfL API key to use this app
          </Text>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={[styles.submitButton, loading && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Ionicons name="checkmark-circle" size={20} color="#fff" />
              <Text style={styles.submitButtonText}>Get Started</Text>
            </>
          )}
        </TouchableOpacity>

        {/* Instructions Link */}
        <View style={styles.linksSection}>
          <TouchableOpacity style={styles.linkButton} onPress={openInstructions}>
            <Ionicons name="help-circle-outline" size={20} color="#1C3F94" />
            <Text style={styles.linkText}>How to get an API key</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.linkButton} onPress={openTfLWebsite}>
            <Ionicons name="open-outline" size={20} color="#1C3F94" />
            <Text style={styles.linkText}>Open TfL API Portal</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E8EEF7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1C3F94',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  inputSection: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    color: '#333',
  },
  helperText: {
    fontSize: 12,
    color: '#888',
    marginTop: 8,
  },
  submitButton: {
    backgroundColor: '#1C3F94',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  linksSection: {
    marginTop: 32,
    gap: 12,
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 12,
  },
  linkText: {
    color: '#1C3F94',
    fontSize: 16,
  },
});

