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

const Inicio = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleLogin = () => {
    // Handle registration logic here
    router.push("/colmenas");
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
            value={form.email}
            onChangeText={(text) => handleChange("email", text)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor="#E1D9C1"
            value={form.password}
            onChangeText={(text) => handleChange("password", text)}
            secureTextEntry
          />
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
});

export default Inicio;
