import { Text, Platform } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { ui_tr, sign_tr } from "../utils/translations";

const HoroscopePicker = ({ sign, setSign, lang, styles }) => {
  return (
    <>
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
    </>
  );
};

export default HoroscopePicker;