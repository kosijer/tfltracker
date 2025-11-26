# London Transit Tracker 🚂🚌

A simple, user-friendly application to track next trains and buses from your favorite London stations using Transport for London (TfL) real-time data.

## 📋 Project Overview

This project aims to help commuters in London quickly check when the next train or bus is arriving at their frequently-used stations. Starting with a web application, it will eventually expand to a mobile app.

**Use Case Example:**  
You use Romford station and need to catch the Elizabeth line. You also rely on a nearby bus station. This app lets you quickly see all departure times so you can plan when to leave home.

## ✨ Features

### Phase 1: Web Application (Current Focus)
- ✅ **Preset Stations List**: Display your most-used stations on the home screen
- ✅ **Real-time Departures**: See next trains/buses from each station
- ✅ **Add Stations**: Search and add new stations via "+" button
- ✅ **Station Search**: Search TfL stations by name (uses station IDs)
- ✅ **Map Preview**: Visual map showing station location
- ✅ **Responsive Design**: Works on all devices

### Phase 2: Mobile Application (Future)
- 📱 Native iOS & Android apps
- 🔔 Push notifications for departure alerts
- 📍 Location-based nearby station suggestions
- 💾 Offline mode for saved stations

## 🛠 Tech Stack

### Web Application
- **Framework**: [Next.js 14+](https://nextjs.org/) (React-based)
  - Server-side rendering (SSR) for fast initial loads
  - API routes for secure API key handling
  - Static generation for optimal performance
- **Styling**: Tailwind CSS (modern, responsive design)
- **State Management**: React Context / Zustand (for favorites)
- **Maps**: Mapbox GL JS or Leaflet (free tier available)
- **API Client**: Axios / Fetch API

### Mobile Application
- **Framework**: [React Native](https://reactnative.dev/)
- **Navigation**: React Navigation
- **State Management**: Redux Toolkit or Zustand
- **Maps**: React Native Maps

### Backend / API
- **Data Source**: TfL Unified API (free, 500 requests/min)
- **No custom backend needed** - Direct API calls from client
- **Optional**: Next.js API routes to proxy TfL API (hides API key)

## 🏗 Architecture Decision: Monorepo vs Multi-repo

### Recommended: **Monorepo Approach**

**Why?**
- Share common code (types, utilities, API clients)
- Consistent development experience
- Single source of truth for business logic
- Easier dependency management

**Structure:**
```
london-transit-tracker/
├── README.md
├── package.json (root workspace)
├── packages/
│   ├── web/              # Next.js web app
│   │   ├── src/
│   │   ├── public/
│   │   ├── package.json
│   │   └── next.config.js
│   ├── mobile/           # React Native app
│   │   ├── src/
│   │   ├── ios/
│   │   ├── android/
│   │   └── package.json
│   └── shared/           # Shared code
│       ├── api/          # TfL API client
│       ├── types/        # TypeScript types
│       ├── utils/        # Common utilities
│       └── package.json
└── .gitignore
```

**Tools:**
- Yarn Workspaces or pnpm workspaces
- Turborepo for build optimization (optional)

### Alternative: **Multi-repo Approach**

If platforms diverge significantly, separate repos:
- `london-transit-web`
- `london-transit-mobile`

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- TfL API Key (free registration)

### TfL API Setup

1. **Register for API Access** (FREE ✅)
   - Visit: https://api-portal.tfl.gov.uk/
   - Create an account
   - Subscribe to "500 Requests per min" product
   - Get your API key (app_id and app_key)

2. **API Rate Limits:**
   - Free tier: 500 requests per minute
   - Sufficient for personal use

3. **Key API Endpoints:**
   - **Station Search**: `GET /StopPoint/Search/{query}`
   - **Station Details**: `GET /StopPoint/{id}`
   - **Arrivals**: `GET /StopPoint/{id}/Arrivals`
   - **Nearby Stops**: `GET /StopPoint?lat={lat}&lon={lon}&radius={meters}`

### Installation (Web App)

```bash
# Create Next.js app
npx create-next-app@latest london-transit-web
cd london-transit-web

# Install dependencies
npm install axios mapbox-gl date-fns

# Create .env.local file
echo "NEXT_PUBLIC_TFL_APP_ID=your_app_id" > .env.local
echo "NEXT_PUBLIC_TFL_APP_KEY=your_app_key" >> .env.local

# Start development server
npm run dev
```

Visit http://localhost:3000

## 📱 Screen Design

### 1. Home Screen (Stations List)
```
┌─────────────────────────────────┐
│  My Stations          [Settings]│
├─────────────────────────────────┤
│                                 │
│  📍 Romford Station             │
│     Elizabeth Line → 3 mins     │
│     Overground → 8 mins         │
│                                 │
│  📍 Liverpool Street            │
│     Circle Line → 5 mins        │
│     Metropolitan → 7 mins       │
│                                 │
│  📍 Bus Stop: High St (X)       │
│     174 → 2 mins                │
│     86 → 10 mins                │
│                                 │
├─────────────────────────────────┤
│                                 │
│              [+]                │
│                                 │
└─────────────────────────────────┘
```

### 2. Add Station Screen
```
┌─────────────────────────────────┐
│  [←]  Add Station               │
├─────────────────────────────────┤
│                                 │
│  🔍 Search stations...          │
│                                 │
│  Results:                       │
│  • Romford (Rail Station)       │
│  • Romford Market (Bus Stop)    │
│  • Romford Station (Stop R)     │
│                                 │
│  [MAP PREVIEW]                  │
│  ┌───────────────────────────┐  │
│  │    🗺️ Map showing         │  │
│  │    selected station       │  │
│  └───────────────────────────┘  │
│                                 │
│  [Add to My Stations]           │
│                                 │
└─────────────────────────────────┘
```

### 3. Station Details Screen
```
┌─────────────────────────────────┐
│  [←]  Romford Station      [⭐] │
├─────────────────────────────────┤
│                                 │
│  Elizabeth Line (Eastbound)     │
│  ├─ 3 mins  Platform 1          │
│  ├─ 8 mins  Platform 1          │
│  └─ 18 mins Platform 1          │
│                                 │
│  Overground (Southbound)        │
│  ├─ 8 mins  Platform 3          │
│  └─ 23 mins Platform 3          │
│                                 │
│  [🗺️ Show on Map]               │
│                                 │
│  Last updated: 14:32            │
│  [🔄 Refresh]                   │
│                                 │
└─────────────────────────────────┘
```

## 🔧 Core Features Implementation

### 1. Search for Stations (TfL API)
```javascript
// API call example
const searchStations = async (query) => {
  const response = await fetch(
    `https://api.tfl.gov.uk/StopPoint/Search/${encodeURIComponent(query)}?modes=tube,overground,elizabeth-line,dlr,bus&app_id=${APP_ID}&app_key=${APP_KEY}`
  );
  return response.json();
};
```

### 2. Get Live Arrivals
```javascript
const getArrivals = async (stopId) => {
  const response = await fetch(
    `https://api.tfl.gov.uk/StopPoint/${stopId}/Arrivals?app_id=${APP_ID}&app_key=${APP_KEY}`
  );
  return response.json();
};
```

### 3. Store Favorite Stations
```javascript
// localStorage for web
localStorage.setItem('favoriteStations', JSON.stringify(stations));

// AsyncStorage for React Native
await AsyncStorage.setItem('favoriteStations', JSON.stringify(stations));
```

## 🆓 Keeping the App Free

### Hosting (Web App)
**Recommended: Vercel** (FREE tier)
- ✅ Unlimited deployments
- ✅ Automatic HTTPS
- ✅ Edge functions for API routes
- ✅ Built for Next.js
- Deploy: `npm run build && vercel deploy`

**Alternatives:**
- **Netlify**: Free tier, 100GB bandwidth/month
- **Cloudflare Pages**: Unlimited bandwidth (free)
- **GitHub Pages**: For static sites

### Mobile App Distribution
- **iOS**: Apple Developer Program ($99/year required)
- **Android**: Google Play ($25 one-time fee)
- **Alternative**: Progressive Web App (PWA) - FREE, works like native app

### Cost Breakdown
| Service | Cost | Notes |
|---------|------|-------|
| TfL API | FREE | 500 req/min limit |
| Next.js | FREE | Open source |
| React Native | FREE | Open source |
| Vercel Hosting | FREE | Hobby plan sufficient |
| Map (Mapbox) | FREE | Up to 50K loads/month |
| **Total** | **$0** | ✅ Completely free! |

## 📊 Data Models

### Station
```typescript
interface Station {
  id: string;              // TfL StopPoint ID
  name: string;            // "Romford"
  modes: string[];         // ["tube", "elizabeth-line"]
  lat: number;
  lon: number;
  addedAt: Date;
}
```

### Arrival
```typescript
interface Arrival {
  id: string;
  lineName: string;        // "Elizabeth line"
  platformName: string;    // "Platform 1"
  destinationName: string; // "Shenfield"
  timeToStation: number;   // seconds
  expectedArrival: Date;
}
```

## 🗺 Map Integration

### Option 1: Mapbox (Recommended)
```bash
npm install mapbox-gl
```
- Free tier: 50,000 map loads/month
- Beautiful, modern maps
- Excellent documentation

### Option 2: Leaflet (OpenStreetMap)
```bash
npm install react-leaflet leaflet
```
- Completely free, no limits
- Open source
- Community-maintained

## 🔐 Security Best Practices

1. **Never expose API keys in client code**
   - Use Next.js API routes as proxy
   - Store keys in environment variables

2. **Example API Route** (`pages/api/stations.js`):
```javascript
export default async function handler(req, res) {
  const { query } = req.query;
  
  const response = await fetch(
    `https://api.tfl.gov.uk/StopPoint/Search/${query}?app_id=${process.env.TFL_APP_ID}&app_key=${process.env.TFL_APP_KEY}`
  );
  
  const data = await response.json();
  res.status(200).json(data);
}
```

## 📈 Development Roadmap

### MVP (Week 1-2)
- [ ] Setup Next.js project
- [ ] TfL API integration
- [ ] Home screen with static station list
- [ ] Display live arrivals
- [ ] Basic styling with Tailwind CSS

### Phase 1 (Week 3-4)
- [ ] Add/remove stations functionality
- [ ] Search stations by name
- [ ] LocalStorage for favorites
- [ ] Responsive design
- [ ] Deploy to Vercel

### Phase 2 (Month 2)
- [ ] Map integration
- [ ] Station details page
- [ ] Auto-refresh arrivals
- [ ] PWA support (offline mode)
- [ ] Dark mode

### Phase 3 (Month 3+)
- [ ] React Native mobile app
- [ ] Push notifications
- [ ] Location-based suggestions
- [ ] Journey planning
- [ ] Disruption alerts

## 🧪 Testing Strategy

- **Unit Tests**: Jest + React Testing Library
- **E2E Tests**: Playwright or Cypress
- **API Mocking**: MSW (Mock Service Worker)

## 📝 Environment Variables

```bash
# .env.local (Next.js)
NEXT_PUBLIC_TFL_APP_ID=your_app_id_here
NEXT_PUBLIC_TFL_APP_KEY=your_app_key_here
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token_here

# Never commit this file to git!
```

## 🤝 Contributing

This is a personal project, but if you'd like to contribute:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📚 Useful Resources

### TfL API
- [TfL API Portal](https://api-portal.tfl.gov.uk/)
- [TfL API Documentation](https://api.tfl.gov.uk/)
- [Station Codes Reference](https://api.tfl.gov.uk/StopPoint/Mode/tube,elizabeth-line,dlr,overground)

### Next.js
- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)

### React Native
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Expo Documentation](https://docs.expo.dev/) (alternative to bare React Native)

### Maps
- [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/guides/)
- [React Leaflet](https://react-leaflet.js.org/)

## 🐛 Known Issues / Limitations

1. **TfL API Rate Limits**: 500 requests/min (should be sufficient)
2. **Real-time Updates**: Manual refresh needed (can add auto-refresh)
3. **Offline Mode**: Web app requires internet (PWA caching can help)

## 📄 License

MIT License - Free to use, modify, and distribute

## 👤 Author

Created for personal use - tracking trains from Romford and other London stations!

---

**Next Steps:**
1. ✅ Read this README
2. Register for TfL API key
3. Setup Next.js project
4. Start building! 🚀

---

*Last Updated: November 2025*

