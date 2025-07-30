import { RNAlchemySigner } from "@account-kit/react-native-signer";
import Constants from "expo-constants";

export const signer = RNAlchemySigner({
	client: { connection: { apiKey: Constants.expoConfig?.extra?.EXPO_PUBLIC_ALCHEMY_API_KEY ?? "" } },
	// optional param to override session settings
	sessionConfig: {
		// sets the expiration to 60 minutes
		expirationTimeMs: 1000 * 60 * 60,
	},
});
