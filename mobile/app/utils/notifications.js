import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";

// Configure notification behavior
Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: true,
		shouldSetBadge: false,
	}),
});

// Request notification permissions
export async function registerForPushNotifications() {
	if (Platform.OS === "android") {
		// we can assume android device
		await Notifications.setNotificationChannelAsync("saheart-horoscope", {
			name: "Saheart Horoscope",
			importance: Notifications.AndroidImportance.HIGH,
			vibrationPattern: [0, 250, 250, 250],
			lightColor: "#a83297",
		});
	}

	if (Device.isDevice || true) {
		// TEMPORARY: allow simulator for testing
		const { status: existingStatus } =
			await Notifications.getPermissionsAsync();
		let finalStatus = existingStatus;

		if (existingStatus !== "granted") {
			const { status } = await Notifications.requestPermissionsAsync();
			finalStatus = status;
		}

		if (finalStatus !== "granted") {
			alert("Failed to get push notification permissions!");
			return false;
		}
		return true;
	}
	return false;
}

// Schedule daily notification at specific time (e.g., 9:00 AM)
export async function scheduleDailyHoroscopeNotification(
	lang,
	zodiacSign,
	hour = 9,
	minute = 0
) {
	// Cancel existing notifications first
	await Notifications.cancelAllScheduledNotificationsAsync();

	const titleTranslations = {
		eng: "🌟 Your Horoscope is Ready!",
		ukr: "🌟 Ваш гороскоп готовий!",
		rus: "🌟 Ваш гороскоп готов!",
	};

	const bodyTranslations = {
		eng: `Good morning! Check your ${zodiacSign} horoscope for today.`,
		ukr: `Доброго ранку! Перевірте свій гороскоп на сьогодні для знаку ${zodiacSign}.`,
		rus: `Доброе утро! Проверьте свой гороскоп на сегодня для знака ${zodiacSign}.`,
	};

	// Schedule daily notification
	await Notifications.scheduleNotificationAsync({
		content: {
			title: titleTranslations[lang] || titleTranslations.eng,
			body: bodyTranslations[lang] || bodyTranslations.eng,
			data: { zodiacSign },
			sound: true,
		},
		trigger: {
			hour: hour, // 9 AM
			minute: minute, // 0 minutes
			repeats: true, // Repeat daily
			type: Notifications.SchedulableTriggerInputTypes.DAILY,
		},
	});
}
