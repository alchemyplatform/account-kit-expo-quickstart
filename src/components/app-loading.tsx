import { ActivityIndicator, Modal, StyleSheet, View } from "react-native";
export const AppLoadingIndicator = () => {
	return (
		<Modal visible transparent>
			<View style={styles.loadingModal}>
				<ActivityIndicator size={"small"} color={"white"} />
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	loadingModal: {
		width: "100%",
		height: "100%",
		zIndex: 100_000,
		backgroundColor: "rgba(10, 10, 10, 0.5)",
		alignItems: "center",
		justifyContent: "center",
		flex: 1,
		position: "absolute",
	},
});
