# 🏋️‍♂️ Ascend - Track Your Climb

Ascend is a premium, high-fidelity fitness and workout tracker built with **React Native**, **Expo Router**, and **TypeScript**. It features a modern dark-themed user interface designed to help you track your weekly volume, streaks, and personal records with style.

<p align="center">
  <img src="./Ascend%20Screens/Home%20Screen.png" width="22%" alt="Home Dashboard" />
  <img src="./Ascend%20Screens/LogWorkoutScreen.png" width="22%" alt="Log Workout Screen" />
  <img src="./Ascend%20Screens/History%20Screen.png" width="22%" alt="History Screen" />
  <img src="./Ascend%20Screens/Exercise%20Details%20Screen.png" width="22%" alt="Exercise Details Screen" />
</p>

---

## ✨ Features

- **🏆 High-Fidelity Dashboard**: Monitor your weekly volume, consistency, active streaks, and monthly PRs at a glance.
- **📝 Interactive Workout Logger**: Dynamic form logging that automatically calculates **TOTAL REPS** and **ESTIMATED VOLUME** live as you update reps or add sets.
- **📊 Performance Analytics & Charts**: Custom-styled visual volume charts representing 30-day progression trends, detailed historical logs grouped by month, and progression insights.
- **🎯 Dynamic Routing (Expo Router)**: Fluid navigation between tabs (Dashboard, Log, History, Playground) with hidden stacked detail views for deep-dives.
- **🔒 Type-Safe Architecture**: Written completely in TypeScript with decoupled service layers to handle clean, predictable state transactions.

---

## 🛠️ Technology Stack

- **Framework**: [Expo SDK 54](https://expo.dev/)
- **Core Library**: [React Native](https://reactnative.dev/) (React 19)
- **Routing**: [Expo Router](https://docs.expo.dev/router/introduction/) (File-based Routing)
- **Icons**: `@expo/vector-icons` (Ionicons)
- **Language**: TypeScript

---

## 🚀 Getting Started

To run Ascend locally on your machine or mobile device:

### 1. Prerequisites
Make sure you have Node.js installed on your computer.

### 2. Installation
Clone the repository and install the project dependencies:
```bash
# Navigate to the project directory
cd Ascend

# Install packages with peer dependencies bypass
npm install --legacy-peer-deps
```

### 3. Run the Development Server
Start the Expo Metro Bundler:
```bash
npm start
```

- Press **`a`** to open in an Android Emulator.
- Press **`w`** to open in a web browser.
- Scan the **QR Code** displayed in your terminal using the **Expo Go** app on iOS/Android to run it directly on your physical mobile device!

---

## 📂 File Structure

```text
Ascend/
├── Ascend Screens/          # Reference UI screenshots
├── services/                # Decoupled workout services
│   └── LogExerciseService.ts
├── types/                   # Type-safe interfaces
│   └── LogExerciseServiceTypes.ts
└── src/
    └── app/                 # Expo Router Root
        ├── _layout.tsx      # Root Stack Navigator
        ├── index.tsx        # Automatic tab redirect
        └── (tabs)/          # Route-grouped Bottom Tab Navigation
            ├── _layout.tsx  # Tabs styling and setup
            ├── home.tsx     # Dashboard
            ├── log.tsx      # Workout logging
            ├── history.tsx  # History timeline & custom charts
            ├── exerciseDetails.tsx # Detail analytics screen (hidden href)
            └── testPlayground.tsx  # Service testing ground
```

---

## 📜 License

This project is licensed under the MIT License.
