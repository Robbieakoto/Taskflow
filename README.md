# TaskFlow - Smart Daily Task Planner 📋

A modern, offline-first Progressive Web App for managing your daily tasks with smart reminders and beautiful UI.

## ✨ Key Features

### 📱 **Progressive Web App (PWA)**
- ✅ Install on mobile (Android/iOS) and desktop
- ✅ Works completely offline
- ✅ App-like experience with no browser UI
- ✅ Add to home screen functionality
- ✅ Auto-updates in the background

### 🔔 **Smart Notifications**
- ⏰ Customizable task reminders
- ⚠️ Overdue task alerts (30 min after due time)
- 🔕 Configurable notification settings
- 📳 Sound and vibration support
- 🌐 Works on Android and iOS

### 📊 **Task Management**
- ✏️ Create tasks with title, description, and due dates
- 🎯 Set priority levels (Low, Medium, High)
- 🏷️ Organize by categories (Work, Personal, Health, etc.)
- ⏰ Smart reminder suggestions based on priority
- ✅ Mark tasks as complete or postpone
- 🗑️ Delete tasks easily

### 📈 **Analytics & Insights**
- 📊 Weekly progress chart
- 📈 Completion rate tracking
- 🎯 Task statistics
- 📅 Task history view
- 🎉 Motivational feedback

### 💾 **Offline Support**
- 💿 All data stored locally
- 🔄 No internet required after installation
- ⚡ Instant loading
- 🔒 Your data stays on your device
- 🌐 Works everywhere, even on planes

---

## 🚀 Quick Start

### Development
```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Installation as PWA

#### Android
1. Open in Chrome/Edge
2. Tap "Install App" button or browser menu
3. Confirm installation
4. Find on home screen

#### iOS
1. Open in Safari (required)
2. Tap Share → Add to Home Screen
3. Name the app
4. Tap Add
5. Open from home screen

📖 **See [INSTALL.md](./INSTALL.md) for detailed installation instructions**

---

## 🎯 How to Use

### Creating a Task
1. Tap the **+** button
2. Enter task title and optional description
3. Set due date and time
4. Choose priority (High/Medium/Low)
5. Select category
6. Enable **Smart Reminder** for automatic reminder time
7. Edit reminder time if needed
8. Tap **Create Task**

### Managing Tasks
- **Complete**: Tap the circle icon
- **Postpone**: Tap the clock icon
- **Delete**: Tap the trash icon
- Tasks are grouped into: Overdue, Today, Upcoming, Backlog

### Viewing Progress
- **Analytics**: Tap pie chart icon for stats
- **History**: Tap calendar icon to see completed tasks
- **Settings**: Tap gear icon to configure notifications

---

## 🏗️ Technical Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for blazing fast builds
- **Framer Motion** for smooth animations
- **React Router** for navigation
- **date-fns** for date handling
- **Lucide React** for beautiful icons

### PWA Configuration
- **vite-plugin-pwa** with Workbox
- **Service Worker** for offline support
- **Web App Manifest** for installation
- **Local Storage** for data persistence
- **Notification API** for push notifications

### Styling
- **CSS Variables** for theming
- **Glassmorphism** design pattern
- **Dark Mode** native support
- **Mobile-first** responsive design

---

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── BottomNav.tsx   # Bottom navigation bar
│   ├── TaskCard.tsx     # Individual task display
│   ├── CreateTaskModal.tsx  # Task creation modal
│   ├── InstallPWA.tsx   # PWA install prompt
│   └── Layout.tsx       # App layout wrapper
├── pages/              # Route pages
│   ├── Home.tsx        # Main dashboard
│   ├── Stats.tsx       # Analytics page
│   ├── History.tsx     # Completed tasks
│   └── Settings.tsx    # App settings
├── hooks/              # Custom React hooks
│   ├── useTasks.ts     # Task CRUD operations
│   └── useNotificationSettings.ts  # Notification config
├── services/           # Business logic
│   └── notificationService.ts  # Notification handling
├── types/              # TypeScript types
│   └── index.ts        # Shared types
├── App.tsx             # Root component
├── main.tsx            # Entry point
└── index.css           # Global styles

public/
├── icon.svg            # App icon (SVG)
├── pwa-192x192.png     # PWA icon (small)
├── pwa-512x512.png     # PWA icon (large)
└── apple-touch-icon.png # iOS icon
```

---

## 💾 Data Storage

All data is stored **locally on your device**:

- **Tasks**: localStorage (`taskflow_tasks`)
- **Notification Settings**: localStorage (`taskflow_notification_settings`)
- **No external servers**: Complete privacy
- **No tracking**: Your data stays with you
- **Export/Import**: Future feature planned

---

## 🔔 Notification System

### How It Works
- Checks for reminders every 10 seconds
- Sends notification at scheduled time
- Sends overdue alert 30 min after due time
- Uses Service Worker for reliability
- Works even when app is in background (on Android)

### Settings
Access via Settings page:
- ✅ Enable/disable all notifications
- ✅ Toggle task reminders
- ✅ Toggle overdue alerts
- ✅ Control sound & vibration

📖 **See [NOTIFICATIONS.md](./NOTIFICATIONS.md) for detailed notification guide**

---

## 🌐 Browser Support

### Full Support
- ✅ Chrome (Android, Desktop)
- ✅ Edge (Android, Desktop)
- ✅ Safari (iOS, macOS)
- ✅ Brave (Android, Desktop)

### Limited Support
- ⚠️ Firefox (PWA features limited)
- ❌ Internet Explorer (not supported)

---

## 🛠️ Development

### Prerequisites
- Node.js 18+ and npm
- Modern browser

### Environment
No environment variables needed - works out of the box!

### Building
```bash
# Development (with hot reload)
npm run dev

# Production build
npm run build

# Preview production
npm run preview

# Type check
npx tsc --noEmit
```

---

## 📱 PWA Features

### Offline First
- Service Worker caches all assets
- App works without internet
- Data persists locally
- Fast loading times

### Installable
- Add to home screen on mobile
- Desktop installation support
- Native app-like experience
- No app store required

### Auto-updates
- Service Worker checks for updates
- Installs in background
- Activate on next launch
- No manual updates needed

---

## 🎨 Design Philosophy

- **Mobile-first**: Optimized for phone usage
- **Dark Mode**: Easy on the eyes
- **Glassmorphism**: Modern, premium feel
- **Animations**: Smooth, delightful interactions
- **Accessibility**: Clear hierarchy and contrast

---

## 🔒 Privacy & Security

- ✅ No data collection
- ✅ No analytics
- ✅ No external requests
- ✅ Everything stored locally
- ✅ Open source (you can verify)

---

## 🚧 Roadmap

Future features planned:
- [ ] Task categories customization
- [ ] Recurring tasks
- [ ] Task templates
- [ ] Data export/import
- [ ] Multiple themes
- [ ] Widget support (Android)
- [ ] Siri shortcuts (iOS)
- [ ] Desktop notifications
- [ ] Task sharing

---

## 📄 License

MIT License - feel free to use and modify!

---

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create feature branch
3. Make your changes
4. Test thoroughly
4. Submit pull request

---

## 📞 Support

Having issues? Check:
- [INSTALL.md](./INSTALL.md) - Installation guide
- [NOTIFICATIONS.md](./NOTIFICATIONS.md) - Notification setup

---

**Built with ❤️ using React, TypeScript, and PWA technologies**

*Stay organized. Stay productive. TaskFlow.*
