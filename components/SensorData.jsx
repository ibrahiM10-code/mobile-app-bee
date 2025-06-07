import { Dimensions, Image, StyleSheet, Text, View } from "react-native";

const screenWidth = Dimensions.get("window").width;
const cardSize = (screenWidth - 60) / 2;
const SensorData = ({ nombreSensor, datoSensor, estado, icono, metrica }) => {
  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.title}>{nombreSensor}</Text>
        <Image
          source={icono}
          style={
            nombreSensor === "Temperatura" || nombreSensor === "Humedad"
              ? {
                  width: 24,
                  height: 24,
                  resizeMode: "contain",
                  marginTop: 4,
                  right: 10,
                  position: "absolute",
                }
              : styles.icon
          }
        />
      </View>

      <View style={styles.middleSection}>
        <Text
          style={
            nombreSensor === "Temperatura" || nombreSensor === "Humedad"
              ? {
                  fontSize: 48,
                  fontWeight: "bold",
                  color: "black",
                  left: 7,
                  bottom: 7,
                }
              : styles.value
          }
        >
          {datoSensor}
          {metrica}
        </Text>
      </View>

      <View style={styles.bottomSection}>
        <Text style={styles.status}>{estado}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 145,
    height: 145,
    backgroundColor: "grey",
    borderRadius: 12,
    marginBottom: 16,
    padding: 8,
    justifyContent: "space-between",
  },
  topSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
    marginTop: 4,
    right: 17,
    position: "absolute",
  },
  title: {
    fontSize: 12,
    color: "black",
    // left: 10,
  },
  middleSection: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1, // ocupa todo el espacio disponible
  },
  value: {
    fontSize: 40,
    fontWeight: "bold",
    color: "black",
    bottom: 7,
  },
  bottomSection: {
    alignItems: "center",
  },
  status: {
    fontSize: 10,
    color: "#ccc",
    bottom: 14,
  },
});

export default SensorData;
