import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../constants';
import { TfLStation } from '../types';

/**
 * API Key Storage
 * Stores the TfL API key securely in device storage
 */
export const saveApiKey = async (apiKey: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.API_KEY, apiKey);
  } catch (error) {
    console.error('Error saving API key:', error);
    throw error;
  }
};

export const getApiKey = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(STORAGE_KEYS.API_KEY);
  } catch (error) {
    console.error('Error getting API key:', error);
    return null;
  }
};

export const removeApiKey = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEYS.API_KEY);
  } catch (error) {
    console.error('Error removing API key:', error);
    throw error;
  }
};

/**
 * Station Storage
 * Stores favorite stations list in device storage
 */
export const saveStations = async (stations: TfLStation[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.STATIONS, JSON.stringify(stations));
  } catch (error) {
    console.error('Error saving stations:', error);
    throw error;
  }
};

export const getStations = async (): Promise<TfLStation[]> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.STATIONS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting stations:', error);
    return [];
  }
};

export const addStation = async (station: TfLStation): Promise<TfLStation[]> => {
  try {
    const stations = await getStations();
    // Check if already exists
    if (stations.some(s => s.id === station.id)) {
      return stations;
    }
    const updated = [...stations, station];
    await saveStations(updated);
    return updated;
  } catch (error) {
    console.error('Error adding station:', error);
    throw error;
  }
};

export const removeStation = async (stationId: string): Promise<TfLStation[]> => {
  try {
    const stations = await getStations();
    const updated = stations.filter(s => s.id !== stationId);
    await saveStations(updated);
    return updated;
  } catch (error) {
    console.error('Error removing station:', error);
    throw error;
  }
};

export const clearAllStations = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEYS.STATIONS);
  } catch (error) {
    console.error('Error clearing stations:', error);
    throw error;
  }
};

