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
    nombreColmena: "",
    nombreApiario: "",
    password: "",
  });

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleRegister = () => {
    // Handle registration logic here
    router.push("/colmenas");
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
          {/* Reeemplazar con todo lo necesario para acceder a la cámara, */}
          <TextInput
            style={styles.input}
            placeholder="Foto de colmena"
            placeholderTextColor="#E1D9C1"
            value={form.password}
            onChangeText={(text) => handleChange("password", text)}
            secureTextEntry
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

export default Register;
