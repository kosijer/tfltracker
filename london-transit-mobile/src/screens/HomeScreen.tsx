import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList, TfLStation } from '../types';
import { getApiKey, getStations, removeStation, clearAllStations } from '../utils/storage';
import { AUTO_REFRESH_INTERVAL } from '../constants';
import { getRelativeTime } from '../utils/helpers';
import StationCard from '../components/StationCard';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

export default function HomeScreen({ navigation }: Props) {
  const [apiKey, setApiKey] = useState<string>('');
  const [stations, setStations] = useState<TfLStation[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Load data on mount
  useEffect(() => {
    loadData();
  }, []);

  // Auto-refresh
  useEffect(() => {
    const interval = setInterval(() => {
      handleRefresh();
    }, AUTO_REFRESH_INTERVAL * 1000);

    return () => clearInterval(interval);
  }, []);

  // Reload stations when returning from AddStation screen
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadStations();
    });

    return unsubscribe;
  }, [navigation]);

  const loadData = async () => {
    const key = await getApiKey();
    if (!key) {
      navigation.replace('Setup');
      return;
    }
    setApiKey(key);
    await loadStations();
  };

  const loadStations = async () => {
    const savedStations = await getStations();
    setStations(savedStations);
  };

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setRefreshTrigger(prev => prev + 1);
    setLastUpdated(new Date());
    setTimeout(() => setRefreshing(false), 500);
  }, []);

  const handleRemoveStation = async (stationId: string) => {
    Alert.alert(
      'Remove Station',
      'Are you sure you want to remove this station?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: async () => {
            const updated = await removeStation(stationId);
            setStations(updated);
          },
        },
      ]
    );
  };

  const handleClearAll = () => {
    if (stations.length === 0) return;

    Alert.alert(
      'Clear All Stations',
      'Are you sure you want to remove all stations?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: async () => {
            await clearAllStations();
            setStations([]);
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>TfL Tracker</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => navigation.navigate('AddStation')}
          >
            <Ionicons name="add" size={24} color="#1C3F94" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={handleRefresh}
          >
            <Ionicons name="refresh" size={22} color="#1C3F94" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={handleClearAll}
          >
            <Ionicons name="trash-outline" size={22} color="#dc2626" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Station List */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor="#1C3F94"
          />
        }
      >
        {stations.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="train-outline" size={64} color="#ccc" />
            <Text style={styles.emptyTitle}>No Stations Added</Text>
            <Text style={styles.emptySubtitle}>
              Tap the + button to add your first station
            </Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => navigation.navigate('AddStation')}
            >
              <Ionicons name="add" size={20} color="#fff" />
              <Text style={styles.addButtonText}>Add Station</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {stations.map(station => (
              <StationCard
                key={station.id}
                station={station}
                apiKey={apiKey}
                onRemove={() => handleRemoveStation(station.id)}
                refreshTrigger={refreshTrigger}
              />
            ))}
          </>
        )}
      </ScrollView>

      {/* Footer */}
      {stations.length > 0 && (
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Last updated: {getRelativeTime(lastUpdated)}
          </Text>
          <Text style={styles.footerText}>
            Auto-refreshes every {AUTO_REFRESH_INTERVAL}s
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1C3F94',
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  headerButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 16,
    paddingBottom: 32,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C3F94',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    gap: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#888',
  },
});

