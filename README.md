# London Transit Tracker - Documentation

## Overview
A real-time departure board app showing live departures from any station in London and the UK. Displays TfL services (Tube, DLR, Elizabeth Line, Overground, Tram, Bus) and National Rail services (all UK train operators).

---

## Features

### 🚇 TfL Departures
- Real-time data from TfL Unified API
- Supports: Tube, DLR, Elizabeth Line, London Overground, Tram, Bus
- Automatic updates every 5 minutes
- Manual refresh available

### 🚂 National Rail Departures
- Real-time data from National Rail Darwin API (via Huxley2)
- **Works for ANY UK station** - not limited to manual mappings
- Automatic CRS code lookup by station name
- Supports all train operators (c2c, Greater Anglia, Southern, Thameslink, etc.)

### 🔍 Smart Search
- **Search as you type** - auto-triggers after 4 characters
- 500ms debounce to avoid excessive API calls
- Shows all TfL and National Rail stations

### 📋 Station Management
- Add unlimited stations to your list
- Remove individual stations
- Clear all stations with one click (trash icon)
- Persistent storage (localStorage)

### 🎛️ Filtering
- Filter by transport mode (Tube, DLR, National Rail, etc.)
- Filter by specific line (Central, Jubilee, etc.)
- Mode counts show number of departures per mode

### 📊 Load More
- Initially shows 5 departures per station
- "Load 5 more" button to see additional departures
- Buffer of 50 departures fetched in background

### 🎨 UI/UX
- Color-coded by line/operator
- Live countdown timers
- Platform information
- Destination display
- Collapsible station cards
- Auto-refresh indicator

---

## Technical Implementation

### API Endpoints

#### TfL Arrivals
**File:** `app/api/stations/[id]/arrivals/route.ts`
- Fetches from TfL Unified API
- Returns arrivals for all supported modes
- Handles mixed-mode stations

#### National Rail Departures
**File:** `app/api/stations/[id]/national-rail/route.ts`

**Three-strategy CRS code lookup:**
1. **HUB pattern** - `HUBSRA` → `SRA` (instant)
2. **Manual mapping** - Cached known stations (fast)
3. **Automatic lookup** - Searches Huxley2 by station name (works for ANY station)

**Matching algorithm for station names:**
1. Exact match (e.g., "Brighton" → "Brighton")
2. Starts-with match
3. Contains match
4. First result fallback

**TfL operator filtering:**
- Elizabeth Line, London Overground, DLR excluded from National Rail results
- Prevents duplicates when TfL API already provides this data

#### Station Search
**File:** `app/api/stations/search/route.ts`
- Searches TfL database
- Returns station name, ID, modes, and location

### Components

#### StationCard
**File:** `components/StationCard.tsx`
- Displays departures for a single station
- Handles both TfL and National Rail data
- Implements filtering, load more, and collapsing

#### Main Page
**File:** `app/page.tsx`
- Station list management
- Add station modal
- Search as you type
- Refresh and clear functionality

### Storage

#### localStorage
**File:** `utils/storage.ts`
- Saves favorite stations
- Persists across sessions
- Key: `tfl-tracker-stations`

#### Station Mappings (Optional Cache)
**File:** `utils/station-mappings.ts`
- Manual TfL ID → CRS code mappings
- Serves as fast cache for known stations
- Not required for functionality (automatic lookup handles all stations)

---

## APIs Used

### TfL Unified API
- **URL:** `https://api.tfl.gov.uk/`
- **Authentication:** API key (optional but recommended)
- **Data:** Real-time arrivals, station search, line status
- **Rate Limits:** 500 requests/min with key

### Huxley2 (National Rail)
- **URL:** `https://huxley2.azurewebsites.net/`
- **Authentication:** None required (public)
- **Data:** Live departures, platforms, operators
- **Endpoints used:**
  - `/departures/{crs}` - Departures by CRS code
  - `/crs/{searchTerm}` - Station name to CRS lookup

---

## Supported Stations

### TfL Stations
- All London Underground stations (270+)
- All DLR stations
- All Elizabeth Line stations
- All London Overground stations
- All Tram stops
- All bus stops

### National Rail Stations
- **ALL 2,500+ UK National Rail stations**
- Automatic CRS code lookup means no manual configuration needed
- Works for major terminii (King's Cross, Victoria, etc.)
- Works for small stations (Leigh-on-Sea, Prittlewell, etc.)
- Works for stations outside London (Brighton, Manchester, etc.)

---

## Data Displayed

### For Each Departure
| Field | Description | Example |
|-------|-------------|---------|
| Line/Operator | Service name | "Central", "c2c", "Greater Anglia" |
| Destination | Final stop | "Epping", "London Fenchurch Street" |
| Platform | Departure platform | "Platform 3", "Westbound - Platform 2" |
| Time | Countdown | "Due", "2 mins", "15 mins" |
| Color | Line color | Red for Central, Pink for Hammersmith |

---

## Environment Variables

```env
TFL_APP_KEY=your_tfl_api_key_here
```

Get a free API key from: https://api.tfl.gov.uk/

---

## Future Enhancements
- [ ] Arrivals view (in addition to departures)
- [ ] Calling points/intermediate stops
- [ ] Service alerts and disruption info
- [ ] Offline mode with last-known data
- [ ] Push notifications for specific trains
- [ ] Widget support
