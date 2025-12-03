import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import { RootStackParamList } from '../types';
import { TFL_API_KEY_URL } from '../constants';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Instructions'>;
};

export default function InstructionsScreen({ navigation }: Props) {
  const openTfLWebsite = () => {
    Linking.openURL(TFL_API_KEY_URL);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Ionicons name="key-outline" size={48} color="#1C3F94" />
          <Text style={styles.title}>Getting Your TfL API Key</Text>
        </View>

        {/* Introduction */}
        <View style={styles.section}>
          <Text style={styles.paragraph}>
            To use this app, you need a free API key from Transport for London (TfL).
            This key allows the app to access real-time departure data.
          </Text>
        </View>

        {/* Steps */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Step-by-Step Instructions</Text>

          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Visit the TfL API Portal</Text>
              <Text style={styles.stepDescription}>
                Go to api.tfl.gov.uk and click "Register" to create a free account.
              </Text>
            </View>
          </View>

          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Create an Account</Text>
              <Text style={styles.stepDescription}>
                Enter your email address and create a password. You'll need to verify
                your email.
              </Text>
            </View>
          </View>

          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Register an Application</Text>
              <Text style={styles.stepDescription}>
                Once logged in, go to "Products" and subscribe to the free tier.
                Then go to "Profile" → "Primary Key" to find your API key.
              </Text>
            </View>
          </View>

          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>4</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Copy Your API Key</Text>
              <Text style={styles.stepDescription}>
                Your API key is a long string of letters and numbers. Copy it and
                paste it into this app.
              </Text>
            </View>
          </View>
        </View>

        {/* Why needed */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Why is an API Key Required?</Text>
          <Text style={styles.paragraph}>
            TfL provides free access to their data, but requires registration to:
          </Text>
          <View style={styles.bulletList}>
            <Text style={styles.bullet}>• Prevent abuse of the service</Text>
            <Text style={styles.bullet}>• Track usage and improve the API</Text>
            <Text style={styles.bullet}>• Provide support if needed</Text>
          </View>
          <Text style={styles.paragraph}>
            Your API key is stored securely on your device and is only used to
            fetch departure data from TfL.
          </Text>
        </View>

        {/* Benefits */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Free Tier Benefits</Text>
          <View style={styles.bulletList}>
            <Text style={styles.bullet}>• 500 requests per minute</Text>
            <Text style={styles.bullet}>• Access to all TfL data</Text>
            <Text style={styles.bullet}>• No credit card required</Text>
            <Text style={styles.bullet}>• Never expires</Text>
          </View>
        </View>

        {/* Open Website Button */}
        <TouchableOpacity style={styles.button} onPress={openTfLWebsite}>
          <Ionicons name="open-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>Open TfL API Portal</Text>
        </TouchableOpacity>

        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={20} color="#1C3F94" />
          <Text style={styles.backButtonText}>Back to Setup</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
    paddingTop: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1C3F94',
    marginTop: 16,
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
    marginBottom: 8,
  },
  step: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1C3F94',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  stepNumberText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  bulletList: {
    marginVertical: 8,
  },
  bullet: {
    fontSize: 14,
    color: '#555',
    lineHeight: 24,
    marginLeft: 8,
  },
  button: {
    backgroundColor: '#1C3F94',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 16,
    marginTop: 8,
  },
  backButtonText: {
    color: '#1C3F94',
    fontSize: 16,
  },
});

