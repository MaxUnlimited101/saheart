import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ui_tr, } from '../utils/translations';
import HoroscopePicker from './HoroscopePicker';

const HoroscopeForm = ({ setSign, setLang, sign, lang, onChangeDefault }) => {
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

      <HoroscopePicker sign={sign} setSign={setSign} lang={lang} styles={styles} />
      
      {onChangeDefault && (
        <TouchableOpacity style={styles.changeDefaultButton} onPress={onChangeDefault}>
          <Text style={styles.changeDefaultButtonText}>
            {ui_tr[lang]["btn_change_default_sign"] || "Change Default Sign"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 15,
    width: '80%',
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
  },
  changeDefaultButton: {
    backgroundColor: '#a83297',
    padding: 12,
    borderRadius: 10,
    marginTop: 15,
  },
  changeDefaultButtonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HoroscopeForm;