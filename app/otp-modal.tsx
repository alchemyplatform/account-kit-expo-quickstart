import { useCallback, useState } from "react";
import {
	TextInput,
	StyleSheet,
	View,
	Text,
	Pressable,
	Dimensions,
	Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Redirect, useRouter } from "expo-router";
import { useAuthenticate, useSignerStatus } from "@account-kit/react-native";

const windowHeight = Dimensions.get("window").height;

export default function ModalScreen() {
	const [otpCode, setOtpCode] = useState<string>("");
	const { authenticate } = useAuthenticate();
	const { isConnected } = useSignerStatus();
	const router = useRouter();

	const handleUserOtp = useCallback(() => {
		try {
			authenticate({
				otpCode,
				type: "otp",
			});

			router.replace("/");
		} catch (e) {
			Alert.alert("Error sending OTP Code. Check logs for more details.");

			console.log("Error seding OTP CODE: ", e);
		}
	}, [otpCode]);

	if (isConnected) {
		return <Redirect href={"/"} />;
	}

	return (
		<View style={styles.formContainer}>
			{/* Close Button */}
			<Pressable onPress={() => router.back()}>
				{({ pressed }) => (
					<View
						style={[
							styles.closeButtonWrapper,
							{ opacity: pressed ? 0.5 : 1 },
						]}
					>
						<MaterialIcons name="close" size={24} color={"red"} />
					</View>
				)}
			</Pressable>

			<Text
				style={[styles.titleText, { fontSize: 18, marginBottom: 5 }]}
			>{`Awesome! `}</Text>
			<Text
				style={styles.titleText}
			>{`We have sent a One-Time Password to your email address. Enter it below to \nsign-in!.`}</Text>
			<View style={styles.textInputContainer}>
				<TextInput
					style={styles.textInput}
					value={otpCode}
					onChangeText={(val) => setOtpCode(val.toLowerCase())}
					placeholder="123456"
				/>
				<Pressable onPress={handleUserOtp}>
					{({ pressed }) => (
						<View
							style={[
								styles.signInButton,
								{
									opacity: pressed ? 0.5 : 1,
									transform: [
										{
											scale: pressed ? 0.98 : 1,
										},
									],
								},
							]}
						>
							<Text style={[styles.signInText]}>Verify OTP</Text>
						</View>
					)}
				</Pressable>
			</View>
		</View>
	);
}
const styles = StyleSheet.create({
	formContainer: {
		backgroundColor: "white",
		flex: 1,
		height: windowHeight,
		paddingHorizontal: 20,
		paddingVertical: 30,
	},

	titleText: {
		fontFamily: "SpaceMono",
	},
	textInputContainer: {
		marginTop: 10,
		width: "100%",
	},

	closeButtonWrapper: {
		padding: 5,
		justifyContent: "center",
		alignItems: "center",
		borderWidth: 1,
		borderColor: "red",
		borderRadius: 10,
		width: 40,
		height: 40,
		marginBottom: 30,
	},

	textInput: {
		width: "100%",
		height: 40,
		borderColor: "rgba(0,0,0,0.095)",
		borderWidth: 1,
		paddingHorizontal: 10,
		backgroundColor: "rgba(0,0,0,0.025)",
		marginBottom: 10,
		borderRadius: 10,
	},

	signInButton: {
		width: "100%",
		padding: 15,
		borderRadius: 10,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "rgb(0, 0, 0)",
	},

	signInText: {
		color: "white",
		fontFamily: "SpaceMono",
	},
});
