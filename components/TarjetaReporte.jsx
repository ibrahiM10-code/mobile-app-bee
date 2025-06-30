import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const TarjetaReporte = ({ titulo, descripcion, onPress }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{titulo}</Text>
      <Text style={styles.description}>{descripcion}</Text>
      <Image
        source={require("../assets/images/colmena.jpg")}
        style={{
          borderRadius: 5,
          resizeMode: "cover",
          width: 130,
          height: 100,
          alignSelf: "center",
          marginBottom: 16,
        }}
      />
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Descargar de nuevo</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#E1D9C1",
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#222A2A",
    marginHorizontal: 8,
    marginVertical: 15,
  },
  title: {
    fontSize: 18,
    fontFamily: "Manrope-Bold",
    marginBottom: 8,
    color: "#222A2A",
    textAlign: "center",
  },
  description: {
    fontSize: 15,
    color: "#222A2A",
    marginBottom: 16,
    textAlign: "center",
    fontFamily: "Manrope-Regular",
  },
  button: {
    backgroundColor: "#222A2A",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "#E1D9C1",
    fontFamily: "Manrope-Bold",
    fontSize: 16,
  },
});

export default TarjetaReporte;
