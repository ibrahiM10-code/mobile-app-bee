import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AgregarColmena = () => {
  const [form, setForm] = useState({
    nombreColmena: "",
    nombreApiario: "",
    password: "",
    fotoColmena: null,
  });

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleColmena = () => {
    const formData = new FormData();
    formData.append("nombreColmena", form.nombreColmena);
    formData.append("nombreApiario", form.nombreApiario);
    if (form.fotoColmena) {
      formData.append("fotoColmena", {
        uri: form.fotoColmena,
        name: "colmena.jpg",
        type: "image/jpeg",
      });
    }
    router.push("/colmenas");
  };

  const tomarFoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      alert("Se requiere permiso para acceder a la cámara.");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      quality: 0.7,
      base64: false,
    });
    console.log(result);
    if (!result.canceled) {
      setForm({ ...form, fotoColmena: result.assets[0].uri });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.form}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={require("../../assets/icons/colmena.png")} // Place your logo in the assets folder
              style={styles.logo}
              resizeMode="contain"
            />
            <Text
              style={{
                fontFamily: "Manrope-Bold",
                fontSize: 24,
                color: "#E1D9C1",
                bottom: 18,
              }}
            >
              MonitorBeehive
            </Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Nombre de colmena"
            placeholderTextColor="#E1D9C1"
            value={form.nombreColmena}
            onChangeText={(text) => handleChange("nombreColmena", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Nombre del apiario"
            placeholderTextColor="#E1D9C1"
            value={form.nombreApiario}
            onChangeText={(text) => handleChange("nombreApiario", text)}
            autoCapitalize="none"
          />
          {/* Camera Button */}
          <TouchableOpacity
            style={{
              backgroundColor: "#E1D9C1",
              padding: 12,
              borderRadius: 8,
              alignItems: "center",
              marginBottom: 20,
            }}
            onPress={tomarFoto}
          >
            <Text style={{ color: "#222A2A", fontFamily: "Manrope-Bold" }}>
              {form.fotoColmena ? "Cambiar foto" : "Tomar foto de colmena"}
            </Text>
          </TouchableOpacity>
          {form.fotoColmena && (
            <Image
              source={{ uri: form.fotoColmena }}
              style={{
                width: 100,
                height: 100,
                marginBottom: 16,
                borderRadius: 8,
              }}
            />
          )}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={handleColmena}
              style={{
                backgroundColor: "#E1D9C1",
                padding: 12,
                borderRadius: 8,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#222A2A", fontFamily: "Manrope-Bold" }}>
                Agregar nueva colmena
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E1D9C1",
    padding: 24,
  },
  form: {
    width: "100%",
    maxWidth: 350,
    alignItems: "center",
    backgroundColor: "#222A2A",
    padding: 24,
    borderRadius: 12,
    elevation: 3,
    borderWidth: 1,
  },
  logo: {
    width: 70,
    height: 70,
    marginBottom: 32,
  },
  input: {
    width: "100%",
    height: 54,
    borderColor: "#E1D9C1",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 12,
    color: "#E1D9C1",
    fontFamily: "Manrope-Regular",
    backgroundColor: "transparent",
  },
  buttonContainer: {
    width: "100%",
    marginTop: 8,
  },
});

export default AgregarColmena;
