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
        {["aries", "taurus", "gemini", "cancer", "leo", "virgo", "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces"].map((signKey) => (
          <Picker.Item key={signKey} label={sign_tr[lang][signKey]} value={signKey} />
        ))}
      </Picker>
    </>
  );
};

export default HoroscopePicker;