import axios from "axios";
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
import { API_URL } from "../../helpers/apiUrl";

const Register = () => {
  const [form, setForm] = useState({
    nombre: "",
    rut: "",
    email: "",
    password: "",
    confirmPassword: "",
    telefono: "",
    direccion: "",
  });

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleRegister = async () => {
    console.log("hit");
    try {
      console.log("hola");
      const response = await axios.post(`${API_URL}/auth/registrar-apicultor`, {
        nombre: form.nombre,
        rut: form.rut,
        email: form.email,
        password: form.password,
        telefono: form.telefono,
        direccion: form.direccion,
      });
      console.log(response);
      if (response.status === 201) {
        alert("Registro exitoso");
        router.push("/login");
      } else {
        alert("Error al registrar, por favor intente nuevamente.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
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
            placeholder="Nombre y Apellido"
            placeholderTextColor="#E1D9C1"
            value={form.nombre}
            onChangeText={(text) => handleChange("nombre", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="RUT"
            placeholderTextColor="#E1D9C1"
            value={form.rut}
            onChangeText={(text) => handleChange("rut", text)}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#E1D9C1"
            value={form.email}
            onChangeText={(text) => handleChange("email", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor="#E1D9C1"
            value={form.password}
            onChangeText={(text) => handleChange("password", text)}
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Confirme Contraseña"
            placeholderTextColor="#E1D9C1"
            value={form.confirmPassword}
            onChangeText={(text) => handleChange("confirmPassword", text)}
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Teléfono"
            placeholderTextColor="#E1D9C1"
            value={form.telefono}
            onChangeText={(text) => handleChange("telefono", text)}
            keyboardType="phone-pad"
          />
          <TextInput
            style={styles.input}
            placeholder="Dirección"
            placeholderTextColor="#E1D9C1"
            value={form.direccion}
            onChangeText={(text) => handleChange("direccion", text)}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={handleRegister}
              style={{
                backgroundColor: "#E1D9C1",
                padding: 12,
                borderRadius: 8,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#222A2A", fontFamily: "Manrope-Bold" }}>
                Registrarse
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

export default Register;
