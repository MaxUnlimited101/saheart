import { View, Text, StyleSheet, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ui_tr, sign_tr } from '../utils/translations';

const HoroscopeForm = ({ setSign, setLang, sign, lang }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{ui_tr[lang]["label_select_lang"]}</Text>
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

      <Text style={styles.label}>{ui_tr[lang]["label_select_sign"]}</Text>
      <Picker
        selectedValue={sign}
        style={Platform.select({ android: styles.pickerMobile, ios: styles.pickerMobile, default: styles.picker })}
        onValueChange={(itemValue) => { setSign(itemValue); }}
      >
        <Picker.Item label={'----'} value="" />
        <Picker.Item label={sign_tr[lang]["aries"]} value={"aries"} />
        <Picker.Item label={sign_tr[lang]["taurus"]} value={"taurus"} />
        <Picker.Item label={sign_tr[lang]["gemini"]} value={"gemini"} />
        <Picker.Item label={sign_tr[lang]["cancer"]} value={"cancer"} />
        <Picker.Item label={sign_tr[lang]["leo"]} value={"leo"} />
        <Picker.Item label={sign_tr[lang]["virgo"]} value={"virgo"} />
        <Picker.Item label={sign_tr[lang]["libra"]} value={"libra"} />
        <Picker.Item label={sign_tr[lang]["scorpio"]} value={"scorpio"} />
        <Picker.Item label={sign_tr[lang]["sagittarius"]} value={"sagittarius"} />
        <Picker.Item label={sign_tr[lang]["capricorn"]} value={"capricorn"} />
        <Picker.Item label={sign_tr[lang]["aquarius"]} value={"aquarius"} />
        <Picker.Item label={sign_tr[lang]["pisces"]} value={"pisces"} />
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
    color: '#000000',
  },
  pickerMobile: {
    backgroundColor: '#ffffff',
    color: '#000000',
    marginBottom: 20,
  }
});

export default HoroscopeForm;