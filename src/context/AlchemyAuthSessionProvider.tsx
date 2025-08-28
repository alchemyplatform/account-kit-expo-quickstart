import { alchemy, sepolia } from "@account-kit/infra";
import { QueryClient } from "@tanstack/react-query";
import {
	AlchemyAccountProvider,
	createConfig,
} from "@account-kit/react-native";
import Constants from "expo-constants";

const queryClient = new QueryClient();

export const AlchemyAuthSessionProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const config = createConfig({
		chain: sepolia,
		transport: alchemy({
			apiKey: Constants.expoConfig?.extra?.EXPO_PUBLIC_ALCHEMY_API_KEY!,
		}),
		signerConnection: {
			apiKey: Constants.expoConfig?.extra?.EXPO_PUBLIC_ALCHEMY_API_KEY!,
		},
		sessionConfig: {
			expirationTimeMs: 1000 * 60 * 60 * 24, // <-- Adjust the session expiration time as needed (currently 24 hours)
		},
	});

	return (
		<AlchemyAccountProvider config={config} queryClient={queryClient}>
			{children}
		</AlchemyAccountProvider>
	);
};
