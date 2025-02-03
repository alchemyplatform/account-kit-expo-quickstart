# Account Kit React Native Quick Start Template

## Demo 🎥

![alchemy-quickstart-rn-demo-resized](https://github.com/user-attachments/assets/dbdff87c-9a2e-41f4-aca7-40550eaacf6a)

## Using this template 📚

You can either clone this repo or quicky spin up a new project using `create-expo-app`.

```bash
npx create-expo-app@latest . --template https://github.com/iykazrji/account-kit-expo-quickstart
```

More details on using `create-expo-app` can be found [here](https://docs.expo.dev/more/create-expo/)

## Running the app 🚀

First of ensure you have your account kit `public api key`.

You can get your account kit api key by creating a new app in your [Alchemy Dashboard](https://dashboard.alchemy.com/apps). Check out the [Account Kit docs](https://docs.alchemy.https://accountkit.alchemy.com/react-native/signer/setup-guide) for more information.

Once you have your api key, add a `.env` file in the root of your project and add the following variables:

```
EXPO_PUBLIC_API_KEY="Your account kit public api key"
```

You can now run the app using `npx expo run:ios` or `npx expo run:android` to run the app on your device, based on your platform of choice.

## What's next? 🤔

Learn how to use account kit to send user operations, perform gas sponsorship and more by checking out [our documentation](https://accountkit.alchemy.com/react-native/using-smart-accounts/send-user-operations).
