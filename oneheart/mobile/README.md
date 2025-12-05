OneHeart Mobile — Standard Setup (Expo)

Goal: Provide a cross-platform mobile scaffold that runs on Android and iOS (development via Expo). iOS production builds require macOS or EAS (Expo Application Services) cloud builds.

Quick start (developer machine / Codespaces):

1. Install prerequisites locally (if not using Codespaces):
   - Node.js (LTS)
   - Yarn or npm
   - `expo` CLI: `npm install -g expo-cli` (optional; you can use `npx expo`)

2. Run locally:

```bash
cd oneheart/mobile
npm install
npx expo start
# or
npm run android
npm run ios  # ios requires macOS or use EAS build
```

3. Android emulator:
   - Use Android Studio AVD and open Expo via `adb` or Expo Dev Tools.

4. iOS testing:
   - Use a physical device with Expo Go app, or
   - Use EAS Build to produce a TestFlight IPA (requires an Apple account and EAS setup), or
   - Use Xcode on macOS to run the native project.

EAS (recommended for iOS CI builds):
- Configure EAS in project and use `eas build -p ios` to build in the cloud.

Notes:
- This repo uses Expo for rapid cross-platform development and to avoid early native config complexity.
- When you need deep native modules, eject to `expo prebuild` / bare workflow or adopt React Native CLI.

Next steps I can do for you if you want:
- Initialize an Expo app (run `npx create-expo-app`) and commit the full scaffold.
- Add CI pipeline for EAS builds and Android emulator tests.
- Add example screens wired to the OneHeart Quest API.
