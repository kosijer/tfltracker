import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList, TfLStation } from '../types';
import { searchStations } from '../services/api';
import { getApiKey, addStation, getStations } from '../utils/storage';
import { MODE_LABELS } from '../constants';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'AddStation'>;
};

export default function AddStationScreen({ navigation }: Props) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<TfLStation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [existingIds, setExistingIds] = useState<Set<string>>(new Set());
  
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRef = useRef<TextInput>(null);

  // Load existing station IDs
  useEffect(() => {
    const loadExisting = async () => {
      const stations = await getStations();
      setExistingIds(new Set(stations.map(s => s.id)));
    };
    loadExisting();
  }, []);

  // Focus input on mount
  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  // Search as you type with debouncing
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (query.trim().length >= 4) {
      setLoading(true);
      searchTimeoutRef.current = setTimeout(() => {
        handleSearch();
      }, 500);
    } else {
      setResults([]);
      setError(null);
    }

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [query]);

  const handleSearch = async () => {
    try {
      setError(null);
      const apiKey = await getApiKey();
      if (!apiKey) {
        navigation.replace('Setup');
        return;
      }

      const stations = await searchStations(query.trim(), apiKey);
      setResults(stations);
    } catch (err) {
      setError('Failed to search stations');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddStation = async (station: TfLStation) => {
    try {
      await addStation(station);
      setExistingIds(prev => new Set([...prev, station.id]));
      navigation.goBack();
    } catch (err) {
      console.error('Error adding station:', err);
    }
  };

  const renderStation = ({ item }: { item: TfLStation }) => {
    const isAdded = existingIds.has(item.id);

    return (
      <View style={styles.stationItem}>
        <View style={styles.stationInfo}>
          <Text style={styles.stationName} numberOfLines={1}>
            {item.name}
          </Text>
          <View style={styles.modesContainer}>
            {item.modes.map(mode => (
              <View key={mode} style={styles.modeTag}>
                <Text style={styles.modeText}>
                  {MODE_LABELS[mode] || mode}
                </Text>
              </View>
            ))}
          </View>
        </View>
        <TouchableOpacity
          style={[styles.addButton, isAdded && styles.addButtonDisabled]}
          onPress={() => !isAdded && handleAddStation(item)}
          disabled={isAdded}
        >
          <Ionicons
            name={isAdded ? 'checkmark' : 'add'}
            size={20}
            color={isAdded ? '#16a34a' : '#fff'}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#1C3F94" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Station</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={20} color="#888" />
          <TextInput
            ref={inputRef}
            style={styles.searchInput}
            placeholder="Search stations (min 4 characters)"
            placeholderTextColor="#999"
            value={query}
            onChangeText={setQuery}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="search"
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')}>
              <Ionicons name="close-circle" size={20} color="#888" />
            </TouchableOpacity>
          )}
        </View>
        {query.length > 0 && query.length < 4 && (
          <Text style={styles.hintText}>Type at least 4 characters</Text>
        )}
      </View>

      {/* Results */}
      <View style={styles.resultsContainer}>
        {loading ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color="#1C3F94" />
            <Text style={styles.loadingText}>Searching...</Text>
          </View>
        ) : error ? (
          <View style={styles.centerContainer}>
            <Ionicons name="alert-circle" size={48} color="#dc2626" />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : results.length === 0 && query.length >= 4 ? (
          <View style={styles.centerContainer}>
            <Ionicons name="search" size={48} color="#ccc" />
            <Text style={styles.emptyText}>No stations found</Text>
          </View>
        ) : results.length === 0 ? (
          <View style={styles.centerContainer}>
            <Ionicons name="train-outline" size={64} color="#ddd" />
            <Text style={styles.emptyText}>Search for a station</Text>
            <Text style={styles.emptySubtext}>
              Find TfL and National Rail stations
            </Text>
          </View>
        ) : (
          <FlatList
            data={results}
            keyExtractor={item => item.id}
            renderItem={renderStation}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.listContent}
          />
        )}
      </View>
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
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  placeholder: {
    width: 32,
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#fff',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    paddingHorizontal: 12,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    color: '#333',
  },
  hintText: {
    fontSize: 12,
    color: '#888',
    marginTop: 8,
    marginLeft: 4,
  },
  resultsContainer: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 80,
  },
  loadingText: {
    marginTop: 12,
    color: '#666',
    fontSize: 14,
  },
  errorText: {
    marginTop: 12,
    color: '#dc2626',
    fontSize: 14,
    textAlign: 'center',
  },
  emptyText: {
    marginTop: 16,
    color: '#666',
    fontSize: 16,
  },
  emptySubtext: {
    marginTop: 4,
    color: '#999',
    fontSize: 14,
  },
  listContent: {
    paddingVertical: 8,
  },
  stationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginVertical: 4,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  stationInfo: {
    flex: 1,
    marginRight: 12,
  },
  stationName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  modesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  modeTag: {
    backgroundColor: '#e8eef7',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  modeText: {
    fontSize: 11,
    color: '#1C3F94',
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#1C3F94',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonDisabled: {
    backgroundColor: '#e8f5e9',
  },
});

