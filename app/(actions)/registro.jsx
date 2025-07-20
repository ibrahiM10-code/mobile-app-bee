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
  const [errores, setErrores] = useState({
    nombre: "",
    rut: "",
    email: "",
    password: "",
    confirmPassword: "",
    telefono: "",
    direccion: "",
  });

  // Función para validar RUT chileno
  const validarRut = (rut) => {
    rut = rut.replace(/\s+/g, '').toUpperCase();
    if (!/^\d{7,8}-[\dK]$/.test(rut)) return false;
    const [cuerpo, dv] = rut.split('-');
    let suma = 0;
    let multiplo = 2;
    for (let i = cuerpo.length - 1; i >= 0; i--) {
      suma += parseInt(cuerpo[i]) * multiplo;
      multiplo = multiplo < 7 ? multiplo + 1 : 2;
    }
    const dvEsperado = 11 - (suma % 11);
    let dvCalc = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'K' : dvEsperado.toString();
    return dv === dvCalc;
  };

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleRegister = async () => {
    let erroresTemp = {
      nombre: "",
      rut: "",
      email: "",
      password: "",
      confirmPassword: "",
      telefono: "",
      direccion: "",
    };
    let valido = true;
    // Validaciones
    if (!form.nombre.trim()) {
      erroresTemp.nombre = "El nombre es obligatorio.";
      valido = false;
    }
    if (!form.rut.trim()) {
      erroresTemp.rut = "El RUT es obligatorio.";
      valido = false;
    } else if (!validarRut(form.rut)) {
      erroresTemp.rut = "El RUT ingresado no es válido.";
      valido = false;
    }
    if (!form.email.trim()) {
      erroresTemp.email = "El email es obligatorio.";
      valido = false;
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      erroresTemp.email = "El email no es válido.";
      valido = false;
    }
    if (!form.password) {
      erroresTemp.password = "La contraseña es obligatoria.";
      valido = false;
    } else if (form.password.length < 6) {
      erroresTemp.password = "La contraseña debe tener al menos 6 caracteres.";
      valido = false;
    }
    if (!form.confirmPassword) {
      erroresTemp.confirmPassword = "Debe confirmar la contraseña.";
      valido = false;
    } else if (form.password !== form.confirmPassword) {
      erroresTemp.confirmPassword = "Las contraseñas no coinciden.";
      valido = false;
    }
    if (!form.telefono.trim()) {
      erroresTemp.telefono = "El teléfono es obligatorio.";
      valido = false;
    } else if (!/^\d{7,15}$/.test(form.telefono)) {
      erroresTemp.telefono = "El teléfono debe contener solo números (7-15 dígitos).";
      valido = false;
    }
    if (!form.direccion.trim()) {
      erroresTemp.direccion = "La dirección es obligatoria.";
      valido = false;
    }
    setErrores(erroresTemp);
    if (!valido) return;
    console.log("hit");
    try {
      console.log("hola");
      const response = await axios.post(
        "http://192.168.1.101:5000/auth/registrar-apicultor",
        {
          nombre: form.nombre,
          rut: form.rut,
          email: form.email,
          password: form.password,
          telefono: form.telefono,
          direccion: form.direccion,
        }
      );
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
            onChangeText={(text) => {
              handleChange("nombre", text);
              setErrores({ ...errores, nombre: "" });
            }}
          />
          {errores.nombre ? (
            <Text style={styles.errorText}>{errores.nombre}</Text>
          ) : null}
          <TextInput
            style={styles.input}
            placeholder="RUT"
            placeholderTextColor="#E1D9C1"
            value={form.rut}
            onChangeText={(text) => {
              handleChange("rut", text);
              setErrores({ ...errores, rut: "" });
            }}
            autoCapitalize="none"
          />
          {errores.rut ? (
            <Text style={styles.errorText}>{errores.rut}</Text>
          ) : null}
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#E1D9C1"
            value={form.email}
            onChangeText={(text) => {
              handleChange("email", text);
              setErrores({ ...errores, email: "" });
            }}
          />
          {errores.email ? (
            <Text style={styles.errorText}>{errores.email}</Text>
          ) : null}
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor="#E1D9C1"
            value={form.password}
            onChangeText={(text) => {
              handleChange("password", text);
              setErrores({ ...errores, password: "" });
            }}
            secureTextEntry
          />
          {errores.password ? (
            <Text style={styles.errorText}>{errores.password}</Text>
          ) : null}
          <TextInput
            style={styles.input}
            placeholder="Confirme Contraseña"
            placeholderTextColor="#E1D9C1"
            value={form.confirmPassword}
            onChangeText={(text) => {
              handleChange("confirmPassword", text);
              setErrores({ ...errores, confirmPassword: "" });
            }}
            secureTextEntry
          />
          {errores.confirmPassword ? (
            <Text style={styles.errorText}>{errores.confirmPassword}</Text>
          ) : null}
          <TextInput
            style={styles.input}
            placeholder="Teléfono"
            placeholderTextColor="#E1D9C1"
            value={form.telefono}
            onChangeText={(text) => {
              handleChange("telefono", text);
              setErrores({ ...errores, telefono: "" });
            }}
            keyboardType="phone-pad"
          />
          {errores.telefono ? (
            <Text style={styles.errorText}>{errores.telefono}</Text>
          ) : null}
          <TextInput
            style={styles.input}
            placeholder="Dirección"
            placeholderTextColor="#E1D9C1"
            value={form.direccion}
            onChangeText={(text) => {
              handleChange("direccion", text);
              setErrores({ ...errores, direccion: "" });
            }}
          />
          {errores.direccion ? (
            <Text style={styles.errorText}>{errores.direccion}</Text>
          ) : null}
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
  errorText: {
    color: "#FF6B6B",
    fontSize: 14,
    marginBottom: 8,
    alignSelf: "flex-start",
    fontFamily: "Manrope-SemiBold",
  },
});

export default Register;
