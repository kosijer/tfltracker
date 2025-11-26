# 🗓 London Transit Tracker - Development Roadmap

**Last Updated**: November 26, 2025  
**Current Phase**: V1 Development - Week 2 (70% Complete!)

This document tracks all tasks chronologically and serves as commit checkpoints.

---

## 📋 Phase 0: Planning & Setup (Week 0)

### ✅ Completed
- [x] Create project README.md
- [x] Define V1 MVP scope
- [x] Document tech stack decisions
- [x] Create development roadmap
- [x] Create API keys documentation
- [x] Initial git commit

**Checkpoint**: `Initial project documentation complete`

---

## 🚀 Phase 1: V1 MVP Development (Weeks 1-2)

### Week 1: Core Foundation

#### Task 1.1: Project Setup ✅ COMPLETE
**Goal**: Bootstrap Next.js project with TypeScript and Tailwind CSS

- [x] Create Next.js project with TypeScript
- [x] Configure Tailwind CSS
- [x] Setup project structure (app router)
- [x] Create `.gitignore` for Next.js
- [x] Configure `tsconfig.json`
- [x] Test dev server runs

**Checkpoint**: `chore: Initialize Next.js project with TypeScript and Tailwind` ✅

---

#### Task 1.2: Environment Configuration ✅ COMPLETE
**Goal**: Setup environment variables and API security

- [x] Create `.env.local` file
- [x] Add TfL API credentials (from API_KEYS.md guide)
- [x] Add `.env.local` to `.gitignore`
- [x] Create `.env.example` template
- [x] Document environment setup in project

**Checkpoint**: `chore: Configure environment variables for TfL API` ✅

---

#### Task 1.3: TypeScript Types & Interfaces ✅ COMPLETE
**Goal**: Define data models for stations and arrivals

- [x] Create `types/station.ts` interface
- [x] Create `types/arrival.ts` interface
- [x] Create `types/tfl-api.ts` for API responses
- [x] Document type definitions

**Files created**:
```
/types
  ├── station.ts ✅
  ├── arrival.ts ✅
  └── tfl-api.ts ✅
```

**Checkpoint**: `feat: Add TypeScript interfaces for Station and Arrival models` ✅

---

#### Task 1.4: TfL API Proxy Routes ✅ COMPLETE
**Goal**: Create secure Next.js API routes to proxy TfL API

- [x] Create `/app/api/stations/search/route.ts`
  - Search stations by query
  - Filter by modes (tube, bus, overground, elizabeth-line)
- [x] Create `/app/api/stations/[id]/arrivals/route.ts`
  - Get live arrivals for specific station
  - Sort by time
- [x] Test API routes with Postman/curl
- [x] Add error handling

**Files created**:
```
/app/api
  ├── stations
  │   ├── search
  │   │   └── route.ts ✅
  │   └── [id]
  │       └── arrivals
  │           └── route.ts ✅
```

**Checkpoint**: `feat: Add TfL API proxy routes for search and arrivals` ✅

---

#### Task 1.5: Basic Layout & Styling ✅ COMPLETE
**Goal**: Create app layout with Tailwind styles

- [x] Create root layout (`app/layout.tsx`)
- [x] Add custom fonts (if needed)
- [x] Setup Tailwind config with custom colors
- [x] Create global styles
- [x] Add responsive meta tags

**Checkpoint**: `feat: Setup app layout and Tailwind configuration` ✅

---

#### Task 1.6: Home Page Structure ✅ COMPLETE
**Goal**: Build main page with hardcoded station

- [x] Create `app/page.tsx`
- [x] Add app title/header
- [x] Create hardcoded Romford station card
- [x] Add placeholder for departures
- [x] Style with Tailwind (mobile-first)
- [x] Test responsive design

**Checkpoint**: `feat: Create home page with basic layout` ✅

---

#### Task 1.7: Fetch & Display Live Arrivals ✅ COMPLETE
**Goal**: Connect to API and show real departure times

- [x] Create utility function to fetch arrivals
- [x] Format arrival times (e.g., "3 mins")
- [x] Display next 3 departures per station
- [x] Add loading state
- [x] Add error handling (API down, no data)
- [x] Show line names and destinations

**Checkpoint**: `feat: Display live arrivals from TfL API` ✅

---

### Week 2: User Features & Polish

#### Task 2.1: LocalStorage Management ✅ COMPLETE
**Goal**: Persist favorite stations across sessions

- [x] Create `utils/storage.ts` helper
- [x] Implement `saveStations()` function
- [x] Implement `loadStations()` function
- [x] Load stations on app mount
- [x] Handle localStorage errors (quota exceeded, etc.)

**Checkpoint**: `feat: Add localStorage persistence for favorite stations` ✅

---

#### Task 2.2: Station List Component ✅ COMPLETE
**Goal**: Replace hardcoded station with dynamic list

- [x] Create `components/StationCard.tsx`
- [x] Map over favorite stations
- [x] Fetch arrivals for each station
- [x] Handle empty state (no stations saved)
- [x] Add key prop for React list

**Checkpoint**: `feat: Create dynamic station list component` ✅

---

#### Task 2.3: Remove Station Feature ✅ COMPLETE
**Goal**: Allow users to delete stations

- [x] Add remove button (X) to each station card
- [x] Implement remove station handler
- [x] Update localStorage
- [x] Add confirmation (optional for V1)
- [x] Update UI immediately

**Checkpoint**: `feat: Add remove station functionality` ✅

---

#### Task 2.4: Refresh Button ✅ COMPLETE
**Goal**: Manual refresh for latest departure times

- [x] Add refresh button in header
- [x] Implement refresh handler (re-fetch all arrivals)
- [x] Show "Refreshing..." state
- [x] Show "Last updated: HH:MM" timestamp
- [x] Add icon (🔄)

**Checkpoint**: `feat: Add manual refresh for departure times` ✅

---

#### Task 2.5: Add Station Modal ✅ COMPLETE
**Goal**: Search and add new stations

- [x] Create Add Station Modal (integrated in page.tsx)
- [x] Add modal open/close state
- [x] Create search input with debouncing
- [x] Call search API endpoint
- [x] Display search results as list
- [x] Add station on click
- [x] Save to localStorage
- [x] Close modal after adding
- [x] Handle duplicate stations

**Checkpoint**: `feat: Add station search and add functionality` ✅

---

#### Task 2.6: Error Handling & Edge Cases
**Goal**: Handle errors gracefully

- [ ] Show error message if API fails
- [ ] Handle no arrivals found
- [ ] Handle invalid station IDs
- [ ] Handle network timeout
- [ ] Add retry button
- [ ] Show user-friendly error messages

**Checkpoint**: `fix: Add comprehensive error handling`

---

#### Task 2.7: Loading States & UX Polish
**Goal**: Improve user experience with loading indicators

- [ ] Add skeleton loading for station cards
- [ ] Add spinner for search results
- [ ] Disable buttons while loading
- [ ] Add smooth transitions (fade in/out)
- [ ] Improve button hover states

**Checkpoint**: `feat: Add loading states and UI polish`

---

#### Task 2.8: Responsive Design Testing
**Goal**: Ensure app works on all screen sizes

- [ ] Test on mobile (320px - 480px)
- [ ] Test on tablet (768px - 1024px)
- [ ] Test on desktop (1280px+)
- [ ] Fix layout issues
- [ ] Ensure touch targets are 44px+ on mobile

**Checkpoint**: `fix: Improve responsive design for all devices`

---

#### Task 2.9: Settings Modal (Optional V1)
**Goal**: Basic settings for user preferences

- [ ] Create `components/SettingsModal.tsx`
- [ ] Add auto-refresh toggle (ON/OFF)
- [ ] Add departures count selector (2/3/5)
- [ ] Save preferences to localStorage
- [ ] Apply settings globally
- [ ] Implement auto-refresh if enabled (60s interval)

**Checkpoint**: `feat: Add optional settings modal` (optional)

---

#### Task 2.10: Testing & Bug Fixes
**Goal**: Test all features and fix bugs

- [ ] Test add station flow
- [ ] Test remove station flow
- [ ] Test refresh functionality
- [ ] Test localStorage persistence
- [ ] Test with multiple stations (5-10)
- [ ] Test with no stations
- [ ] Test on different browsers (Chrome, Safari, Firefox)
- [ ] Fix any bugs found

**Checkpoint**: `fix: Address V1 bugs and improve stability`

---

#### Task 2.11: Production Build & Optimization
**Goal**: Prepare for deployment

- [ ] Run `npm run build` and fix any errors
- [ ] Optimize images (if any)
- [ ] Remove console.logs
- [ ] Add meta tags for SEO
- [ ] Add favicon
- [ ] Test production build locally

**Checkpoint**: `chore: Optimize for production build`

---

#### Task 2.12: Deploy to Vercel
**Goal**: Launch V1 to production!

- [ ] Create Vercel account (if needed)
- [ ] Connect GitHub repository
- [ ] Add environment variables in Vercel dashboard
  - `TFL_APP_ID`
  - `TFL_APP_KEY`
- [ ] Deploy to production
- [ ] Test live URL
- [ ] Share with friends/test users

**Checkpoint**: `chore: Deploy V1 to Vercel` 🚀

---

#### Task 2.13: V1 Documentation
**Goal**: Document V1 completion and learnings

- [ ] Update README.md with live URL
- [ ] Document known issues
- [ ] Document usage instructions
- [ ] Add screenshots to README
- [ ] Update ROADMAP.md with V1 completion

**Checkpoint**: `docs: Update documentation for V1 release`

---

## ✅ V1 MVP Complete! 🎉

**Target Completion**: End of Week 2  
**Status**: Ready to use daily!

**Post-V1 Actions**:
1. Use the app for 1-2 weeks
2. Gather feedback and pain points
3. Prioritize V2 features based on real usage
4. Plan V2 roadmap

---

## 🚀 Phase 2: V2 Enhanced Features (Month 2)

### Task 3.1: Map Integration
- [ ] Research Leaflet vs Mapbox
- [ ] Install map library
- [ ] Add map to add station modal
- [ ] Show station location on map
- [ ] Add map to station detail page (if added)

**Checkpoint**: `feat: Add map preview for station locations`

---

### Task 3.2: Station Detail Page
- [ ] Create station detail route
- [ ] Show all lines and directions
- [ ] Show more departures (5-10)
- [ ] Add back button
- [ ] Link from home page cards

**Checkpoint**: `feat: Add detailed station view page`

---

### Task 3.3: Filter Departures
- [ ] Add filter by line
- [ ] Add filter by direction
- [ ] Show/hide different transport modes
- [ ] Save filter preferences

**Checkpoint**: `feat: Add departure filtering options`

---

### Task 3.4: Dark Mode
- [ ] Setup Tailwind dark mode
- [ ] Create toggle button
- [ ] Save preference to localStorage
- [ ] Test all components in dark mode

**Checkpoint**: `feat: Add dark mode support`

---

### Task 3.5: PWA Support
- [ ] Add service worker
- [ ] Create manifest.json
- [ ] Add offline support
- [ ] Add install prompt
- [ ] Test offline functionality

**Checkpoint**: `feat: Add PWA support for offline mode`

---

### Task 3.6: Animations & Polish
- [ ] Add page transitions
- [ ] Add card animations
- [ ] Improve button interactions
- [ ] Add micro-interactions
- [ ] Polish overall design

**Checkpoint**: `feat: Add animations and UI polish`

---

## 📱 Phase 3: V3 Mobile Application (Month 3+)

### Task 4.1: Monorepo Setup
- [ ] Setup pnpm/yarn workspaces
- [ ] Restructure as monorepo
- [ ] Create `packages/web` directory
- [ ] Create `packages/mobile` directory
- [ ] Create `packages/shared` directory
- [ ] Move common code to shared package

**Checkpoint**: `chore: Restructure project as monorepo`

---

### Task 4.2: React Native Project
- [ ] Initialize React Native project
- [ ] Setup TypeScript
- [ ] Setup navigation
- [ ] Share types from web app
- [ ] Share API client from web app

**Checkpoint**: `feat: Initialize React Native mobile app`

---

### Task 4.3: Mobile Features
- [ ] Port home screen to mobile
- [ ] Port search functionality
- [ ] Add native storage (AsyncStorage)
- [ ] Test on iOS simulator
- [ ] Test on Android emulator

**Checkpoint**: `feat: Implement core mobile features`

---

### Task 4.4: Push Notifications
- [ ] Setup Firebase Cloud Messaging
- [ ] Request notification permissions
- [ ] Send departure alerts
- [ ] Handle notification taps

**Checkpoint**: `feat: Add push notifications for departures`

---

### Task 4.5: Mobile App Store Deployment
- [ ] Prepare iOS build
- [ ] Prepare Android build
- [ ] Submit to App Store (if desired)
- [ ] Submit to Play Store (if desired)

**Checkpoint**: `chore: Deploy mobile apps to stores`

---

## 🔮 Phase 4: Future Enhancements (V4+)

### Ideas to Explore:
- [ ] Disruption alerts
- [ ] Journey planning
- [ ] Favorite routes (not just stations)
- [ ] Crowding information
- [ ] Historical data / patterns
- [ ] Share station with friends
- [ ] Widget support (mobile)
- [ ] Apple Watch / Wear OS apps
- [ ] Siri Shortcuts / Google Assistant

---

## 📊 Progress Tracking

| Phase | Status | Start Date | End Date | Notes |
|-------|--------|------------|----------|-------|
| Phase 0: Planning | ✅ Complete | Nov 26, 2025 | Nov 26, 2025 | Docs created |
| Phase 1: V1 MVP | 🟡 Pending | - | - | Starting soon |
| Phase 2: V2 Features | ⚪ Not Started | - | - | After V1 usage |
| Phase 3: V3 Mobile | ⚪ Not Started | - | - | After V2 |
| Phase 4: Future | ⚪ Not Started | - | - | TBD |

---

## 🎯 Current Sprint

**Sprint**: Phase 0 → Phase 1  
**Focus**: Complete V1 MVP in 2 weeks  
**Next Task**: Task 1.1 - Project Setup

---

## 📝 Notes & Decisions

### Decision Log:
- **Nov 26, 2025**: Decided on V1 MVP approach (single screen, essential features only)
- **Nov 26, 2025**: Chose Next.js App Router over Pages Router
- **Nov 26, 2025**: Decided to skip maps in V1 for faster delivery

### Lessons Learned:
- (To be filled after V1 completion)

### Blockers:
- None currently

---

*This roadmap is a living document. Update after each completed task.*

