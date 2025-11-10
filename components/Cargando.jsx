import { ActivityIndicator, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Cargando = ({ contenidoCargando }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
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
  },
  texto: {
    color: "#E1D9C1",
    fontFamily: "Manrope-Regular",
    fontSize: 10,
  },
};

export default Cargando;
