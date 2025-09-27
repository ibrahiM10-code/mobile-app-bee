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
import AuthContext from "../../context/AuthProvider";
import { API_URL } from "../../helpers/apiUrl";

const NuevaClave = () => {
  const { correo, setCorreo } = useContext(AuthContext);
  const [form, setForm] = useState({
    newPassword: "",
    newPasswordCheck: "",
  });
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleCambioPsw = async () => {
    if (!form.newPassword || !form.newPasswordCheck) {
      setErrorMsg("La contraseña es obligatoria");
      return;
    }
    if (form.newPassword.length < 6 || form.newPasswordCheck.length < 6) {
      setErrorMsg("La contraseña debe tener al menos 6 caracteres");
      return;
    }
    if (form.newPassword !== form.newPasswordCheck) {
      setErrorMsg("Las contraseñas no son iguales.");
      return;
    }
    try {
      const data = { nueva_password: form.newPassword, email: correo };
      const response = await axios.post(`${API_URL}/auth/resetear-clave`, data);
      if (response.status === 200) {
        setErrorMsg("");
        ToastAndroid.show("Cambio de contraseña exitoso", ToastAndroid.SHORT);
        setCorreo("");
        router.push("/");
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
        console.error(error);
        setErrorMsg("Error al cambiar contraseña.");
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
              source={require("../../assets/icons/colmena.png")}
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
            placeholder="Nueva contraseña"
            placeholderTextColor="#E1D9C1"
            value={form.rut}
            onChangeText={(text) => {
              handleChange("newPassword", text);
              setErrorMsg("");
            }}
            autoCapitalize="none"
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Repita la nueva contraseña"
            placeholderTextColor="#E1D9C1"
            value={form.password}
            onChangeText={(text) => {
              handleChange("newPasswordCheck", text);
              setErrorMsg("");
            }}
            secureTextEntry
          />
          {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={handleCambioPsw}
              style={{
                backgroundColor: "#E1D9C1",
                padding: 12,
                borderRadius: 8,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#222A2A", fontFamily: "Manrope-Bold" }}>
                Resetear contraseña
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

export default NuevaClave;
