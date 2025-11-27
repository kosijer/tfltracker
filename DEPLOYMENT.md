# Deployment Guide - TFL Live

## Option 1: Vercel (Recommended - FREE) ⭐

Vercel is the best option for Next.js apps with API routes.

### Prerequisites
- GitHub account (you already have this)
- Vercel account (sign up with GitHub at https://vercel.com)

### Step 1: Push Your Code to GitHub
```bash
# You've already done this! Your repo is at:
# https://github.com/kosijer/tfltracker
```

### Step 2: Deploy to Vercel

1. **Go to Vercel**: https://vercel.com
2. **Sign up/Login** with your GitHub account
3. **Import Project**:
   - Click "Add New..." → "Project"
   - Select your GitHub repository: `kosijer/tfltracker`
   - Vercel will auto-detect it's a Next.js project
4. **Configure Project**:
   - Framework Preset: `Next.js` (auto-detected)
   - Root Directory: `london-transit-web` ⚠️ **IMPORTANT**
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
5. **Add Environment Variables**:
   - Click "Environment Variables"
   - Add: `TFL_APP_KEY` = `your-actual-api-key`
   - Make sure it's available for Production, Preview, and Development
6. **Click "Deploy"**

### Step 3: Wait for Deployment
- Vercel will build and deploy your app (takes 1-2 minutes)
- You'll get a URL like: `https://tfltracker-xyz.vercel.app`
- Every push to `main` branch will auto-deploy! 🎉

### Managing Environment Variables in Vercel

1. Go to your project dashboard
2. Click "Settings" tab
3. Click "Environment Variables" in sidebar
4. Add/Edit variables:
   - **Name**: `TFL_APP_KEY`
   - **Value**: Your TfL API key
   - **Environments**: Check all (Production, Preview, Development)

### Custom Domain (Optional)
- In Vercel project settings → Domains
- Add your custom domain (e.g., `tfl.yourdomain.com`)
- Follow DNS configuration instructions

---

## Option 2: Netlify (Alternative - FREE)

Similar to Vercel, supports Next.js.

### Steps:
1. Go to https://netlify.com
2. Sign up with GitHub
3. "Add new site" → "Import an existing project"
4. Select your repo
5. Configure:
   - Base directory: `london-transit-web`
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Add environment variables in Site Settings → Environment variables
   - `TFL_APP_KEY` = your key

---

## Option 3: Railway (Alternative - FREE tier)

Supports serverless functions well.

### Steps:
1. Go to https://railway.app
2. "New Project" → "Deploy from GitHub repo"
3. Select repository
4. Add environment variable: `TFL_APP_KEY`
5. Railway auto-deploys

---

## ❌ GitHub Pages (NOT Recommended)

GitHub Pages only supports static HTML/CSS/JS files. Your app needs:
- Server-side API routes (won't work)
- Environment variables on the server (won't work)

**If you absolutely must use GitHub Pages**, you would need to:
1. Remove all API routes
2. Call TfL API directly from the browser (exposes your API key! 🚨)
3. Deal with CORS issues

**This is NOT recommended for security reasons.**

---

## Comparison Table

| Feature | Vercel | Netlify | Railway | GitHub Pages |
|---------|--------|---------|---------|--------------|
| Free Tier | ✅ Yes | ✅ Yes | ✅ Yes (limit) | ✅ Yes |
| API Routes | ✅ Yes | ✅ Yes | ✅ Yes | ❌ No |
| Environment Variables | ✅ Yes | ✅ Yes | ✅ Yes | ❌ No |
| Auto Deploy | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes |
| Custom Domain | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes |
| Next.js Optimized | ⭐ Best | Good | Good | ❌ No |

---

## Recommended: Vercel

**Why Vercel?**
- Built by Next.js creators (Vercel = Next.js company)
- Zero configuration
- Generous free tier
- Best performance for Next.js
- Automatic SSL certificates
- Edge network (fast globally)
- Great developer experience

---

## Security Note 🔒

**NEVER commit your API key to GitHub!**

Your `.env.local` is already in `.gitignore` ✅

Always add API keys through the hosting platform's dashboard, not in code.

---

## Need Help?

If you run into issues:
1. Check Vercel deployment logs
2. Verify environment variables are set
3. Make sure `Root Directory` is set to `london-transit-web`
4. Check build command output for errors

---

## After Deployment

Test your deployed app:
1. Open the Vercel URL
2. Try adding a station (tests API routes)
3. Check browser console for errors
4. Verify departures load correctly

Your app should work exactly like localhost! 🚀

