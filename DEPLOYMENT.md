# TaskFlow Deployment Guide

## 🚀 Deploy to Vercel (Recommended)

Vercel is the easiest and best option for deploying TaskFlow. It provides:
- ✅ Automatic HTTPS (required for PWAs)
- ✅ Global CDN for fast loading
- ✅ Automatic deployments from Git
- ✅ Perfect PWA support
- ✅ Free hosting for personal projects

### Option 1: Deploy via Vercel CLI (Fastest)

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```
   - Follow the prompts to authenticate

3. **Deploy**:
   ```bash
   vercel
   ```
   - Answer the prompts:
     - Set up and deploy? **Y**
     - Which scope? Choose your account
     - Link to existing project? **N**
     - What's your project's name? **taskflow** (or your choice)
     - In which directory is your code located? **./**
     - Want to override the settings? **N**

4. **Your app is now live!**
   - Vercel will give you a URL like: `https://taskflow-xyz.vercel.app`
   - Visit it to see your deployed app

5. **Deploy to production**:
   ```bash
   vercel --prod
   ```

### Option 2: Deploy via Vercel Website (Easiest for beginners)

1. **Push to GitHub**:
   ```bash
   # Create a new repository on GitHub.com
   # Then run these commands:
   
   git remote add origin https://github.com/YOUR_USERNAME/taskflow.git
   git branch -M main
   git push -u origin main
   ```

2. **Deploy on Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Sign Up" (use GitHub account)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel auto-detects Vite settings
   - Click "Deploy"

3. **Done!**
   - Your app is live at `https://your-project.vercel.app`
   - Every git push to main will auto-deploy

---

## 🌐 Alternative: Deploy to Netlify

Netlify is another excellent option:

### Via Netlify CLI

1. **Install Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```

2. **Login**:
   ```bash
   netlify login
   ```

3. **Deploy**:
   ```bash
   # Build first
   npm run build
   
   # Deploy
   netlify deploy --prod --dir=dist
   ```

### Via Netlify Website

1. **Push to GitHub** (same as Vercel instructions)

2. **Deploy on Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Sign up with GitHub
   - Click "Add new site" → "Import an existing project"
   - Choose your repository
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Click "Deploy"

---

## 📦 Alternative: Deploy to GitHub Pages

1. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json**:
   Add to your `package.json`:
   ```json
   {
     "homepage": "https://YOUR_USERNAME.github.io/taskflow",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Update vite.config.ts**:
   Add base path:
   ```typescript
   export default defineConfig({
     base: '/taskflow/',
     // ... rest of config
   })
   ```

4. **Deploy**:
   ```bash
   npm run deploy
   ```

---

## 🔧 Post-Deployment Checklist

After deploying, verify:

1. **✅ HTTPS is enabled** (check URL starts with https://)
2. **✅ PWA installs correctly**:
   - Visit on mobile
   - Look for "Add to Home Screen" prompt
   - Install and test
3. **✅ Notifications work**:
   - Grant permission
   - Create task with reminder
   - Verify notification appears
4. **✅ Offline mode works**:
   - Install the app
   - Turn off WiFi/data
   - App should still work
5. **✅ All pages load** (Home, Stats, History, Settings)

---

## 🎯 Recommended: Use Vercel

For TaskFlow, I strongly recommend **Vercel** because:
- Zero configuration needed
- Perfect Vite support
- Automatic HTTPS
- Free SSL certificates
- Global CDN
- Automatic PWA optimization
- Easy custom domains

---

## 🌍 Custom Domain (Optional)

### On Vercel:
1. Go to project settings
2. Click "Domains"
3. Add your custom domain
4. Update DNS records as instructed
5. SSL automatically configured

### On Netlify:
1. Go to site settings
2. Click "Domain management"
3. Add custom domain
4. Update DNS records
5. SSL automatically configured

---

## 📊 Monitoring

After deployment:
- **Vercel**: Provides analytics in dashboard
- **Netlify**: Provides built-in analytics
- Both show deployment logs and errors

---

## 🔄 Continuous Deployment

Both Vercel and Netlify support automatic deployments:
- Every `git push` to main branch triggers deployment
- Build logs available in dashboard
- Instant rollback if needed

---

## 💡 Tips

1. **Test locally first**: Always run `npm run build` and `npm run preview` before deploying
2. **Check build size**: Keep bundle size under 500KB for best performance
3. **Use environment variables**: Store sensitive data in Vercel/Netlify environment variables
4. **Monitor performance**: Use Lighthouse in Chrome DevTools to check PWA score

---

## 🆘 Troubleshooting

### Build fails on Vercel/Netlify
- Check Node version (should be 18+)
- Verify `npm run build` works locally
- Check build logs for specific errors

### PWA not installing
- Ensure HTTPS is enabled
- Check Service Worker is registered
- Verify manifest.json is accessible

### Routes not working (404 errors)
- Add `vercel.json` with rewrites (see below)

**vercel.json**:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

## ✅ You're Ready to Deploy!

Choose your preferred method above and follow the steps. Vercel CLI is the fastest way to get started!

**Quick start**:
```bash
npm install -g vercel
vercel login
vercel
```

That's it! Your TaskFlow app will be live in minutes! 🎉
