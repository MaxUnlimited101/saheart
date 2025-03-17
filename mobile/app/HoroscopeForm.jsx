import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const HoroscopeForm = ({ setSign, setLang, sign, lang, translations }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select your preferred language:</Text>
      <Picker
        selectedValue={lang}
        style={Platform.select({ android: styles.pickerMobile, ios: styles.pickerMobile, default: styles.picker })}
        onValueChange={(itemValue) => { setLang(itemValue); }}
      >
        <Picker.Item label="----" value="" />
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
        <Picker.Item label={'----'} value="" />
        <Picker.Item label={translations[lang]["aries"]} value={"aries"} />
        <Picker.Item label={translations[lang]["taurus"]} value={"taurus"} />
        <Picker.Item label={translations[lang]["gemini"]} value={"gemini"} />
        <Picker.Item label={translations[lang]["cancer"]} value={"cancer"} />
        <Picker.Item label={translations[lang]["leo"]} value={"leo"} />
        <Picker.Item label={translations[lang]["virgo"]} value={"virgo"} />
        <Picker.Item label={translations[lang]["libra"]} value={"libra"} />
        <Picker.Item label={translations[lang]["scorpio"]} value={"scorpio"} />
        <Picker.Item label={translations[lang]["sagittarius"]} value={"sagittarius"} />
        <Picker.Item label={translations[lang]["capricorn"]} value={"capricorn"} />
        <Picker.Item label={translations[lang]["aquarius"]} value={"aquarius"} />
        <Picker.Item label={translations[lang]["pisces"]} value={"pisces"} />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 15,
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
