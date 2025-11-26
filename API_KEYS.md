# 🔑 API Keys & Credentials Guide

This document lists all API keys needed for the London Transit Tracker app and provides step-by-step instructions for obtaining them.

---

## 📋 Required for V1 (MVP)

### 1. Transport for London (TfL) API Key

**Purpose**: Access real-time train and bus departure data  
**Cost**: FREE ✅ (500 requests per minute)  
**Priority**: **REQUIRED** - App won't work without this

#### How to Get Your TfL API Key:

##### Step 1: Visit TfL API Portal
Go to: https://api-portal.tfl.gov.uk/

##### Step 2: Create an Account
1. Click **"Sign Up"** in the top-right corner
2. Fill in the registration form:
   - Email address
   - Password (min 8 characters)
   - First name
   - Last name
3. Agree to Terms & Conditions
4. Click **"Register"**

##### Step 3: Verify Your Email
1. Check your email inbox
2. Click the verification link from TfL
3. Your account is now activated

##### Step 4: Sign In
1. Go back to https://api-portal.tfl.gov.uk/
2. Click **"Sign In"**
3. Enter your email and password

##### Step 5: Subscribe to API Product
1. Once logged in, click **"Products"** in the menu
2. Find **"500 Requests per min"** product
3. Click **"Subscribe"** button
4. Confirm subscription (it's free!)

##### Step 6: Get Your API Credentials
1. Go to **"Profile"** (your account page)
2. You'll see your API credentials:
   - **app_id**: Your unique app identifier (looks like: `1a2b3c4d5e6f7g8h`)
   - **app_key**: Your secret key (looks like: `9i8h7g6f5e4d3c2b1a0z9y8x7w6v5u4t`)
3. Copy both values

##### Step 7: Add to Your Project
Create a `.env.local` file in your project root:

```bash
TFL_APP_ID=your_app_id_here
TFL_APP_KEY=your_app_key_here
```

**⚠️ Important Security Notes**:
- Never commit `.env.local` to git
- Never share your keys publicly
- Never use `NEXT_PUBLIC_` prefix (keeps keys server-side only)
- These keys should only be used in Next.js API routes, not client code

##### Step 8: Test Your API Key
Test with curl:

```bash
curl "https://api.tfl.gov.uk/StopPoint/910GRMFD?app_id=YOUR_APP_ID&app_key=YOUR_APP_KEY"
```

If successful, you'll see JSON data about Romford station!

#### Useful TfL API Endpoints:

| Endpoint | Purpose | Example |
|----------|---------|---------|
| `/StopPoint/Search/{query}` | Search for stations | `/StopPoint/Search/Romford` |
| `/StopPoint/{id}` | Get station details | `/StopPoint/910GRMFD` |
| `/StopPoint/{id}/Arrivals` | Get live arrivals | `/StopPoint/910GRMFD/Arrivals` |

#### Common Station IDs:
- **Romford**: `910GRMFD`
- **Liverpool Street**: `940GZZLULVT`
- **Stratford**: `910GSTFD`
- **King's Cross**: `940GZZLUKSX`

---

## 🚀 Optional for V2 (Enhanced Features)

### 2. Mapbox API Key (for Maps)

**Purpose**: Display interactive maps when adding stations  
**Cost**: FREE up to 50,000 map loads/month  
**Priority**: Optional for V2 (not needed for V1)

#### How to Get Your Mapbox API Key:

##### Step 1: Visit Mapbox
Go to: https://www.mapbox.com/

##### Step 2: Create an Account
1. Click **"Sign Up"**
2. Choose **"Get started for free"**
3. Sign up with:
   - Email
   - Or GitHub account
   - Or Google account

##### Step 3: Verify Email
1. Check your email
2. Verify your account

##### Step 4: Get Your Access Token
1. After logging in, go to **Account** page
2. Scroll to **"Access tokens"** section
3. Copy your **Default public token**
   - Looks like: `pk.eyJ1IjoieW91cnVzZXJuYW1lIiwiYSI6ImNscW...`

##### Step 5: Create a New Token (Optional)
For better security, create a project-specific token:
1. Click **"Create a token"**
2. Name it: `london-transit-tracker`
3. Select scopes:
   - ✅ `styles:read`
   - ✅ `fonts:read`
   - ✅ `datasets:read`
4. Add URL restriction (optional): `localhost:3000,*.vercel.app`
5. Click **"Create token"**
6. Copy your new token

##### Step 6: Add to Your Project
Update `.env.local`:

```bash
NEXT_PUBLIC_MAPBOX_TOKEN=pk.eyJ1IjoieW91cnVzZXJuYW1lIiwiYSI6ImNscW...
```

**Note**: This one uses `NEXT_PUBLIC_` because maps run in the browser.

##### Step 7: Test in Your App
Install Mapbox GL JS:

```bash
npm install mapbox-gl
```

Test map rendering in your component.

#### Pricing Info:
- **Free tier**: 50,000 map loads/month
- Additional loads: $5 per 1,000 loads
- Personal projects rarely exceed free tier

---

### 3. Leaflet (Alternative to Mapbox) - OpenStreetMap

**Purpose**: Alternative free mapping solution  
**Cost**: COMPLETELY FREE ✅ (no limits!)  
**Priority**: Alternative to Mapbox for V2

#### How to Use Leaflet:

##### No API Key Required! 🎉

Leaflet uses OpenStreetMap data, which is free and open-source.

##### Setup:
```bash
npm install react-leaflet leaflet
```

##### That's It!
No registration, no API keys, no rate limits. Just install and use.

#### When to Choose Leaflet vs Mapbox:
- **Choose Leaflet if**: You want completely free, no limits, open-source
- **Choose Mapbox if**: You want prettier maps, better customization, modern styling

**Recommendation**: Start with Leaflet in V2 (free forever), upgrade to Mapbox later if needed.

---

## 📱 Optional for V3 (Mobile App)

### 4. Firebase Cloud Messaging (Push Notifications)

**Purpose**: Send push notifications for train alerts  
**Cost**: FREE for unlimited notifications  
**Priority**: Optional for V3 mobile app

#### How to Get Firebase Credentials:

##### Step 1: Visit Firebase Console
Go to: https://console.firebase.google.com/

##### Step 2: Create a Project
1. Click **"Add project"**
2. Enter project name: `london-transit-tracker`
3. Enable Google Analytics (optional)
4. Click **"Create project"**

##### Step 3: Add iOS App (if building iOS)
1. Click iOS icon
2. Enter bundle ID: `com.yourname.londontransit`
3. Download `GoogleService-Info.plist`
4. Add to your React Native iOS project

##### Step 4: Add Android App (if building Android)
1. Click Android icon
2. Enter package name: `com.yourname.londontransit`
3. Download `google-services.json`
4. Add to your React Native Android project

##### Step 5: Get Server Key
1. Go to Project Settings ⚙️
2. Click **"Cloud Messaging"** tab
3. Copy **Server Key**
4. Save for backend notifications

##### Step 6: Add to Environment
Update `.env.local`:

```bash
FIREBASE_SERVER_KEY=your_server_key_here
```

---

## 🔐 Security Checklist

### Before Deploying:

- [ ] All API keys are in `.env.local`
- [ ] `.env.local` is in `.gitignore`
- [ ] Created `.env.example` template (without real keys)
- [ ] Server-only keys don't use `NEXT_PUBLIC_` prefix
- [ ] No API keys hardcoded in source files
- [ ] Environment variables added to Vercel dashboard

### `.env.example` Template:

Create this file and commit it (without real values):

```bash
# TfL API Credentials (Required for V1)
TFL_APP_ID=your_app_id_here
TFL_APP_KEY=your_app_key_here

# Mapbox Token (Optional for V2)
# NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token_here

# Firebase Server Key (Optional for V3)
# FIREBASE_SERVER_KEY=your_firebase_key_here
```

---

## 📊 API Keys Status Tracker

| API Key | Required For | Status | Priority | Free? |
|---------|--------------|--------|----------|-------|
| TfL API | V1 MVP | ⚪ Not Obtained | 🔴 Critical | ✅ Yes |
| Mapbox | V2 Maps | ⚪ Not Needed Yet | 🟡 Medium | ✅ Yes (50K/mo) |
| Leaflet | V2 Maps (Alt) | ✅ No Key Needed | 🟢 Low | ✅ Yes (unlimited) |
| Firebase | V3 Notifications | ⚪ Not Needed Yet | 🟢 Low | ✅ Yes |

---

## 🆘 Troubleshooting

### TfL API Issues:

**Problem**: `401 Unauthorized` error  
**Solution**: Check your `app_id` and `app_key` are correct in `.env.local`

**Problem**: `429 Too Many Requests` error  
**Solution**: You've exceeded 500 requests/min. Wait a minute or optimize requests.

**Problem**: `503 Service Unavailable` error  
**Solution**: TfL API is down (rare). Check: https://api.tfl.gov.uk/

### Environment Variables Not Loading:

**Problem**: `undefined` values for API keys  
**Solution**: 
1. Restart Next.js dev server (`Ctrl+C` then `npm run dev`)
2. Ensure `.env.local` is in project root (same directory as `package.json`)
3. Check for typos in variable names

### Vercel Deployment Issues:

**Problem**: API calls fail in production but work locally  
**Solution**: 
1. Go to Vercel dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add all variables from `.env.local`
5. Redeploy

---

## 📚 Useful Links

### TfL API:
- Portal: https://api-portal.tfl.gov.uk/
- Documentation: https://api.tfl.gov.uk/
- Status Page: https://api.tfl.gov.uk/

### Mapbox:
- Website: https://www.mapbox.com/
- Documentation: https://docs.mapbox.com/
- Pricing: https://www.mapbox.com/pricing

### Firebase:
- Console: https://console.firebase.google.com/
- Documentation: https://firebase.google.com/docs
- Pricing: https://firebase.google.com/pricing

---

## ✅ Quick Start Checklist

Ready to start? Follow this order:

1. [ ] Register for TfL API key (5 minutes)
2. [ ] Create `.env.local` file
3. [ ] Add TfL credentials to `.env.local`
4. [ ] Test API key with curl command
5. [ ] Start building! 🚀

Skip Mapbox/Firebase for now - get those when you reach V2/V3.

---

*Last Updated: November 26, 2025*

