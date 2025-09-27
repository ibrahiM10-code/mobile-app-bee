import { router } from "expo-router";
import { useContext, useRef, useState } from "react";
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

const IngresaCodigo = () => {
  const { codigo, setCodigo } = useContext(AuthContext);
  const [digito, setDigito] = useState(["", "", "", ""]);
  const [errorMsg, setErrorMsg] = useState("");
  const inputsRef = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const handleChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      // Solo permite un dígito numérico
      const nuevoCodigo = [...digito];
      nuevoCodigo[index] = value;
      setDigito(nuevoCodigo);

      // Si se ingresó un número y no es el último input, pasa al siguiente
      if (value && index < 3) {
        inputsRef[index + 1].current.focus();
      }
    }
  };

  const handleCodigo = () => {
    const numeroCompleto = Number(digito.join(""));

    if (Number(codigo) === numeroCompleto) {
      router.push("/(actions)/nueva-clave");
      setCodigo("");
    } else {
      setErrorMsg("Codigo incorrecto.");
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
          <View style={{ width: "90%" }}>
            <Text
              style={{
                color: "#E1D9C1",
                fontFamily: "Manrope-SemiBold",
                fontSize: 12,
                textAlign: "center",
                marginBottom: 8,
              }}
            >
              Ingrese su RUT para recibir un correo con el código de
              confirmación y poder resetear su contraseña.
            </Text>
          </View>
          <View style={styles.containerInputs}>
            {digito.map((num, idx) => (
              <TextInput
                key={idx}
                ref={inputsRef[idx]}
                style={styles.input}
                keyboardType="number-pad"
                maxLength={1}
                value={num}
                onChangeText={(val) => handleChange(idx, val)}
                autoFocus={idx === 0}
                textAlign="center"
              />
            ))}
          </View>
          {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={handleCodigo}
              style={{
                backgroundColor: "#E1D9C1",
                padding: 12,
                borderRadius: 8,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#222A2A", fontFamily: "Manrope-Bold" }}>
                Enviar codigo
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
    maxWidth: 280,
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
    width: 48,
    height: 54,
    borderColor: "#E1D9C1",
    borderWidth: 1,
    borderRadius: 8,
    color: "#E1D9C1",
    fontSize: 24,
    fontFamily: "Manrope-Bold",
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
  containerInputs: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    marginVertical: 24,
  },
});

export default IngresaCodigo;
