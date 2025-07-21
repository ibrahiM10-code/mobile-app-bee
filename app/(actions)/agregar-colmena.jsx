import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useContext, useState } from "react";
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
import AuthContext from "../../context/AuthProvider";
import { API_URL } from "../../helpers/apiUrl";

const AgregarColmena = () => {
  const { userToken, userId } = useContext(AuthContext);
  const [form, setForm] = useState({
    nombreColmena: "",
    nombreApiario: "",
    fotoColmena: null,
  });
  const fecha = new Date();
  const fechaFormateada = fecha.toISOString().split("T")[0]; // e.g., 2024-06-08

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleColmena = async () => {
    const formData = new FormData();
    formData.append("nombre_colmena", form.nombreColmena);
    formData.append("nombre_apiario", form.nombreApiario);
    formData.append("id_apicultor", userId);
    if (form.fotoColmena) {
      formData.append("foto_colmena", {
        uri: form.fotoColmena,
        name: `colmena-${fechaFormateada}.jpg`,
        type: "image/jpeg",
      });
    }
    try {
      const response = await axios.post(
        `${API_URL}/colmenas/agregar-colmena`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("hola");
      console.log(response.data);
      router.push("/colmenas");
    } catch (error) {
      console.error("Error al agregar colmena:", error);
    }
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
