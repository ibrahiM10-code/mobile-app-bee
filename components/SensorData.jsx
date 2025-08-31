import { Link } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";

const SensorData = ({
  nombreSensor,
  datoSensor,
  estado,
  icono,
  metrica,
  colmenaId,
}) => {
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
        <Link
          href={{
            pathname: `/sensor/${nombreSensor}`,
            params: { datoSensor, metrica, colmenaId },
          }}
          style={
            nombreSensor === "Temperatura" || nombreSensor === "Humedad"
              ? {
                  fontSize: 48,
                  fontFamily: "Manrope-Bold",
                  color: "#222A2A",
                  left: 7,
                  bottom: 7,
                }
              : styles.value
          }
        >
          {datoSensor}
          {metrica}
        </Link>
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
    backgroundColor: "#F39005",
    borderRadius: 12,
    marginBottom: 16,
    padding: 8,
    justifyContent: "space-between",
    borderColor: "#222A2A",
    borderWidth: 1,
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
    fontFamily: "Manrope-Bold",
    fontSize: 12,
    color: "#222A2A",
    // left: 10,
  },
  middleSection: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1, // ocupa todo el espacio disponible
  },
  value: {
    fontFamily: "Manrope-Bold",
    fontSize: 40,
    color: "#222A2A",
    bottom: 7,
  },
  bottomSection: {
    alignItems: "center",
  },
  status: {
    fontFamily: "Manrope-Bold",
    fontSize: 10,
    color: "#222A2A",
    bottom: 14,
  },
});

export default SensorData;
