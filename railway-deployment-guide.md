# Railway Deployment Fix for Primorpho

## The Issue
Railway build failing on `npm run build` because esbuild command structure needs adjustment for Railway's environment.

## Solution Steps

### 1. Update Build Command in Railway Dashboard
In Railway project settings, override the build command:
```
npm ci && npx vite build && npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist
```

### 2. Update Start Command in Railway Dashboard
Set the start command to:
```
node dist/index.js
```

### 3. Environment Variables (from railway-secrets.txt)
```
GMAIL_USER=mikeelie.me@gmail.com
GMAIL_APP_PASSWORD=jauo cpvt agsy yude
SENDGRID_API_KEY=MQ695D66N2CAJBAAJ3G2HU11
GOOGLE_PAGESPEED_API_KEY=AIzaSyBcZ8XkUcMGn0muainB-USELq9HMNl-Akk
SESSION_SECRET=primorpho-neural-web-solutions-2025-secure-session
NODE_ENV=production
PORT=5000
```

### 4. Add PostgreSQL Service
- Add PostgreSQL service to your Railway project
- Railway will automatically provide DATABASE_URL

### 5. Root Directory Settings
- Ensure Railway is pointing to the root directory of your project
- Make sure package.json is in the root

## Alternative: Manual Build Commands
If the above doesn't work, try these individual commands in Railway:

**Build Command:**
```
npm ci && npm run check && npx vite build && npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist
```

**Start Command:**
```
NODE_ENV=production node dist/index.js
```