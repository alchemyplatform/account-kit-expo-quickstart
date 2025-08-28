# Account Kit React Native Quick Start Template

## Demo 🎥

![alchemy-quickstart-rn-demo-resized](https://github.com/user-attachments/assets/dbdff87c-9a2e-41f4-aca7-40550eaacf6a)

## Using this template 📚

You can either clone this repo or quicky spin up a new project using `create-expo-app`.

```bash
# Create a new project directory
mkdir my-app && cd $_

# Create a new expo project using this template
npx create-expo-app@latest . --template https://github.com/alchemyplatform/account-kit-expo-quickstart
```

More details on using `create-expo-app` can be found [here](https://docs.expo.dev/more/create-expo/)

## Running the app 🚀

First of ensure you have your account kit `public api key`.

You can get your account kit api key by creating a new app in your [Alchemy Dashboard](https://dashboard.alchemy.com/apps). Check out the [Account Kit docs](https://docs.alchemy.https://accountkit.alchemy.com/react-native/signer/setup-guide) for more information.

Once you have your API key, add it to `app.json`, under the `extra` property with the following variables:

```
EXPO_PUBLIC_API_KEY="Your account kit public api key"
```

You can now run the app using `npx expo run:ios` or `npx expo run:android` to run the app on your device, based on your platform of choice.

## Important notices:

- Please stick to the following package versions to avoid build anomalies.  
 - Expo: 52.0.47
 - React Native: 0.76.9

- For now, you cannot use .env variables in the traditional way through a .env file, as the imported shims replace your file during runtime.

- Due to compatibility issues, you cannot use the react-native-dotenv library to access environment variables in an Expo project, as its Babel plugin aggressively inlines all environment variables, overwriting critical Expo Router configurations and causing the app to display the "Welcome to Expo" screen instead of the intended routes

## What's next? 🤔

Learn how to use account kit to send user operations, perform gas sponsorship and more by checking out [our documentation](https://accountkit.alchemy.com/react-native/using-smart-accounts/send-user-operations).
