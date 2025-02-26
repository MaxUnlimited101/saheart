import React, { useState } from 'react';
import { ScrollView, SafeAreaView, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import HoroscopeForm from './HoroscopeForm';
import HoroscopeDisplay, { serverUrl } from './HoroscopeDisplay';
import { ImageBackground } from 'react-native';

const App = () => {
  const [selectedSign, setSelectedSign] = useState('');
  const [selectedLang, setSelectedLang] = useState('');
  const [backgroundUrl, setBackgroundUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (sign, lang) => {
    setLoading(true);
    setSelectedSign(sign);
    setSelectedLang(lang);
    setLoading(false);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  let disp = <></>;
  if (selectedSign && selectedLang) {
    disp = <HoroscopeDisplay sign={selectedSign} lang={selectedLang} setBackgroundImageUrl={setBackgroundUrl} />;
  }

  return (
    <ImageBackground source={{ uri: `${serverUrl}${backgroundUrl}` }} style={styles.backgroundImage}>
      <View style={styles.container}>
        <HoroscopeForm sign={selectedSign} lang={selectedLang} setLang={setSelectedLang} setSign={setSelectedSign} />
      </View>
      <ScrollView style={styles.containerVisualStyle} contentContainerStyle={styles.contentContainerStyle}
        persistentScrollbar={true} /*<--only for android*/ >
        <View>
          {disp}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    margin: 0,
  },
  contentContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',

  },
  containerVisualStyle: {
    flex: 1,
    padding: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#a83297', // Ensure text is visible on background
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    backgroundColor: '#0b1218',
  },
});

export default App;
