import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const serverUrl = 'https://saheart-server-img-374117605936.europe-west3.run.app';
//export const serverUrl = 'http://localhost:8080';

const HoroscopeDisplay = ({ sign, lang, setBackgroundImageUrl }) => {
  const [horoscope, setHoroscope] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!sign) return;
    if (!lang) return;

    const fetchHoroscope = async () => {
      setLoading(true);
      setError(null);

      const today = new Date();
      const currentDate = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0'); // Get current date in YYYY-MM-DD format
      
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
        setError('Failed to fetch horoscope (error fetching). You should try updating this app!');
      } finally {
        setLoading(false);
      }
    };

    fetchHoroscope();
  }, [sign, lang]);

  if (loading) {
    return <Text style={styles.lodaingLabel}>Loading...</Text>;
  }

  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Prediction / Передбачення / Предсказание: </Text>
      <Text style={styles.horoscope}>{horoscope}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
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
