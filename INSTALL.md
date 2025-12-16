# TaskFlow PWA Installation Guide

## Overview
TaskFlow is a fully-featured Progressive Web App (PWA) that works offline and can be installed on your mobile device or desktop computer like a native app.

## ✨ Features
- 📱 **Install as Native App**: Works like a real app on your phone
- 🔄 **Offline Support**: All tasks stored locally, works without internet
- 🔔 **Push Notifications**: Get reminders even when offline
- 📊 **Full Functionality**: All features work offline
- 💾 **Auto-sync**: Data persists across sessions

---

## 📱 Installing on Android

### Method 1: Chrome/Edge Browser
1. Open TaskFlow in Chrome or Edge browser
2. Look for the **"Install App"** button at the bottom of the screen
3. Tap the button and confirm the installation
4. TaskFlow will appear on your home screen

### Method 2: Browser Menu
1. Open TaskFlow in Chrome
2. Tap the **⋮** (three dots) menu
3. Select **"Add to Home screen"** or **"Install app"**
4. Confirm the installation
5. Find TaskFlow on your home screen

### After Installation (Android)
- Open from your app drawer like any other app
- Full-screen experience (no browser UI)
- Notifications work automatically
- Works completely offline

---

## 🍎 Installing on iOS (iPhone/iPad)

### Safari Installation (Required)
⚠️ **Important**: iOS only supports PWAs through Safari. Chrome/Firefox won't work for installation.

1. **Open in Safari**: Navigate to TaskFlow in Safari browser
2. **Tap Share Button**: Look for the share icon (square with arrow)
3. **Add to Home Screen**: Scroll down and tap "Add to Home Screen"
4. **Customize Name**: Edit the name if desired (optional)
5. **Tap Add**: Confirm to add TaskFlow to your home screen

### After Installation (iOS)
- Open from home screen (looks like a native app)
- Full-screen mode without Safari UI
- Works offline with all features
- Enable notifications in iOS Settings:
  - Settings → TaskFlow → Notifications → Allow Notifications

### iOS Limitations
- Must use Safari for installation (not Chrome)
- Notifications require the installed app (not browser version)
- Background refresh may be limited by iOS

---

## 💻 Installing on Desktop

### Chrome, Edge, or Brave
1. Visit TaskFlow in your browser
2. Look for the **install icon** (⊕) in the address bar
3. Click it and confirm installation
4. Or use browser menu: **⋮ → Install TaskFlow**

### After Installation (Desktop)
- Opens in its own window
- Appears in your app launcher
- Full keyboard shortcuts
- Works offline

---

## ✅ Verify Installation

### Check if Installed Correctly
1. **Icon on Home Screen**: You should see the TaskFlow icon
2. **Full Screen**: App opens without browser controls
3. **Offline Mode**: Turn off WiFi/data - app should still work
4. **Notifications**: Go to Settings and enable notifications

---

## 🔧 Offline Functionality

TaskFlow works **completely offline** because:

### Local Storage
- All tasks stored in browser's local storage
- No server required
- Data persists even when offline
- Automatic save on every change

### Cached Assets
- App files cached by Service Worker
- Icons, styles, scripts all available offline
- Fast loading even without connection

### What Works Offline
✅ Create, edit, delete tasks
✅ Set reminders and due dates
✅ View analytics and history
✅ Change settings
✅ Receive local notifications
✅ Mark tasks complete/postpone

---

## 🔔 Notification Setup

### Android
1. Install app (see above)
2. Grant notification permission when prompted
3. Configure in app Settings
4. Notifications work immediately

### iOS
1. Install app via Safari (see above)
2. Open installed app from home screen
3. Grant permission in app when prompted
4. Also enable in iOS Settings:
   - Settings → TaskFlow → Notifications

---

## 🆘 Troubleshooting

### App Not Installing
- **Android**: Make sure you're using Chrome or Edge
- **iOS**: Must use Safari browser only
- Try clearing browser cache and reload
- Check if device storage is full

### Notifications Not Working
- Check notification permission in app Settings
- Verify device notification settings
- **iOS**: Must be installed app, not browser
- Try reinstalling the app

### Offline Mode Issues
- Ensure app was installed (not just bookmarked)
- Check browser storage isn't full
- Try clearing cache and reinstalling

### Updates Not Showing
- Close and reopen the app
- Service Worker updates automatically
- Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

---

## 📊 Storage Information

TaskFlow stores data locally using:
- **localStorage**: For tasks and settings (~10MB limit typical)
- **Service Worker Cache**: For app files
- **IndexedDB**: Future enhancement for larger datasets

All data stays on your device - nothing sent to servers.

---

## 🔄 Updating the App

PWA updates happen automatically:
1. Service Worker detects new version
2. Downloads in background
3. Updates on next app restart
4. No manual update needed

---

## 🗑️ Uninstalling

### Android
- Long press TaskFlow icon
- Drag to "Uninstall" or tap ⓘ → Uninstall

### iOS
- Long press TaskFlow icon
- Tap "Remove App" → "Delete App"

### Desktop
- Right-click app icon
- Select "Uninstall" or "Remove"

---

## 💡 Tips for Best Experience

1. **Install the App**: Don't just bookmark - install for full offline support
2. **Enable Notifications**: Get timely reminders
3. **iOS Users**: Always use Safari for installation
4. **Check Storage**: Ensure device has adequate storage
5. **Update Regularly**: Keep app closed/reopened occasionally

---

## 🆘 Need Help?

If you have issues:
1. Try reinstalling the app
2. Check browser/device compatibility
3. Ensure latest browser version
4. Clear cache and try again

**Supported Browsers:**
- ✅ Chrome (Android/Desktop)
- ✅ Edge (Android/Desktop)
- ✅ Safari (iOS/macOS)
- ✅ Brave (Android/Desktop)
- ⚠️ Firefox (limited PWA support)
