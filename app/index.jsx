import axios from "axios";
import { router } from "expo-router";
import { useContext, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthContext from "../context/AuthProvider";
import { API_URL } from "../helpers/apiUrl";

const Inicio = () => {
  const { setToken, setUser } = useContext(AuthContext);
  const [form, setForm] = useState({
    rut: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const validarRut = (rut) => {
    // Elimina espacios y convierte a mayúsculas
    rut = rut.replace(/\s+/g, "").toUpperCase();
    // Valida formato básico
    if (!/^\d{7,8}-[\dK]$/.test(rut)) return false;
    const [cuerpo, dv] = rut.split("-");
    let suma = 0;
    let multiplo = 2;
    for (let i = cuerpo.length - 1; i >= 0; i--) {
      suma += parseInt(cuerpo[i]) * multiplo;
      multiplo = multiplo < 7 ? multiplo + 1 : 2;
    }
    const dvEsperado = 11 - (suma % 11);
    let dvCalc =
      dvEsperado === 11 ? "0" : dvEsperado === 10 ? "K" : dvEsperado.toString();
    return dv === dvCalc;
  };

  const handleLogin = async () => {
    // Validaciones
    if (!form.rut) {
      setErrorMsg("El RUT es obligatorio");
      return;
    }
    if (!validarRut(form.rut)) {
      setErrorMsg("El RUT ingresado no es válido");
      return;
    }
    if (!form.password) {
      setErrorMsg("La contraseña es obligatoria");
      return;
    }
    if (form.password.length < 6) {
      setErrorMsg("La contraseña debe tener al menos 6 caracteres");
      return;
    }
    try {
      const response = await axios.post(`${API_URL}/auth/login`, form);
      if (response.status === 200) {
        setErrorMsg("");
        ToastAndroid.show("Inicio de sesión exitoso", ToastAndroid.SHORT);
        // alert("Inicio de sesión exitoso");
        console.log(response.data);
        setToken(response.data[0].token);
        setUser(response.data[0].user);
        router.push("/(actions)/colmenas");
      } else {
        setErrorMsg("Error al iniciar sesión, por favor intente nuevamente.");
      }
    } catch (error) {
      if (error.status === 401) {
        setErrorMsg(
          "RUT o contraseña incorrectos. Por favor, inténtalo de nuevo."
        );
        return;
      } else {
        setErrorMsg("Error al iniciar sesión.");
        return;
      }
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.form}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={require("../assets/icons/colmena.png")}
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
            placeholder="RUT (sin puntos con guion)"
            placeholderTextColor="#E1D9C1"
            value={form.rut}
            onChangeText={(text) => {
              handleChange("rut", text);
              setErrorMsg("");
            }}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor="#E1D9C1"
            value={form.password}
            onChangeText={(text) => {
              handleChange("password", text);
              setErrorMsg("");
            }}
            secureTextEntry
          />
          {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}
          {/* Recover password and create account links */}
          <View
            style={{
              width: "100%",
              marginBottom: 16,
            }}
          >
            <TouchableOpacity
              onPress={() => router.push("/recuperar")}
              style={{ alignSelf: "flex-start", marginBottom: 8 }}
            >
              <Text
                style={{
                  color: "#E1D9C1",
                  textDecorationLine: "underline",
                  fontSize: 14,
                }}
              >
                ¿Olvidaste tu contraseña?
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push("/registro")}
              style={{ alignSelf: "flex-start" }}
            >
              <Text
                style={{
                  color: "#E1D9C1",
                  textDecorationLine: "underline",
                  fontSize: 14,
                }}
              >
                Crear cuenta
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={handleLogin}
              style={{
                backgroundColor: "#E1D9C1",
                padding: 12,
                borderRadius: 8,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#222A2A", fontFamily: "Manrope-Bold" }}>
                Iniciar Sesión
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
    padding: 22,
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
  errorText: {
    color: "#FF6B6B",
    fontSize: 14,
    marginBottom: 8,
    alignSelf: "flex-start",
    fontFamily: "Manrope-SemiBold",
  },
});

export default Inicio;
