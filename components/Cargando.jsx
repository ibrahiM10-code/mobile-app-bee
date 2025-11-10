import { ActivityIndicator, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Cargando = ({ contenidoCargando }) => {
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <View style={styles.contenedor}>
        <ActivityIndicator size={"large"} color={"#F39005"} />
        <Text style={styles.texto}>Cargando {contenidoCargando}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = {
  contenedor: {
    backgroundColor: "#222A2A",
    width: "40%",
    paddingVertical: "40",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 190,
  },
  texto: {
    color: "#E1D9C1",
    fontFamily: "Manrope-Bold",
    fontSize: 15,
    textAlign: "center",
    marginTop: 10,
  },
};

export default Cargando;
