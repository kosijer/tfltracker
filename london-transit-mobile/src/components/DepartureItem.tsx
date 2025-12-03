import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TfLArrival } from '../types';
import { getLineColor, formatTimeToStation } from '../utils/helpers';

type Props = {
  arrival: TfLArrival;
};

export default function DepartureItem({ arrival }: Props) {
  const lineColor = getLineColor(arrival.lineId, arrival.lineName);
  const timeInfo = formatTimeToStation(arrival.timeToStation);
  const isDue = timeInfo.display === 'Due';

  return (
    <View style={styles.container}>
      {/* Line Color Indicator */}
      <View style={[styles.lineIndicator, { backgroundColor: lineColor }]} />

      {/* Main Content */}
      <View style={styles.content}>
        {/* Line Name */}
        <Text style={styles.lineName} numberOfLines={1}>
          {arrival.lineName}
        </Text>

        {/* Destination */}
        <Text style={styles.destination} numberOfLines={1}>
          {arrival.destinationName || arrival.towards}
        </Text>

        {/* Platform */}
        {arrival.platformName && (
          <Text style={styles.platform} numberOfLines={1}>
            {arrival.platformName}
          </Text>
        )}
      </View>

      {/* Time Display */}
      <View style={[styles.timeContainer, isDue && styles.timeContainerDue]}>
        <Text style={[styles.timeText, isDue && styles.timeTextDue]}>
          {timeInfo.display}
        </Text>
        {timeInfo.subtext && (
          <Text style={[styles.timeSubtext, isDue && styles.timeSubtextDue]}>
            {timeInfo.subtext}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  lineIndicator: {
    width: 4,
    height: '100%',
    minHeight: 50,
    borderRadius: 2,
    marginRight: 12,
  },
  content: {
    flex: 1,
    marginRight: 12,
  },
  lineName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  destination: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  platform: {
    fontSize: 12,
    color: '#888',
  },
  timeContainer: {
    alignItems: 'flex-end',
    minWidth: 60,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: '#f0f7ff',
  },
  timeContainerDue: {
    backgroundColor: '#fff8e6',
  },
  timeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C3F94',
  },
  timeTextDue: {
    color: '#f59e0b',
  },
  timeSubtext: {
    fontSize: 10,
    color: '#666',
    marginTop: 1,
  },
  timeSubtextDue: {
    color: '#92400e',
  },
});

