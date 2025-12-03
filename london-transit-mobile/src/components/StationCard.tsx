import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TfLStation, TfLArrival } from '../types';
import { getAllArrivals } from '../services/api';
import { DEFAULT_DEPARTURES_LIMIT, MODE_LABELS } from '../constants';
import DepartureItem from './DepartureItem';

type Props = {
  station: TfLStation;
  apiKey: string;
  onRemove: () => void;
  refreshTrigger: number;
};

export default function StationCard({
  station,
  apiKey,
  onRemove,
  refreshTrigger,
}: Props) {
  const [arrivals, setArrivals] = useState<TfLArrival[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [collapsed, setCollapsed] = useState(false);
  const [displayLimit, setDisplayLimit] = useState(DEFAULT_DEPARTURES_LIMIT);

  const fetchArrivals = useCallback(async () => {
    try {
      setError(null);
      const data = await getAllArrivals(station, apiKey);
      setArrivals(data);
    } catch (err) {
      setError('Failed to load departures');
      console.error('Error fetching arrivals:', err);
    } finally {
      setLoading(false);
    }
  }, [station, apiKey]);

  useEffect(() => {
    fetchArrivals();
  }, [fetchArrivals, refreshTrigger]);

  // Group arrivals by mode for mode counts
  const modeCounts = arrivals.reduce((acc, arrival) => {
    const mode = arrival.modeName || 'unknown';
    acc[mode] = (acc[mode] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Ensure at least one departure from each mode in default view
  const getDisplayedArrivals = () => {
    if (displayLimit === DEFAULT_DEPARTURES_LIMIT && arrivals.length > DEFAULT_DEPARTURES_LIMIT) {
      const modes = new Set<string>();
      const prioritized: TfLArrival[] = [];
      
      // First, get one from each mode
      for (const arrival of arrivals) {
        if (!modes.has(arrival.modeName)) {
          prioritized.push(arrival);
          modes.add(arrival.modeName);
        }
      }
      
      // Then fill remaining slots with earliest arrivals
      const remaining = arrivals
        .filter(a => !prioritized.includes(a))
        .slice(0, displayLimit - prioritized.length);
      
      return [...prioritized, ...remaining]
        .sort((a, b) => a.timeToStation - b.timeToStation)
        .slice(0, displayLimit);
    }
    
    return arrivals.slice(0, displayLimit);
  };

  const displayedArrivals = getDisplayedArrivals();
  const hasMore = arrivals.length > displayLimit;

  const handleLoadMore = () => {
    setDisplayLimit(prev => prev + 5);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <TouchableOpacity
        style={styles.header}
        onPress={() => setCollapsed(!collapsed)}
        activeOpacity={0.7}
      >
        <View style={styles.headerLeft}>
          <Ionicons
            name={collapsed ? 'chevron-forward' : 'chevron-down'}
            size={20}
            color="#666"
          />
          <Text style={styles.stationName} numberOfLines={1}>
            {station.name}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={onRemove}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="close" size={20} color="#999" />
        </TouchableOpacity>
      </TouchableOpacity>

      {/* Content */}
      {!collapsed && (
        <View style={styles.content}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color="#1C3F94" />
              <Text style={styles.loadingText}>Loading departures...</Text>
            </View>
          ) : error ? (
            <View style={styles.errorContainer}>
              <Ionicons name="alert-circle" size={24} color="#dc2626" />
              <Text style={styles.errorText}>{error}</Text>
              <TouchableOpacity style={styles.retryButton} onPress={fetchArrivals}>
                <Text style={styles.retryText}>Retry</Text>
              </TouchableOpacity>
            </View>
          ) : arrivals.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Ionicons name="train-outline" size={32} color="#ccc" />
              <Text style={styles.emptyText}>No departures found</Text>
            </View>
          ) : (
            <>
              {/* Departures List */}
              <FlatList
                data={displayedArrivals}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <DepartureItem arrival={item} />}
                scrollEnabled={false}
              />

              {/* Load More Button */}
              {hasMore && (
                <TouchableOpacity
                  style={styles.loadMoreButton}
                  onPress={handleLoadMore}
                >
                  <Ionicons name="chevron-down" size={16} color="#1C3F94" />
                  <Text style={styles.loadMoreText}>Load 5 more</Text>
                </TouchableOpacity>
              )}

              {/* Mode Counts */}
              <View style={styles.modeCounts}>
                {Object.entries(modeCounts).map(([mode, count]) => (
                  <View key={mode} style={styles.modeTag}>
                    <Text style={styles.modeTagText}>
                      {MODE_LABELS[mode] || mode} ({count})
                    </Text>
                  </View>
                ))}
              </View>
            </>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fafafa',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  stationName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
    flex: 1,
  },
  removeButton: {
    padding: 4,
  },
  content: {
    minHeight: 80,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 8,
  },
  loadingText: {
    color: '#666',
    fontSize: 14,
  },
  errorContainer: {
    alignItems: 'center',
    padding: 24,
    gap: 8,
  },
  errorText: {
    color: '#dc2626',
    fontSize: 14,
    textAlign: 'center',
  },
  retryButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#fee2e2',
    borderRadius: 8,
    marginTop: 8,
  },
  retryText: {
    color: '#dc2626',
    fontWeight: '500',
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 32,
    gap: 8,
  },
  emptyText: {
    color: '#999',
    fontSize: 14,
  },
  loadMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    gap: 4,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  loadMoreText: {
    color: '#1C3F94',
    fontSize: 14,
    fontWeight: '500',
  },
  modeCounts: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 12,
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  modeTag: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
  },
  modeTagText: {
    fontSize: 12,
    color: '#666',
  },
});

