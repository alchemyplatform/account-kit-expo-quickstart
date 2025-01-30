// Add global shims
import "node-libs-react-native/globals.js";
import "react-native-get-random-values";
import "react-native-reanimated";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Slot, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { AlchemyAuthSessionProvider } from "@/src/context/AlchemyAuthSessionProvider";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Platform, View } from "react-native";

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
	// Ensure that reloading on `/modal` keeps a back button present.
	initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	// Feel free to load and use whatever fonts of your choosing.
	const [loaded, error] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
		...FontAwesome.font,
	});

	// Expo Router uses Error Boundaries to catch errors in the navigation tree.
	useEffect(() => {
		if (error) throw error;
	}, [error]);

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return <RootLayoutNav />;
}

function RootLayoutNav() {
	return (
		<AlchemyAuthSessionProvider>
			<SafeAreaProvider>
				<Stack
					screenOptions={{
						headerShown: false,
					}}
				>
					<Stack.Screen
						name="otp-modal"
						options={{
							presentation:
								Platform.OS === "ios"
									? "formSheet"
									: "containedTransparentModal",
							animation:
								Platform.OS === "android"
									? "slide_from_bottom"
									: "default",
						}}
					/>
				</Stack>
			</SafeAreaProvider>
		</AlchemyAuthSessionProvider>
	);
}
