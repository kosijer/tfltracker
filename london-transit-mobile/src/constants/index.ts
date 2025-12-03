// Storage keys
export const STORAGE_KEYS = {
  API_KEY: '@tfl_tracker/api_key',
  STATIONS: '@tfl_tracker/stations',
} as const;

// API URLs
export const TFL_BASE_URL = 'https://api.tfl.gov.uk';
export const HUXLEY_BASE_URL = 'https://huxley2.azurewebsites.net';

// API Key instructions URL
export const TFL_API_KEY_URL = 'https://api.tfl.gov.uk/';

// Line colors
export const LINE_COLORS: Record<string, string> = {
  // Tube lines
  bakerloo: '#B36305',
  central: '#E32017',
  circle: '#FFD300',
  district: '#00782A',
  'hammersmith-city': '#F3A9BB',
  jubilee: '#A0A5A9',
  metropolitan: '#9B0056',
  northern: '#000000',
  piccadilly: '#003688',
  victoria: '#0098D4',
  'waterloo-city': '#95CDBA',
  // DLR
  dlr: '#00A4A7',
  // Elizabeth line
  'elizabeth-line': '#6950A1',
  elizabeth: '#6950A1',
  // Overground
  'london-overground': '#EE7C0E',
  overground: '#EE7C0E',
  lioness: '#FFD200',
  mildmay: '#00A877',
  windrush: '#E23B6A',
  weaver: '#A83E9D',
  suffragette: '#6CBE45',
  liberty: '#6E7F80',
  // Tram
  tram: '#84B817',
  // National Rail
  'national-rail': '#1C3F94',
  // Default
  default: '#666666',
};

// Mode labels
export const MODE_LABELS: Record<string, string> = {
  tube: 'Tube',
  dlr: 'DLR',
  'elizabeth-line': 'Elizabeth line',
  overground: 'Overground',
  'national-rail': 'National Rail',
  tram: 'Tram',
  bus: 'Bus',
};

// Auto refresh interval (seconds)
export const AUTO_REFRESH_INTERVAL = 60;

// Default number of departures to show
export const DEFAULT_DEPARTURES_LIMIT = 5;
export const DEPARTURES_BUFFER_SIZE = 50;

