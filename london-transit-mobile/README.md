# TfL Tracker - React Native Mobile App

A React Native (Expo) mobile app for tracking live departures from London transport stations.

## Features

### 🔑 API Key Management
- First-time setup screen for entering TfL API key
- Step-by-step instructions for obtaining a free API key
- API key validation before saving
- Secure storage using AsyncStorage
- Link to TfL API portal

### 🚇 Transport Modes
- London Underground (Tube)
- DLR
- Elizabeth Line
- London Overground (all branches)
- Tram
- National Rail (all UK stations)

### 📋 Station Management
- Search stations as you type (4+ characters, debounced)
- Add unlimited stations to favorites
- Remove individual stations
- Clear all stations
- Persistent storage

### ⏱️ Live Departures
- Real-time departure times
- Countdown timers
- Platform information
- Line/operator colors
- Mode badges
- Auto-refresh every 60 seconds
- Pull-to-refresh

### 🎨 UI Features
- Color-coded by line/operator
- Collapsible station cards
- Load more button (5 at a time)
- Empty states with helpful prompts
- Error handling with retry

---

## Installation

### Prerequisites
- Node.js 18+ (20+ recommended)
- Expo CLI
- iOS Simulator (Mac) or Android Emulator

### Setup

```bash
# Navigate to the mobile app directory
cd london-transit-mobile

# Install dependencies
npm install

# Start the development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android
```

---

## Project Structure

```
london-transit-mobile/
├── App.tsx                 # Main app entry point with navigation
├── src/
│   ├── components/
│   │   ├── DepartureItem.tsx    # Single departure row
│   │   └── StationCard.tsx      # Station card with departures
│   ├── constants/
│   │   └── index.ts             # Colors, labels, storage keys
│   ├── screens/
│   │   ├── SetupScreen.tsx      # API key entry
│   │   ├── InstructionsScreen.tsx # How to get API key
│   │   ├── HomeScreen.tsx       # Main station list
│   │   └── AddStationScreen.tsx # Search and add stations
│   ├── services/
│   │   └── api.ts               # TfL and Huxley2 API calls
│   ├── types/
│   │   └── index.ts             # TypeScript types
│   └── utils/
│       ├── storage.ts           # AsyncStorage helpers
│       └── helpers.ts           # Formatting utilities
└── package.json
```

---

## Data Storage

### AsyncStorage Keys
| Key | Description |
|-----|-------------|
| `@tfl_tracker/api_key` | User's TfL API key |
| `@tfl_tracker/stations` | Array of favorite stations |

### Security
- API key stored locally on device only
- No data sent to external servers except TfL/Huxley2 APIs
- Key validated before saving

---

## APIs Used

### TfL Unified API
- **Base URL:** `https://api.tfl.gov.uk/`
- **Authentication:** API key (user-provided)
- **Endpoints:**
  - `StopPoint/Search/{query}` - Station search
  - `StopPoint/{id}/Arrivals` - Live arrivals
  - `Line/Meta/Modes` - API key validation

### Huxley2 (National Rail)
- **Base URL:** `https://huxley2.azurewebsites.net/`
- **Authentication:** None (public API)
- **Endpoints:**
  - `/crs/{searchTerm}` - Station name to CRS code
  - `/departures/{crs}` - Live departures

---

## Getting a TfL API Key

1. Visit [api.tfl.gov.uk](https://api.tfl.gov.uk/)
2. Click "Register" and create a free account
3. Verify your email
4. Go to "Products" → Subscribe to free tier
5. Go to "Profile" → Copy "Primary Key"
6. Paste in the app

### Free Tier Benefits
- 500 requests per minute
- Access to all TfL data
- No credit card required
- Never expires

---

## Dependencies

| Package | Purpose |
|---------|---------|
| expo | Expo framework |
| react-native | React Native core |
| @react-navigation/native | Navigation container |
| @react-navigation/native-stack | Stack navigation |
| @react-native-async-storage/async-storage | Local storage |
| @expo/vector-icons | Ionicons |
| expo-linking | Open external URLs |

---

## Building for Production

### iOS
```bash
npx expo build:ios
# or
eas build --platform ios
```

### Android
```bash
npx expo build:android
# or
eas build --platform android
```

---

## License

MIT

---

## Support

For issues with:
- **This app:** Open a GitHub issue
- **TfL API:** Visit [TfL Developer Portal](https://api.tfl.gov.uk/)
- **National Rail data:** See [Huxley2 Documentation](https://github.com/jpsingleton/Huxley2)

