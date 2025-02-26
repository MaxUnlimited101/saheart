import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const HoroscopeForm = ({ setSign, setLang, sign, lang }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select your preferred language:</Text>
      <Picker
        selectedValue={lang}
        style={Platform.select({ android: styles.pickerMobile, ios: styles.pickerMobile, default: styles.picker })}
        onValueChange={(itemValue) => { setLang(itemValue); }}
      >
        <Picker.Item label="--Language / Мова / Язык--" value="" />
        <Picker.Item label="English" value="eng" />
        <Picker.Item label="Українська" value="ukr" />
        <Picker.Item label="Русский" value="rus" />
      </Picker>

      <Text style={styles.label}>Select Your Zodiac Sign:</Text>
      <Picker
        selectedValue={sign}
        style={Platform.select({ android: styles.pickerMobile, ios: styles.pickerMobile, default: styles.picker })}
        onValueChange={(itemValue) => { setSign(itemValue); }}
      >
        <Picker.Item label="--Sign / Знак / Знак--" value="" />
        <Picker.Item label="Aries - Овен - Овен" value="aries" />
        <Picker.Item label="Taurus - Телець - Телец" value="taurus" />
        <Picker.Item label="Gemini - Близнюки - Близнецы" value="gemini" />
        <Picker.Item label="Cancer - Рак - Рак" value="cancer" />
        <Picker.Item label="Leo - Лев - Лев" value="leo" />
        <Picker.Item label="Virgo - Діва - Дева" value="virgo" />
        <Picker.Item label="Libra - Ваги - Весы" value="libra" />
        <Picker.Item label="Scorpio - Скорпіон - Скорпион" value="scorpio" />
        <Picker.Item label="Sagittarius - Стрілець - Стрелец" value="sagittarius" />
        <Picker.Item label="Capricorn - Козеріг - Козерог" value="capricorn" />
        <Picker.Item label="Aquarius - Водолій - Водолей" value="aquarius" />
        <Picker.Item label="Pisces - Риби - Рыбы" value="pisces" />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  label: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
    margin: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
    backgroundColor: '#ffffff',
  },
  pickerMobile: {
    backgroundColor: '#ffffff',
    marginBottom: 20,
  }
});

export default HoroscopeForm;
