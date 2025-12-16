# TaskFlow Push Notifications Guide

## Overview
TaskFlow now features a comprehensive push notification system that works on both Android and iOS devices. The system includes:

- **Smart Reminders**: Get notified at your scheduled reminder times
- **Overdue Task Alerts**: Receive alerts 30 minutes after tasks become overdue
- **Customizable Settings**: Control notification preferences in Settings

## How It Works

### 1. Reminder Notifications
When you create a task with a reminder:
- The app automatically suggests a reminder time based on priority:
  - **High Priority**: 30 minutes before the task
  - **Medium Priority**: 1 hour before the task
  - **Low Priority**: 2 hours before the task
- You can manually edit the suggested time
- When the reminder time arrives, you'll receive a push notification

### 2. Overdue Task Notifications
- The app monitors all pending tasks with due dates
- If a task becomes overdue, you'll receive a notification 30 minutes after the due time
- This helps ensure you don't forget important tasks

### 3. Notification Settings
Navigate to Settings (gear icon) to customize:
- **All Notifications**: Master switch to enable/disable all notifications
- **Task Reminders**: Toggle reminder notifications on/off
- **Overdue Task Alerts**: Toggle overdue notifications on/off
- **Sound & Vibration**: Control whether notifications play sound and vibrate

## Platform-Specific Behaviors

### Android
- **Chrome/Edge**: Full support for all notification features
- **Installation**: Install as PWA from browser menu or "Install App" button
- **Permissions**: Grant notification permission when prompted
- **Sound/Vibration**: Works when enabled in settings

### iOS (Safari)
- **Installation Required**: Add to Home Screen for notifications to work
- **How to Install**:
  1. Open TaskFlow in Safari
  2. Tap the Share button
  3. Tap "Add to Home Screen"
  4. Open the installed app
- **Permissions**: Grant notification permission in iOS Settings > TaskFlow
- **Limitations**: iOS may delay notifications when app is not in use

## Testing Notifications

1. **Create a Test Task**:
   - Click the + button
   - Set a due date/time 5 minutes from now
   - Enable Smart Reminder
   - The reminder will be auto-set to a few minutes before
   - Create the task

2. **Check Settings**:
   - Go to Settings tab
   - Ensure all notification toggles are enabled
   - Grant permission if prompted

3. **Wait for Notification**:
   - Keep the app open (or in background on mobile)
   - You should receive a notification at the reminder time

## Troubleshooting

### Notifications Not Working?
1. Check that notification permission is granted
2. Ensure notifications are enabled in Settings
3. On iOS, make sure the app is added to Home Screen
4. Check device notification settings (System Settings)
5. Make sure the browser/app has notification permissions

### iOS Specific Issues
- Notifications only work when installed as home screen app
- Check iOS Settings > Notifications > TaskFlow
- Background app refresh may need to be enabled

### Service Worker
The app uses Service Worker for reliable notifications:
- Automatically installed when you first visit the app
- Enables offline functionality
- Provides better notification delivery on mobile

## Privacy
- All notification data is stored locally on your device
- No notification data is sent to external servers
- You have full control over notification preferences
