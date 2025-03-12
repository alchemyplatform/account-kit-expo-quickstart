import { Redirect } from "expo-router";

export default function OAuthCallback() {
	// Immediately redirect to the home screen
	return <Redirect href="/" />;
}
