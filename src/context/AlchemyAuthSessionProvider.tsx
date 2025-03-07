import { alchemy, sepolia } from "@account-kit/infra";
import { QueryClient } from "@tanstack/react-query";
import {
	AlchemyAccountProvider,
	createConfig,
} from "@account-kit/react-native";

const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

const queryClient = new QueryClient();

export const AlchemyAuthSessionProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const configParams = {
		chain: sepolia,
		transport: alchemy({
			apiKey: API_KEY!,
		}),
		signerConnection: {
			apiKey: API_KEY!,
		},
		sessionConfig: {
			expirationTimeMs: 1000 * 60 * 60 * 24, // <-- Adjust the session expiration time as needed (currently 24 hours)
		},
	};

	const config = createConfig(configParams);

	return (
		<AlchemyAccountProvider config={config} queryClient={queryClient}>
			{children}
		</AlchemyAccountProvider>
	);
};
