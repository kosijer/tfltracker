# London Transit Tracker 🚂🚌

A simple, user-friendly application to track next trains and buses from your favorite London stations using Transport for London (TfL) real-time data.

---

## 📦 Quick Summary

| **What** | Single-page web app showing live train/bus departures |
|----------|-----------------------------------------------------|
| **Why** | Know when to leave home for Romford station (or any London station) |
| **Tech** | Next.js + TypeScript + Tailwind CSS |
| **API** | TfL Unified API (free, 500 req/min) |
| **Cost** | $0 (completely free) |
| **Timeline** | V1 in 1-2 weeks, then expand |
| **Mobile** | V3 (React Native) - build web first |

**Core Features (V1)**: Favorite stations list → Live departures (next 3) → Add/remove stations → Refresh  
**That's it!** No maps, no complex pages, just what you need. 🎯

---

## 📋 Project Overview

This project aims to help commuters in London quickly check when the next train or bus is arriving at their frequently-used stations. Starting with a web application, it will eventually expand to a mobile app.

**Use Case Example:**  
You use Romford station and need to catch the Elizabeth line. You also rely on a nearby bus station. This app lets you quickly see all departure times so you can plan when to leave home.

## 🎨 Design Philosophy

**V1 Principle: Ruthlessly Simple**

> "I just want to open the app and see when my next train is. That's it."

We're building **ONE screen** that does **ONE thing** really well:
- ✅ Show your favorite stations
- ✅ Show next few departures
- ✅ Quick refresh
- ✅ That's it!

**No fluff. No complexity. No friction.**

Maps, detailed views, fancy animations? **V2 problem.**  
First, let's build something you'll actually use daily. 🚂

### Why V1 First?
1. **Ship Fast**: Get a working app in 1-2 weeks, not months
2. **Learn Real Usage**: Discover what features you actually need
3. **Stay Motivated**: Use your own app immediately
4. **Iterate**: Easy to add features once core is solid
5. **Avoid Waste**: Don't build features you won't use

**Perfect is the enemy of done.** Let's get to done. ✅

---

## 🚀 Quick Deployment

This app is ready to deploy! See **[DEPLOYMENT.md](DEPLOYMENT.md)** for full guide.

**Recommended: Vercel (FREE)**
1. Push code to GitHub ✅ (already done)
2. Sign up at [vercel.com](https://vercel.com)
3. Import your GitHub repo
4. Set Root Directory to `london-transit-web`
5. Add environment variable: `TFL_APP_KEY`
6. Deploy! 🎉

Your app will be live at `https://your-app.vercel.app`

**⚠️ Don't use GitHub Pages** - it doesn't support API routes.

---

## ✨ Features

### 🎯 Version 1 (MVP) - Essential Features Only
**Goal**: Simple, fast, functional app to check "when should I leave home?"

#### Core Features
- ✅ **Favorite Stations List**: Display your saved stations on home screen
- ✅ **Live Departures**: Show next 2-3 trains/buses for each station
- ✅ **Add/Remove Stations**: Search and manage your station list
- ✅ **Station Search**: Find TfL stations by name (tube, bus, overground, Elizabeth line)
- ✅ **Local Storage**: Stations persist across sessions
- ✅ **Manual Refresh**: Update arrivals with a button

#### Optional Settings (V1)
- 🔄 **Auto-refresh toggle**: Enable/disable automatic updates (every 30-60s)
- 📊 **Departures count**: Choose to show 2, 3, or 5 upcoming arrivals

### 🚀 Version 2 - Enhanced Features
- ⚙️ User settings/configuration panel (custom refresh intervals, departure counts per station)
- ⚠️ Line status alerts (delays, closures, disruptions) via TfL Line Status API
- 🗺️ Map preview when adding stations
- 📄 Detailed station view (separate screen)
- 🌙 Dark mode
- 🎨 Better UI/animations
- 📱 PWA support (offline mode)

### 📱 Version 3 - Mobile Application
- 📱 React Native iOS & Android apps
- 🔔 Push notifications for departure alerts
- 📍 Location-based nearby station suggestions
- ⏰ Journey alerts ("leave home in 5 mins")

## 🛠 Tech Stack

### V1 - Web Application (MVP)
**Keep it simple!**

- **Framework**: [Next.js 14+](https://nextjs.org/) with App Router
  - API routes to proxy TfL API (secure, hides API keys)
  - Server-side rendering for fast loads
  - Built-in routing
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
  - Utility-first CSS
  - Responsive by default
  - Fast development
- **State Management**: React useState + localStorage
  - No complex state library needed for V1
  - Simple and straightforward
- **API Client**: Native `fetch` API
  - No extra dependencies needed
  - Built into modern browsers
- **Date Handling**: [date-fns](https://date-fns.org/)
  - Format timestamps ("3 mins ago")
  - Lightweight

**Dependencies for V1:**
```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "date-fns": "^3.0.0"
  },
  "devDependencies": {
    "tailwindcss": "^3.4.0",
    "typescript": "^5.3.0"
  }
}
```

### V2+ - Additional Tools
- **Maps**: Leaflet (OpenStreetMap) or Mapbox GL JS
- **State Management**: Zustand (if needed)
- **PWA**: next-pwa plugin

### V3 - Mobile Application (Future)
- **Framework**: React Native
- **Navigation**: React Navigation
- **State Management**: Zustand (shared with web)
- **Maps**: React Native Maps

### Backend / API
- **Data Source**: TfL Unified API (free, 500 requests/min)
- **No custom backend needed** ✅
- **Security**: Next.js API routes proxy TfL API (hides keys)

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

### Installation (V1 Web App)

```bash
# Create Next.js app with TypeScript and Tailwind
npx create-next-app@latest london-transit-web --typescript --tailwind --app --no-src-dir

cd london-transit-web

# Install only essential dependencies for V1
npm install date-fns

# Create .env.local file for TfL API credentials
cat > .env.local << EOF
TFL_APP_ID=your_app_id_here
TFL_APP_KEY=your_app_key_here
EOF

# Start development server
npm run dev
```

Visit http://localhost:3000

**Note**: No axios, no mapbox, no extra dependencies for V1! Keep it lean.

## 📱 Screen Design (V1 - MVP)

### 1. Home Screen (Stations List) - ONLY SCREEN FOR V1
```
┌─────────────────────────────────┐
│  London Transit    [🔄] [⚙️]    │
├─────────────────────────────────┤
│                                 │
│  📍 Romford Station        [×]  │
│     Elizabeth Line → 3 mins     │
│     Overground → 8 mins         │
│     Overground → 23 mins        │
│                                 │
│  📍 Liverpool Street       [×]  │
│     Circle Line → 5 mins        │
│     Metropolitan → 7 mins       │
│     Elizabeth Line → 12 mins    │
│                                 │
│  📍 Bus Stop: High St      [×]  │
│     174 → 2 mins                │
│     86 → 10 mins                │
│     86 → 25 mins                │
│                                 │
│  Last updated: 14:32            │
│                                 │
├─────────────────────────────────┤
│                                 │
│          [+ Add Station]        │
│                                 │
└─────────────────────────────────┘

[🔄] = Refresh button
[⚙️] = Settings (optional for V1)
[×] = Remove station button
```

### 2. Add Station Modal (Simple Search)
```
┌─────────────────────────────────┐
│  Add Station              [×]   │
├─────────────────────────────────┤
│                                 │
│  🔍 [Search stations...]        │
│                                 │
│  Search Results:                │
│                                 │
│  ┌─────────────────────────┐   │
│  │ Romford                 │   │
│  │ Rail Station            │   │
│  │ [+ Add]                 │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │ Romford Market          │   │
│  │ Bus Stop                │   │
│  │ [+ Add]                 │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │ Romford Station (Stop R)│   │
│  │ Bus Stop                │   │
│  │ [+ Add]                 │   │
│  └─────────────────────────┘   │
│                                 │
└─────────────────────────────────┘
```

### 3. Settings Modal (Optional for V1)
```
┌─────────────────────────────────┐
│  Settings                 [×]   │
├─────────────────────────────────┤
│                                 │
│  Auto-refresh departures        │
│  [ ON  / OFF ]                  │
│                                 │
│  Show departures                │
│  [ 2 ] [ 3 ] [ 5 ]              │
│                                 │
│  [Save]                         │
│                                 │
└─────────────────────────────────┘
```

---

## 🎨 V2+ Screen Designs (Future)

### Station Details Page (V2)
```
┌─────────────────────────────────┐
│  [←]  Romford Station      [⭐] │
├─────────────────────────────────┤
│  Elizabeth Line (Eastbound)     │
│  ├─ 3 mins  Platform 1          │
│  ├─ 8 mins  Platform 1          │
│  └─ 18 mins Platform 1          │
│                                 │
│  [🗺️ Show on Map]               │
└─────────────────────────────────┘
```

## 🎯 V1 Scope - What We're Building

**The Goal**: A single-page app where you can:
1. See your favorite stations (Romford, etc.)
2. See next 3 trains/buses for each
3. Add/remove stations
4. Refresh to get latest times
5. Stations saved in browser (localStorage)

**What we're NOT building in V1:**
- ❌ No map
- ❌ No separate detail pages
- ❌ No complex routing
- ❌ No notifications
- ❌ No filters
- ❌ No dark mode

**One screen. Simple. Fast. Done.** ✅

---

## 🔧 Core Features Implementation (V1)

### 1. Next.js API Route - Search Stations
Create `/app/api/stations/search/route.ts`:

```typescript
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');
  
  const response = await fetch(
    `https://api.tfl.gov.uk/StopPoint/Search/${encodeURIComponent(query || '')}?modes=tube,overground,elizabeth-line,dlr,bus&app_id=${process.env.TFL_APP_ID}&app_key=${process.env.TFL_APP_KEY}`
  );
  
  const data = await response.json();
  return Response.json(data);
}
```

### 2. Next.js API Route - Get Arrivals
Create `/app/api/stations/[id]/arrivals/route.ts`:

```typescript
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const response = await fetch(
    `https://api.tfl.gov.uk/StopPoint/${params.id}/Arrivals?app_id=${process.env.TFL_APP_ID}&app_key=${process.env.TFL_APP_KEY}`
  );
  
  const data = await response.json();
  return Response.json(data);
}
```

### 3. Client-Side - Store Favorite Stations
```typescript
// Save stations
const saveStations = (stations: Station[]) => {
  localStorage.setItem('favoriteStations', JSON.stringify(stations));
};

// Load stations on app start
const loadStations = (): Station[] => {
  const stored = localStorage.getItem('favoriteStations');
  return stored ? JSON.parse(stored) : [];
};
```

### 4. Client-Side - Fetch Arrivals
```typescript
const fetchArrivals = async (stationId: string) => {
  const response = await fetch(`/api/stations/${stationId}/arrivals`);
  const arrivals = await response.json();
  
  // Sort by time and take first 3
  return arrivals
    .sort((a, b) => a.timeToStation - b.timeToStation)
    .slice(0, 3);
};
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

#### V1 Costs:
| Service | Cost | Notes |
|---------|------|-------|
| TfL API | FREE ✅ | 500 req/min limit |
| Next.js | FREE ✅ | Open source |
| Tailwind CSS | FREE ✅ | Open source |
| Vercel Hosting | FREE ✅ | Hobby plan sufficient |
| **V1 Total** | **$0** | ✅ Completely free! |

#### V2+ Costs (Future):
| Service | Cost | Notes |
|---------|------|-------|
| Maps (Leaflet) | FREE ✅ | OpenStreetMap, unlimited |
| React Native | FREE ✅ | Open source |
| **Still Free!** | **$0** | ✅ |

#### Only Costs If You Want Mobile App Stores:
| Service | Cost | Notes |
|---------|------|-------|
| iOS App Store | $99/year | Apple Developer Program |
| Android Play Store | $25 once | One-time fee |
| **PWA Alternative** | **FREE** | Install as web app instead! |

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

## 🗺 Map Integration (V2+)

**Not needed for V1!** Maps will be added in V2.

### Future Options (V2):

**Option 1: Leaflet (Recommended for V2)**
- Completely free, no limits
- Open source, community-maintained
- Lightweight
```bash
npm install react-leaflet leaflet
```

**Option 2: Mapbox**
- Beautiful, modern maps
- Free tier: 50,000 map loads/month
- Better styling options
```bash
npm install mapbox-gl
```

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

### 🎯 V1 - MVP (Week 1-2) - **FOCUS HERE FIRST**
**Goal**: Get a working app to check Romford departures ASAP!

#### Week 1
- [ ] Setup Next.js project with Tailwind CSS
- [ ] TfL API integration (search + arrivals endpoints)
- [ ] Create Next.js API routes to proxy TfL API (security)
- [ ] Home screen: display hardcoded stations list
- [ ] Display live arrivals (next 3 departures per station)
- [ ] Add refresh button

#### Week 2
- [ ] Implement localStorage for favorite stations
- [ ] Add station search functionality (modal)
- [ ] Add/remove stations from favorites
- [ ] Show last updated timestamp
- [ ] Basic error handling (API failures)
- [ ] Responsive design (mobile-first)
- [ ] Deploy to Vercel

#### Optional (if time allows in V1)
- [ ] Settings modal (auto-refresh on/off, departures count)
- [ ] Auto-refresh every 60 seconds
- [ ] Loading states and skeletons

---

### 🚀 V2 - Enhanced UX (Month 2)
- [ ] Map integration (Leaflet/Mapbox)
- [ ] Station details page (tap station to see more)
- [ ] Filter departures by line
- [ ] Better error messages
- [ ] Dark mode toggle
- [ ] Animations and polish
- [ ] PWA support (offline mode, install prompt)

### 📱 V3 - Mobile App (Month 3+)
- [ ] Setup React Native with monorepo
- [ ] Share API client and types from web app
- [ ] Native iOS & Android apps
- [ ] Push notifications
- [ ] Location-based nearby stations
- [ ] Background refresh
- [ ] Journey planning (optional)

### 🔮 V4 - Advanced Features (Future)
- [ ] Disruption alerts
- [ ] Favorite routes (not just stations)
- [ ] Historical data (typical wait times)
- [ ] Crowding information
- [ ] Share station link with friends

## 🧪 Testing Strategy

- **Unit Tests**: Jest + React Testing Library
- **E2E Tests**: Playwright or Cypress
- **API Mocking**: MSW (Mock Service Worker)

## 📝 Environment Variables

### V1 - Just TfL API Keys
```bash
# .env.local (Next.js)
TFL_APP_ID=your_app_id_here
TFL_APP_KEY=your_app_key_here

# Never commit this file to git!
# Add .env.local to .gitignore
```

**Note**: 
- Use `TFL_APP_ID` (NOT `NEXT_PUBLIC_*`) to keep keys secret on server
- Only expose via API routes, never to client
- No `NEXT_PUBLIC_` prefix = server-only, more secure

### V2+ - Additional Keys
```bash
# Add these later when you add maps in V2
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token_here
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

## 🚀 Next Steps to Build V1

### Immediate Actions:
1. ✅ Read this README (you're here!)
2. **Register for TfL API key** → https://api-portal.tfl.gov.uk/
   - Create account
   - Subscribe to "500 Requests per min" product
   - Get your `app_id` and `app_key`
3. **Create Next.js project** (see Installation section above)
4. **Build the 3 core parts:**
   - API routes for TfL proxy
   - Home page with stations list
   - Add station modal
5. **Test with Romford station** 🚂
6. **Deploy to Vercel** (1-click deploy)

### V1 Checklist (Can Build in 1-2 Weeks):
- [ ] Setup Next.js + Tailwind + TypeScript
- [ ] Create TfL API proxy routes (search + arrivals)
- [ ] Build home page with hardcoded station
- [ ] Add localStorage for favorites
- [ ] Add station search modal
- [ ] Add remove station button
- [ ] Add refresh button
- [ ] Deploy to Vercel
- [ ] **DONE! Use it daily to catch your trains!** ✅

---

*Last Updated: November 2025*
*Version 1 Plan - Simple, Fast, Functional*

