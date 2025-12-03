// TfL Station types
export interface TfLStation {
  id: string;
  name: string;
  modes: string[];
  lat?: number;
  lon?: number;
}

export interface TfLStopPointSearchResponse {
  matches: Array<{
    id: string;
    name: string;
    modes: string[];
    lat: number;
    lon: number;
  }>;
}

// Arrival/Departure types
export interface TfLArrival {
  id: string;
  stationName: string;
  lineId: string;
  lineName: string;
  platformName: string;
  direction: string;
  destinationNaptanId: string;
  destinationName: string;
  timestamp: string;
  timeToStation: number;
  currentLocation: string;
  towards: string;
  expectedArrival: string;
  modeName: string;
}

// Navigation types
export type RootStackParamList = {
  Setup: undefined;
  Home: undefined;
  AddStation: undefined;
  Instructions: undefined;
};

