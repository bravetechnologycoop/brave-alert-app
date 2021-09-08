# brave-alert-app [![Build Status](https://travis-ci.com/bravetechnologycoop/brave-alert-app.svg?branch=main)](https://travis-ci.com/bravetechnologycoop/brave-alert-app)

## How to deploy a new version

1. Update the `version` field in `package.json` (note that it must be semantically greater than all previous versions), commit, and push

1. Go to https://bitrise.io

1. If you are deploying to **production**, click on the `brave-alert-app` App

   If you are deploying to **staging**, click on the `brave-alert-app-brave1` App

1. Click "Start/Schedule a Build"

1. [Optional] Change the branch that you want to deploy (by default, the `production` branch is used for **production** and the `main` branch is used for **staging**)

1. If you are deploying to **iOS**, select the Workflow "deploy-ios"

   If you are deploying to **Android**, select the Workflow "deploy-android"

   and click "Start Build"

1. Once the "deploy-android" build is complete:

   1. Go to https://play.google.com/console/u/0/developers

   1. TODO: Add instructions on how to have this release reviewed

1. Once the "deploy-ios" build is complete:

   1. Go to https://appstoreconnect.apple.com/apps

   1. If you are deploying to **production**, select the "Alert App" App

      If you are deploying to **staging**, select the "B1 Brave Alert" App

   1. Click "Test Flight"

   1. Expand the newest version

   1. Click on the "Manage" link in the Status "Missing Compliance Manage"

      1. This app uses HTTPS, so answer "Yes" to "Does your app use encryption?"

      1. Answer "No" for all subsequent questions

         - "Does your app qualify for any of the exemptions provided in Category 5, Part 2 of the U.S. Export Administration Regulations?"

         - "Does your app implement any encryption algorithms that are proprietary or not accepted as standards by international standard bodies (IEEE, IETF, ITU, etc.)?"

         - "Does your app implement any standard encryption algorithms instead of, or in addition to, using or accessing the encryption within Apple’s operating system?"

      1. Click "Start Internal Testing"

   1. TODO: Add instructions on how to have this release reviewed

## How to run locally on an Android emulator

1. Install your Android development environment by following the [React Native CLI Quickstart instructions](https://reactnative.dev/docs/environment-setup)

1. Add the environment variable FONTAWESOME_NPM_AUTH_TOKEN.
   One way to do this is to include the following in your `.zshrc` file and restarting your terminal.

   ```
   export FONTAWESOME_NPM_AUTH_TOKEN=<value from 1Password>
   ```

   On Windows machines the following command works for the duration of the terminal session:

   ```
   $env:FONTAWESOME_NPM_AUTH_TOKEN = '<value from 1Password>'
   ```

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

**_ Note _** This will only work on a Mac.

1. Install your iOS development environment by following the [React Native CLI Quickstart instructions](https://reactnative.dev/docs/environment-setup)

1. Add the environment variable FONTAWESOME_NPM_AUTH_TOKEN.
   One way to do this is to include the following in your `.zshrc` file and restarting your terminal.

   ```
   export FONTAWESOME_NPM_AUTH_TOKEN=<value from 1Password>
   ```

1. In the project root directory, install/update dependencies:

   ```
   npm install
   ```

1. Run it

   ```
   npm run ios
   ```

## How to run on a real device

1. Follow the instructions on https://reactnative.dev/docs/running-on-device
   for your OS and the target device. Note: you need a Mac in order to run on
   an iOS device.

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

# How to add or change an encrypted Travis environment variable

Reference: https://docs.travis-ci.com/user/environment-variables/#encrypting-environment-variables

1. Download the Travis CLI `gem install travis`

1. cd to anywhere in this repo

1. temporarily create a personal access token on GitHub https://github.com/settings/tokens with the following permissions:

   - `repo`
   - `read:packages`
   - `read:org`
   - `read:public_key`
   - `read:repo_hook`
   - `user`
   - `read:discussion`
   - `read:enterprise`

1. login using `travis login --pro --github-token <token from github>`

1. For a given `VAR_NAME` that you want to have value `secret_value`, run
   `travis encrypt --pro VAR_NAME=secret_value`
   which will ask for your GitHub username and password and then
   output your encrypted variable

1. Copy the encrypted variable into `.travis.yml`

1. Delete your personal access token from GitHub

# Repository organization

- `android/` - Native code for Android. I don't think that we will ever need to edit this directly.
- `ios/` - Native code for iOS. I don't think that we will never need to edit this directly.
- `node_modules/` - Dependency code generated by NPM. Do not edit this directly.
- `src/`
  - `components/` - UI components and their stories.
  - `hooks/` - React Hooks.
  - `mocks/` - React Native module mocks used for testing.
  - `navigation/` - React Navigation configuration.
  - `redux/` - React-Redux configuration. This controls the app's state by keeping it in the store
    and using reducers for state changes.
  - `resources/` - Static app assets.
    - `images/` - Image files used in the app.
    - `colors.js` - Module for accessing the colours that we use across the app.
    - `images.js` - Module for accessing the images.
  - `screens/` - App screens that are made up of components and are navigated between using
    React Navigation.
  - `services/` - The service layer of the application, where processing gets done.
    - `errors/` - Errors that can come up while using the services.
  - `storybook/` - Code to make the Storybook UI interface work. `index.js` sometimes needs
    tweaking, but the rest of these files will probably never been edited.
  - `test` - Unit tests. Structure within this folder should match
    the rest of the file structure.
- `.env.example` - An example `.env` file that can be copied and modified to work in
  the different environments.
- `.eslintignore` - Used so that ESLint doesn't look in the `/storybook` directory.
- `.eslintrc.json` - ESLint configuration.
- `.gitignore` - Files that shouldn't be checked into git.
- `.nvmrc` - Specifies the exact version of Node to be used on Travis.
- `.travis.yml` - Travis CI configuration.
- `app.json` - I'm not sure.
- `babel.config.js` - I'm not sure.
- `bitrise.yml` - Configuration for our BitRise deployment pipelines.
- `CHANGELOG.md` - The changelog.
- `index.js` - Entrypoint into the app.
- `LICENSE` - Our open source license.
- `metro.config.js` - Metro JS bundler configuration.
- `package.json` - NPM package definition.
- `package-lock.json` - NPM package description. This is auto-generated and should not be
  edited directly.
- `README.md` - The README.

# How to add a new iOS App

1. Create a new Bundle ID

   1. Go to https://developer.apple.com/account/resources/identifiers/list

   1. Click on the "+" button beside "Identifiers"

   1. Select "App IDs" and click "Continue"

   1. Select "App" and click "Continue"

   1. In "Description" provide a short description. In "Bundle ID" provide your new bundle ID (for example `coop.brave.example.bundleid`). Under "Capabilities" select "App Groups" and "Push Notifications". Click "Continue"

   1. Review the information and click "Register"

1. Create a new Bundle ID for the OneSignalNotificationService

   1. Go to https://developer.apple.com/account/resources/identifiers/list

   1. Click on the "+" button beside "Identifiers"

   1. Select "App IDs" and click "Continue"

   1. Select "App" and click "Continue"

   1. In "Description" provide a short description. In "Bundle ID" provide the same Bundle ID from the previous step with `.OneSignalNotificationServiceExtension` appended to it (for example `coop.brave.example.bundleid.OneSignalNotificationServiceExtension`). Under "Capabilities" select "App Groups". Click "Continue"

   1. Review the information and click "Register"

1. Create a new App

   1. Go to https://appstoreconnect.apple.com/apps

   1. Click on the "+" button beside "Apps" and click "New App"

   1. Under "Platforms", select "iOS"

   1. Under "Name", provide a name for the app

   1. Under "Primary language", select a primary language for the app

   1. Under "Bundle ID", select the Bundle ID that you created above

   1. Under "SKU", provide the same value as your Bundle ID

   1. Under "User Access", select "Full Access"

   1. Click "Create"

1. Create a provisioning profile

   1. Go to https://developer.apple.com/account/resources/profiles/list

   1. Click on the "+" button beside "Profiles"

   1. Select "App Store" and click "Continue"

   1. Select the app's Bundle ID from the dropdown list (for example: `coop.brave.example.bundleid`) and click "Continue"

   1. Select the iOS Distribution certificate that you plan to use for the app

   1. Give the profile a name and click "Generate"

   1. Download the profile by clicking "Download"

1. Create a provisioning profile for the OneSignalNotificationService

   1. Go to https://developer.apple.com/account/resources/profiles/list

   1. Click on the "+" button beside "Profiles"

   1. Select "App Store" and click "Continue"

   1. Select the OneSignalNotificationService's Bundle ID from the dropdown list (for example: `coop.brave.example.bundleid.OneSignalNotificationService`) and click "Continue"

   1. Select the iOS Distribution certificate that you plan to use for the app (should be the same as the previous step)

   1. Give the profile a name and click "Generate"

# How to configure push notifications

1. Create a Push Notification Certificate for iOS

   1. For security reasons, change your Apple ID password

   1. Use the OneSignal Push Notifications Certificate Wizard: https://onesignal.com/provisionator to add your Push Notification Certificate and generate a .p12 certificate file (and password)

   1. Save the resulting .p12 file and its password in 1password --> "Brave Alert App" vault

   1. For security reasons, change your Apple ID password again and sign out of all other devices

   1. Go to https://developer.apple.com/account/resources/profiles/list and you will see that your two provisioning profiles have the expiration "Invalid". To validate them, they just needs to be re-saved by doing the following for each of the two provisioning profiles

      1. Click on the profile

      1. Click "Edit"

      1. Click "Save"

1. Set up a Firebase project using these instructions: https://documentation.onesignal.com/docs/generate-a-google-server-api-key

1. Create a new project in OneSignal (https://app.onesignal.com/)

   1. Pick a name for the project, choose to set up the iOS platform, click "Next"

   1. Upload the .p12 certificate generated in the first step to OneSignal as described here: https://documentation.onesignal.com/docs/generate-an-ios-push-certificate#step-3-upload-your-push-certificate-to-onesignal , click "Save & Continue"

   1. Choose "React Native / Expo" as your target SDK, click "Save & Continue"

   1. Click "Done"

   1. Select "Google Android"

   1. Add the Firebase Server Key and Sender ID from Firebase following these instructions: https://documentation.onesignal.com/docs/generate-a-google-server-api-key#step-2-getting-your-firebase-cloud-messaging-token-and-sender-id , click "Save & Continue"

   1. Choose "React Native / Expo" as your target SDK, click "Save & Continue"

   1. Click "Done"

# How to add a new App in BitRise

1. Go to https://app.bitrise.io/apps/add

1. Select an owner

   1. Under "Choose Account", select "Brave Technology Coop"

   1. Under "Set Privacy of the App", select "Private"

   1. Click "Next"

1. Choose a repo

   1. Click on "Other/Manual"

   1. Under "Git repository (clone) URL", put "git@github.com:bravetechnologycoop/brave-alert-app.git"

   1. Click "Next"

1. Setup repository access

   1. Click "Add own SSH"

   1. Copy the RSA SSH private key for GitHub from 1Password --> Brave Alert App --> "Alert App GitHub Private SSH Deploy Key (for BitRise)" and paste into the textbox

   1. Click "All done"

1. Choose branch

   1. Select the default branch for the deployments. Note that this branch **must** have a `bitrise.yml` file in its root

   1. Click "Next"

1. Wait for the project scanner to finish

   1. It should recognize it as a React Native project

   1. The "Specify module" textbox should be autofilled with "app"

   1. Click "Next"

   1. In the "Specify Variant" textbox, put "all"

   1. Click "Next"

   1. The "Project or Workspace path" should automatically select "ios/BraveAlertApp.xcworkspace"

   1. The "Scheme name" should automatically select "BraveAlertApp"

   1. For "Select ipa export method", choose "app-store"

   1. If everything looks good, click "Confirm"

1. App icon

   1. Click "Skip for Now"

1. Webhook setup

   1. Click "Skip the Webhook registration"

1. It will automatically kick off a build for you. This build will fail because the Secrets haven't been set yet

1. Navigate to your newly created BitRise App

1. For some reason, it didn't use the `bitrise.yml` in my project, so to fix that

   1. Navigate to Workflow --> bitrise.yml

   1. Click "Store in app repository"

   1. Click "Update settings"

   1. Click "Continue"

1. Add Secrets

   1. Navigate to your app --> Workflow --> Secrets. Add the following values

      - `FONTAWESOME_NPM_AUTH_TOKEN`: get value from 1Password --> Shared --> FontAwesome --> Pro NPM Package Token

      - `SENTRY_AUTH_TOKEN`: get value from https://sentry.io/settings/account/api/auth-tokens/

      - `SENTRY_DSN`: get value from https://sentry.io/settings/brave-technology-coop/projects/brave-alert-app/keys/

      - `SENTRY_ENV`: the Sentry environment that you want to use for all errors sent to Sentry from apps built through these BitRise workflows. For example "production"

      - `TEAM`: get value from https://developer.apple.com/account/#/membership

      - `CODE_SIGNING_IDENTITY`: value should be `iPhone Distribution: Brave Technology Coop ($TEAM)`

      - `ALERT_APP_PROVISIONING_PROFILE_SPECIFIER`: get the name of the environment's Alert App provisioning profile from https://developer.apple.com/account/resources/profiles/list

      - `ONESIGNAL_PROVISIONING_PROFILE_SPECIFIER`: get the name of the environment's OneSignal Notification Service provisioning profile from https://developer.apple.com/account/resources/profiles/list

      - `CF_BUNDLE_IDENTIFIER`: get value from https://appstoreconnect.apple.com/apps --> your app --> App Store --> App Information --> General Information --> Bundle ID

      - `CF_ONESIGNAL_BUNDLE_IDENTIFIER`: get value from 'IDENTIFIER' column on https://developer.apple.com/account/resources/identifiers/list for the environment's OneSignal Notification Service

      - `CF_BUNDLE_DISPLAY_NAME`: seems like this can be anything. I'm not sure what it's used for

      - `SENSOR_BASE_URL`: the base URL for API calls to the Sensor server (do not include `https://`) and with no slash at the end, for example `brave-sensor.com`

      - `BUTTONS_BASE_URL`: the base URL for API calls to the Buttons server (do not include `https://`) and with no slash at the end, for example `brave-buttons.com`

      - `BUNDLE_ID`: get value from https://play.google.com/console/u/0/developers . Look at the string immediately below the name of your Android app in the list of apps, for example `coop.brave.example.bundleid`

      - `CONTACT_FORM_URI`: get by following the instructions in `.env.test`

      - `CONTACT_FORM_NAME_QUESTION_ID`: get by following the instructions in `.env.test`

      - `CONTACT_FORM_ORG_QUESTION_ID`: get by following the instructions in `.env.test`

      - `CONTACT_FORM_MESSAGE_QUESTION_ID`: get by following the instructions in `.env.test`

      - `CONTACT_FORM_CONTACT_METHOD_QUESTION_ID`: get by following the instructions in `.env.test`

      - `ONESIGNAL_APP_ID`: get value from https://app.onesignal.com/ --> Settings --> Keys & IDs --> OneSignal App ID

1. Add Code Signing

   1. Navigate to your app --> Workflow --> Code Signing

   1. Upload your two iOS provisioning profiles (one for the app and the other for the OneSignalNotificationService) (get them from https://developer.apple.com/account/resources/profiles/list). You will see an error message saying that the profile doesn't match the certificate

   1. Upload your iOS Code Signing Certificate

      1. Download your certificate from https://developer.apple.com/account/resources/certificates/list . Note that this must be the same certificate used when the iOS provisioning profile was created

      1. Follow instructions at https://calvium.com/how-to-make-a-p12-file/ starting at STEP 3 to create the corresponding .p12 file. Please put a password!

      1. Upload the file and add its password. You should see the provisioning profile error message disappear

   1. Upload Android Keystore File

      1. Create an Android Keystore File following the instructions here: https://developer.android.com/studio/publish/app-signing#generate-key

      1. Upload the genereated keystore file

      1. Enter the keystore password, the keystore alias, and the key password

      1. Click "Save metadata"

      1. Click "OK"

   1. Upload Service Account JSON Key

      1. Under "File Storage ID", type "SERVICE_ACCOUNT_JSON_KEY"

      1. Upload the Google Service ID. Get this file from 1Password --> Brave Alert App --> Android service account key (Brave Alert App)

1. Update the default Stack

   1. Navigate to your app --> Workflow --> Stack

   1. Under "Default Stack", select "Xcode 12.3.x, on macOS 10.15.6 (Catalina)"

   1. Click "Save"

1. Add your Apple Service Connection

   1. Navigate to your app --> Team

   1. In the "Apple Service connection" section, under "API key authentication (recommended)", select "Brave"

1. Generate your first Android APK

   1. Navigate to your app

   1. Click on "Start/Schedule a Build"

   1. Under "Workflow", select "deploy-android"

   1. Click "Start Build"

   1. Wait for it to successfully finish the "Deploy to Bitrise.io - Apps, Logs, Artifacts" step (Note that it will have failed on the "Google Play Deploy" step. This is normal and expected)

# How to add a new Android App

1. Create new App

   1. Go to https://play.google.com/console/u/0/developers/

   1. Click on "Create app"

   1. Under "App name" provide a name for the app

   1. Under "Default language", select a default language for the app

   1. Under "App or game", select "App"

   1. Under "Free or paid", select "Free"

   1. Under "Declarations", check the boxes

   1. Click "Create app"

1. From the Dashboard, under "Start testing now",

   1. Click "View tasks"

   1. Click "Select testers"

   1. Select your testers

   1. Click "Save changes"

   1. Click "Create a new release"

   1. Click "Manage app signing"

   1. Select "Opt out of Play App Signing"

   1. Click "Update"

   1. Click "Opt out"

   1. Download your first APK from BitRise

      1. Go to https://app.bitrise.io/dashboard

      1. Open the first build of the "deploy-android" workflow that successfully completed the "Deploy to Bitrise.io - Apps, Logs, Artifacts" step (Note that it will have failed on the "Google Play Deploy" step. This is normal and expected)

      1. Click on "Apps & Artifacts"

      1. Download the "app-release-bitrise-signed.apk" file

   1. Under "App bundles and APKs", upload the APK that you just downloaded

   1. Under "Release name", give your release a name

   1. Under "Release notes", give your release some notes

   1. Click "Save"

   1. Click "Review Release"

   1. Click "Start rollout to Internal testing"

   1. Click "Rollout"

1. From the Dashboard, under "Set up your app"

   1. Click "View Tasks"

   1. Complete all the tasks
