# National Rail Integration

## Overview
This document describes the National Rail departure data integration for stations outside the TfL network.

## Problem
The TfL API doesn't provide real-time departure data for many National Rail-only stations, especially those outside Greater London (e.g., Southend Central, Chelmsford, etc.). These stations would show "No upcoming departures" even though trains were actually running.

## Solution
Implemented a fallback system that automatically uses the National Rail Darwin API (via Huxley2 wrapper) when:
1. TfL API returns no departures
2. Station has only "national-rail" as its mode

## Technical Implementation

### New API Endpoint
**File:** `app/api/stations/[id]/national-rail/route.ts`

- Converts TfL station IDs to National Rail CRS codes (3-letter codes)
- Fetches live departure data from Huxley2 public API: `https://huxley2.azurewebsites.net/`
- Transforms National Rail data format to match TfL format for consistent display
- Returns departures with operator names (e.g., "c2c", "Greater Anglia"), platforms, and times

### Station Mapping
**File:** `utils/station-mappings.ts`

Created a comprehensive mapping between TfL station IDs and National Rail CRS codes:
- `910GSTHCENT` → `SOC` (Southend Central)
- `910GLIVST` → `LST` (Liverpool Street)
- `910GROMFORD` → `RMF` (Romford)
- And many more...

### Automatic Fallback
**File:** `components/StationCard.tsx`

Modified the `fetchArrivals` function to:
1. First try TfL API
2. If station has 'national-rail' in its modes (whether single-mode or multi-mode), automatically fetch from National Rail API
3. Merge National Rail data with TfL data for comprehensive departures
4. Display all data seamlessly with the same UI

**Key improvement:** Works for both National Rail-only stations (e.g., Southend Central) AND multi-mode stations (e.g., Romford, Stratford) that have National Rail services alongside tube/overground.

### User Experience Improvements
- **Helpful Message:** For National Rail-only stations with no data, displays an informative message directing users to National Rail website
- **Automatic Detection:** No user action needed - system automatically tries National Rail API
- **Consistent UI:** National Rail departures display exactly like TfL departures
- **Real-time Updates:** Auto-refreshes every 5 minutes just like TfL data
- **Load More Feature:** 
  - Initially shows 5 departures (configurable)
  - "Load 5 more" button appears when more departures are available
  - "Show less" button appears after expanding to collapse back to default view
  - Display limit resets when changing filters or refreshing data

## Example Stations That Now Work

### National Rail-Only Stations
- **Southend Central** (c2c to/from London Fenchurch Street) - Shows 9+ c2c departures
- **Shoeburyness** (c2c services)
- Any National Rail-only station in the mapping file

### Multi-Mode Stations (TfL + National Rail)
- **Romford Rail Station** - Shows Elizabeth Line (44) + National Rail (2) + Overground (4)
- **Stratford** - Shows Tube, DLR, Overground, Elizabeth Line + National Rail services
- **Liverpool Street** - Major hub with all TfL modes + National Rail departures
- Any station with both TfL and National Rail services

## API Used
**Huxley2:** `https://huxley2.azurewebsites.net/`
- Free, public API (no authentication required)
- Wrapper around National Rail's OpenLDBWS (Darwin) API
- Returns live departure times, platforms, operators, and calling points
- No rate limits for reasonable use

## Data Displayed
For each National Rail departure:
- **Operator:** e.g., "c2c", "Greater Anglia", "Thameslink"
- **Destination:** Final destination of the train
- **Platform:** Platform number
- **Time:** Minutes until departure (with live countdown)
- **Status:** "On time", actual delayed time, or specific minute countdowns

## Limitations
- Only works for stations with CRS codes mapped in `station-mappings.ts`
- Dependent on Huxley2 API availability
- Some very minor stations may not have real-time data

## Future Enhancements
- Add more stations to the CRS mapping
- Support for arrivals (currently only departures)
- Display calling points/intermediate stops
- Show delay reasons when available

