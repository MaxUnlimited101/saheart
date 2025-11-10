import React, { useEffect, useState } from "react";
import {
	ScrollView,
	StyleSheet,
	View,
	ActivityIndicator,
	ImageBackground,
	Modal,
	Text,
	TouchableOpacity,
} from "react-native";
import HoroscopeForm from "./HoroscopeForm";
import HoroscopeDisplay, { serverUrl } from "./HoroscopeDisplay";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HoroscopePicker from "./HoroscopePicker";
import sign_tr, { ui_tr } from "../utils/translations";
import {
	registerForPushNotifications,
	scheduleDailyHoroscopeNotification,
} from "../utils/notifications";

const App = () => {
	const [selectedSign, setSelectedSign] = useState("");
	const [selectedLang, setSelectedLang] = useState("eng");
	const [backgroundUrl, setBackgroundUrl] = useState("");
	const [loading] = useState(false);
	const [defaultSign, setDefaultSign] = useState(null);
	const [modalVisible, setModalVisible] = useState(false);

	const handleSaveDefaultSign = async () => {
		if (selectedSign) {
			await AsyncStorage.setItem("defaultSign", selectedSign);
			setDefaultSign(selectedSign);
			setModalVisible(false);
		}
	};

	useEffect(() => {
		async function loadDefaultSign() {
			// Check if exists
			const savedSign = await AsyncStorage.getItem("defaultSign");
			if (savedSign !== null) {
				// Key exists
				setSelectedSign(savedSign);
				setDefaultSign(savedSign);
			} else {
				// Key does not exist - show modal on first launch
				setDefaultSign(null);
				setModalVisible(true);
			}
		}
		async function setupNotifications() {
			const hasPermission = await registerForPushNotifications();
			if (hasPermission && defaultSign && selectedLang) {
				console.log("Scheduling notification...");
				await scheduleDailyHoroscopeNotification(selectedLang, sign_tr[selectedLang][defaultSign], 9, 0); // 9:00 AM
			}
		}

		loadDefaultSign();
		setupNotifications();
	}, [defaultSign, selectedLang]);

	if (loading) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator size="large" color="#0000ff" />
			</View>
		);
	}

	let disp = <></>;
	if (selectedSign && selectedLang) {
		disp = (
			<HoroscopeDisplay
				sign={selectedSign}
				lang={selectedLang}
				setBackgroundImageUrl={setBackgroundUrl}
			/>
		);
	}

	return (
		<ImageBackground
			source={{ uri: `${serverUrl}${backgroundUrl}` }}
			style={styles.backgroundImage}
		>
			<SafeAreaView style={styles.containerVisualStyle}>
				<ScrollView
					style={styles.containerVisualStyle}
					contentContainerStyle={styles.contentContainerStyle}
					persistentScrollbar={true} /*<--only for android*/
				>
					<Modal
						animationType="slide"
						transparent={true}
						visible={modalVisible}
						onRequestClose={() => setModalVisible(false)}
					>
						<View style={stylesForModal.modalOverlay}>
							<View style={stylesForModal.modalContent}>
								<Text style={stylesForModal.title}>
									{ui_tr[selectedLang].welcome_select_sign}
								</Text>
								<HoroscopePicker
									sign={selectedSign}
									setSign={setSelectedSign}
									lang={selectedLang}
									styles={stylesForHoroscopePicker}
								/>
								<TouchableOpacity
									style={stylesForModal.confirmButton}
									onPress={handleSaveDefaultSign}
									disabled={!selectedSign}
								>
									<Text
										style={stylesForModal.confirmButtonText}
									>
										{ui_tr[selectedLang].btn_confirm}
									</Text>
								</TouchableOpacity>
								{defaultSign !== null && (
									<TouchableOpacity
										style={stylesForModal.cancelButton}
										onPress={() => setModalVisible(false)}
									>
										<Text
											style={
												stylesForModal.cancelButtonText
											}
										>
											{ui_tr[selectedLang].btn_cancel ||
												"Cancel"}
										</Text>
									</TouchableOpacity>
								)}
							</View>
						</View>
					</Modal>
					<View style={styles.container}>
						<HoroscopeForm
							sign={selectedSign}
							lang={selectedLang}
							setLang={setSelectedLang}
							setSign={setSelectedSign}
							onChangeDefault={() => setModalVisible(true)}
						/>
					</View>
					<View>{disp}</View>
				</ScrollView>
			</SafeAreaView>
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 0,
		margin: 0,
	},
	contentContainerStyle: {
		justifyContent: "center",
		alignItems: "center",
	},
	containerVisualStyle: {
		flex: 1,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20,
		color: "#a83297", // Ensure text is visible on background
	},
	backgroundImage: {
		flex: 1,
		width: "100%",
		height: "100%",
		resizeMode: "cover",
		backgroundColor: "#0b1218",
	},
});

const stylesForHoroscopePicker = StyleSheet.create({
	label: {
		fontSize: 18,
		color: "#ffffff",
		textAlign: "center",
		margin: 10,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		padding: 10,
		borderRadius: 10,
	},
	picker: {
		height: 50,
		width: "100%",
		marginBottom: 20,
		backgroundColor: "#ffffff",
		color: "#000000",
	},
	pickerMobile: {
		backgroundColor: "#ffffff",
		color: "#000000",
		marginBottom: 20,
	},
});

const stylesForModal = StyleSheet.create({
	modalOverlay: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.7)",
	},
	modalContent: {
		backgroundColor: "#1a1a2e",
		borderRadius: 20,
		padding: 20,
		width: "85%",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	title: {
		fontSize: 22,
		fontWeight: "bold",
		marginBottom: 20,
		textAlign: "center",
		color: "#ffffff",
	},
	confirmButton: {
		backgroundColor: "#a83297",
		padding: 15,
		borderRadius: 10,
		marginTop: 10,
	},
	confirmButtonText: {
		color: "#ffffff",
		textAlign: "center",
		fontSize: 18,
		fontWeight: "600",
	},
	cancelButton: {
		backgroundColor: "transparent",
		borderWidth: 1,
		borderColor: "#a83297",
		padding: 15,
		borderRadius: 10,
		marginTop: 10,
	},
	cancelButtonText: {
		color: "#a83297",
		textAlign: "center",
		fontSize: 18,
		fontWeight: "600",
	},
});

export default App;
