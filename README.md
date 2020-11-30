# brave-alert-app [![Build Status](https://travis-ci.com/bravetechnologycoop/brave-alert-app.svg?branch=main)](https://travis-ci.com/bravetechnologycoop/brave-alert-app)

## How to run locally on an Android emulator

1. Install your Android development environment by following the [React Native CLI Quickstart instructions](https://reactnative.dev/docs/environment-setup)

1. In the project root directory, install/update dependencies:

   ```
   npm install
   ```

1. Open your Android emulator

   1. Open Android Studio
   1. Click "Configure" --> "AVD Manager"
   1. Push the Play arrow in the "Actions" column of the emulator you want to use

1. Run it

   ```
   npm run android
   ```

## How to run locally on an iOS simulator

*** Note *** This will only work on a Mac.

1. Install your iOS development environment by following the [React Native CLI Quickstart instructions](https://reactnative.dev/docs/environment-setup)

1. In the project root directory, install/update dependencies:

   ```
   npm install
   ```

1. Run it

   ```
   npm run ios
   ```

## How to run the tests

1. ```
   npm test
   ```

## How to run the linter

1. ```
   npm run lint
   ```

## How to run Storybook

1. If you are on a Mac, set `STORYBOOK_HOST` to your local IP address in `.env`. For example

   ```
   STORYBOOK_HOST=192.168.0.33
   ```

1. To open Storybook in your browser

   - If you're on a Mac, run

      ```
      STORYBOOK_HOST=<your local IP address> npm run storybook
      ```

   - Otherwise, run
   
      ```
      npm run storybook
      ```

   Note that the components will not appear until after the device has connected.

1. Open the app, run

   ```
   npm run android
   ```

   OR 

   ```
   npm run ios
   ```

1. Open the developer menu by shaking the device or by pressing Command-M on a Mac.

1. Click "Toggle Storybook".

1. Wait for the components to appear in the browser.