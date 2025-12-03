import { TFL_BASE_URL, HUXLEY_BASE_URL } from '../constants';
import { TfLStation, TfLArrival, TfLStopPointSearchResponse } from '../types';

// TfL-operated services to filter out from National Rail results
const TFL_OPERATORS = new Set([
  'elizabeth line',
  'tfl rail',
  'london overground',
  'lo',
  'xr',
  'dlr',
  'docklands light railway',
  'london underground',
  'lu',
]);

/**
 * Search for stations by name
 */
export const searchStations = async (
  query: string,
  apiKey: string
): Promise<TfLStation[]> => {
  try {
    const url = `${TFL_BASE_URL}/StopPoint/Search/${encodeURIComponent(query)}?modes=tube,dlr,overground,elizabeth-line,tram,national-rail&app_key=${apiKey}`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`TfL API error: ${response.status}`);
    }
    
    const data: TfLStopPointSearchResponse = await response.json();
    
    return data.matches.map(match => ({
      id: match.id,
      name: match.name,
      modes: match.modes,
      lat: match.lat,
      lon: match.lon,
    }));
  } catch (error) {
    console.error('Error searching stations:', error);
    throw error;
  }
};

/**
 * Get TfL arrivals for a station
 */
export const getTfLArrivals = async (
  stationId: string,
  apiKey: string
): Promise<TfLArrival[]> => {
  try {
    const url = `${TFL_BASE_URL}/StopPoint/${stationId}/Arrivals?app_key=${apiKey}`;
    
    const response = await fetch(url);
    if (!response.ok) {
      if (response.status === 404) {
        return [];
      }
      throw new Error(`TfL API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    return data.map((arrival: Record<string, unknown>) => ({
      id: arrival.id as string || `${arrival.vehicleId}-${arrival.naptanId}`,
      stationName: arrival.stationName as string || '',
      lineId: arrival.lineId as string || '',
      lineName: arrival.lineName as string || '',
      platformName: arrival.platformName as string || '',
      direction: arrival.direction as string || '',
      destinationNaptanId: arrival.destinationNaptanId as string || '',
      destinationName: arrival.destinationName as string || arrival.towards as string || '',
      timestamp: arrival.timestamp as string || new Date().toISOString(),
      timeToStation: arrival.timeToStation as number || 0,
      currentLocation: arrival.currentLocation as string || '',
      towards: arrival.towards as string || '',
      expectedArrival: arrival.expectedArrival as string || '',
      modeName: arrival.modeName as string || '',
    }));
  } catch (error) {
    console.error('Error fetching TfL arrivals:', error);
    throw error;
  }
};

/**
 * Look up CRS code from station name using Huxley2 API
 */
const lookupCrsCode = async (stationName: string): Promise<string | null> => {
  try {
    // Clean the station name
    let cleanName = stationName;
    let prevName = '';
    while (prevName !== cleanName) {
      prevName = cleanName;
      cleanName = cleanName
        .replace(/\s*\(.*\)\s*$/, '')
        .replace(/\s*(Rail|Railway|Train|Station|Underground|DLR|International|Tram|Stop)\s*$/gi, '')
        .trim();
    }
    
    const response = await fetch(
      `${HUXLEY_BASE_URL}/crs/${encodeURIComponent(cleanName)}`
    );
    
    if (!response.ok) return null;
    
    const results = await response.json();
    
    if (!Array.isArray(results) || results.length === 0) return null;
    
    // Find best match
    const cleanNameLower = cleanName.toLowerCase();
    
    let bestMatch = results.find((s: { stationName: string }) =>
      s.stationName.toLowerCase() === cleanNameLower
    );
    
    if (!bestMatch) {
      bestMatch = results.find((s: { stationName: string }) =>
        s.stationName.toLowerCase().startsWith(cleanNameLower)
      );
    }
    
    if (!bestMatch) {
      bestMatch = results.find((s: { stationName: string }) =>
        s.stationName.toLowerCase().includes(cleanNameLower)
      );
    }
    
    if (!bestMatch) {
      bestMatch = results[0];
    }
    
    return bestMatch?.crsCode || null;
  } catch (error) {
    console.error('CRS lookup failed:', error);
    return null;
  }
};

/**
 * Get National Rail departures using Huxley2 API
 */
export const getNationalRailDepartures = async (
  stationId: string,
  stationName: string
): Promise<TfLArrival[]> => {
  try {
    let crsCode: string | null = null;
    
    // Try to extract CRS from HUB station ID pattern
    if (stationId.startsWith('HUB') && stationId.length >= 6) {
      crsCode = stationId.substring(3, 6).toUpperCase();
    }
    
    // If no CRS code from ID, look it up by name
    if (!crsCode || !/^[A-Z]{3}$/.test(crsCode)) {
      crsCode = await lookupCrsCode(stationName);
    }
    
    if (!crsCode) {
      return [];
    }
    
    const response = await fetch(
      `${HUXLEY_BASE_URL}/departures/${crsCode}?expand=true`
    );
    
    if (!response.ok) {
      return [];
    }
    
    const data = await response.json();
    const departures: TfLArrival[] = [];
    
    if (data.trainServices) {
      for (const service of data.trainServices) {
        // Skip TfL-operated services
        const operatorLower = (service.operator || '').toLowerCase();
        const operatorCodeLower = (service.operatorCode || '').toLowerCase();
        
        if (TFL_OPERATORS.has(operatorLower) || TFL_OPERATORS.has(operatorCodeLower)) {
          continue;
        }
        
        const std = service.std;
        const etd = service.etd;
        
        if (!std || etd === 'Cancelled') {
          continue;
        }
        
        // Calculate time to station
        const now = new Date();
        const [hours, minutes] = std.split(':');
        const departureTime = new Date();
        departureTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
        
        if (departureTime < now) {
          departureTime.setDate(departureTime.getDate() + 1);
        }
        
        if (etd !== 'On time' && etd !== 'Delayed' && etd.includes(':')) {
          const [delayedHours, delayedMinutes] = etd.split(':');
          departureTime.setHours(parseInt(delayedHours), parseInt(delayedMinutes), 0, 0);
          if (departureTime < now) {
            departureTime.setDate(departureTime.getDate() + 1);
          }
        }
        
        const timeToStation = Math.floor((departureTime.getTime() - now.getTime()) / 1000);
        
        if (timeToStation > -60 && timeToStation < 7200) {
          departures.push({
            id: `nr-${service.serviceID}-${crsCode}`,
            stationName: crsCode,
            lineId: service.operatorCode || 'national-rail',
            lineName: service.operator || 'National Rail',
            platformName: service.platform ? `Platform ${service.platform}` : '',
            direction: 'outbound',
            destinationNaptanId: '',
            destinationName: service.destination?.[0]?.locationName || 'Unknown',
            timestamp: new Date().toISOString(),
            timeToStation,
            currentLocation: service.currentOrigins?.[0]?.locationName || '',
            towards: service.destination?.[0]?.locationName || 'Unknown',
            expectedArrival: departureTime.toISOString(),
            modeName: 'national-rail',
          });
        }
      }
    }
    
    return departures.sort((a, b) => a.timeToStation - b.timeToStation);
  } catch (error) {
    console.error('Error fetching National Rail departures:', error);
    return [];
  }
};

/**
 * Get all arrivals for a station (TfL + National Rail)
 */
export const getAllArrivals = async (
  station: TfLStation,
  apiKey: string
): Promise<TfLArrival[]> => {
  try {
    // Fetch TfL arrivals
    const tflArrivals = await getTfLArrivals(station.id, apiKey);
    
    // If station has National Rail, also fetch from Huxley2
    let nrDepartures: TfLArrival[] = [];
    if (station.modes.includes('national-rail')) {
      nrDepartures = await getNationalRailDepartures(station.id, station.name);
    }
    
    // Merge and deduplicate
    const allArrivals = [...tflArrivals, ...nrDepartures];
    
    // Deduplicate by destination + approximate time
    const seen = new Set<string>();
    const unique = allArrivals.filter(arrival => {
      const key = `${arrival.destinationName}-${Math.floor(arrival.timeToStation / 30)}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    
    // Sort by time
    return unique.sort((a, b) => a.timeToStation - b.timeToStation);
  } catch (error) {
    console.error('Error fetching all arrivals:', error);
    return [];
  }
};

/**
 * Validate API key by making a test request
 */
export const validateApiKey = async (apiKey: string): Promise<boolean> => {
  try {
    const response = await fetch(
      `${TFL_BASE_URL}/Line/Meta/Modes?app_key=${apiKey}`
    );
    return response.ok;
  } catch {
    return false;
  }
};

