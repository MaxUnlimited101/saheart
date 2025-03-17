import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Button } from 'react-native';

//export const serverUrl = 'https://saheart-server-img-374117605936.europe-west3.run.app';
export const serverUrl = 'http://10.0.2.2:8080';
//export const serverUrl = 'http://localhost:8080';

const l_tr = {
  "eng": {
    "btn_fetch_ai": "Get AI predicted horoscope",
    "prediction": "Prediction",
    "error_fetching": "Failed to fetch horoscope (error fetching). You should try updating this app!",
    "btn_fetch": "Get horoscope",
  },
  "ukr": {
    "btn_fetch_ai": "Отримати передбачення від ШІ",
    "prediction": "Передбачення",
    "error_fetching": "Не вдалося отримати гороскоп (помилка отримання). Спробуйте оновити цю програму!",
    "btn_fetch": "Отримати гороскоп",
  },
  "rus": {
    "btn_fetch_ai": "Получить предсказание от ИИ",
    "prediction": "Предсказание",
    "error_fetching": "Не удалось получить гороскоп (ошибка получения). Вам следует попробовать обновить это приложение!",
    "btn_fetch": "Получить предсказание",
  }
};


const HoroscopeDisplay = ({ sign, lang, setBackgroundImageUrl, translations }) => {
  const [horoscope, setHoroscope] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchHoroscope = async () => {
    setLoading(true);
    setError(null);

    const today = new Date();
    // Get current date in YYYY-MM-DD format
    const currentDate = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') +
      '-' + String(today.getDate()).padStart(2, '0');

    try {
      const response = await fetch(`${serverUrl}/${lang}/${sign}?date=${currentDate}`);
      const data = await response.json();

      if (response.ok) {
        setHoroscope(data.text);
        setBackgroundImageUrl(data.pathToImage)
      } else {
        setError(data.message || 'Failed to fetch horoscope');
      }
    } catch (err) {
      setError(`${l_tr[lang]["error_fetching"]} [${err}]`);
    } finally {
      setLoading(false);
    }
  };

  const fetchAiHoroscope = async () => {
    setLoading(true);
    setError(null);

    const today = new Date();
    // Get current date in YYYY-MM-DD format
    const currentDate = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') +
      '-' + String(today.getDate()).padStart(2, '0');

    const data = {
      "sign": sign,
      "language": lang
    };

    const bodyData = JSON.stringify(data);
    console.log(bodyData);

    try {
      const response = await fetch(
        `${serverUrl}/ai_pred?date=${currentDate}`,
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: bodyData
        }
      );
      console.log(`response: [${response.body}]`);
      const data = await response.json();

      console.log(data);
      if (response.ok) {
        setHoroscope(data.text);
        setBackgroundImageUrl(data.pathToImage);
      } else {
        setError(data.message || 'Failed to fetch horoscope');
      }
    } catch (err) {
      setError(l_tr[lang]["error_fetching"] + ` [${err}]`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setError('');
    setHoroscope('');
    setBackgroundImageUrl('');
  }, [sign, lang]);

  if (loading) {
    return (
      <View style={styles.container} >
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <View style={styles.verticalStack}>
          <View style={styles.container}>
            <Button title={`${l_tr[lang]["btn_fetch"]}`} onPress={fetchHoroscope} />
          </View>
          <View style={styles.container}>
            <Button title={`${l_tr[lang]["btn_fetch_ai"]}`} onPress={fetchAiHoroscope} />
          </View>
        </View>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.verticalStack}>
        <View style={styles.container}>
          <Button title={`${l_tr[lang]["btn_fetch"]}`} onPress={fetchHoroscope} />
        </View>
        <View style={styles.container}>
          <Button title={`${l_tr[lang]["btn_fetch_ai"]}`} onPress={fetchAiHoroscope} />
        </View>
      </View>
      {horoscope ? (
        <View style={styles.container}>
          <Text style={styles.header}>{`${l_tr[lang]["prediction"]}: `}</Text>
          <Text style={styles.horoscope}>{horoscope}</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  verticalStack: {
    padding: 10,
    flexDirection: 'column',
  },
  container: {
    padding: 10,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 10,
  },
  horoscope: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 10,
  },
  error: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
  lodaingLabel: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
});

export default HoroscopeDisplay;
