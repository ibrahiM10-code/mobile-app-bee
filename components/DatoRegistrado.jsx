import { StyleSheet, Text, View } from "react-native";
import { formatFecha } from "../helpers/formateaFecha";

const DatoRegistrado = ({ fechaRegistro, horaRegistro, valorRegistrado }) => {
  return (
    <View style={styles.registros}>
      <Text style={styles.textFechaHora}>
        {formatFecha(fechaRegistro)} {horaRegistro}
      </Text>
      <Text style={styles.textValorRegistrado}>{valorRegistrado}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  registros: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5, // menos espacio vertical por fila
    paddingHorizontal: 10, // padding interno
    marginVertical: 3, // separación mínima entre filas
    // backgroundColor: "red",
    top: "14",
  },
  textFechaHora: {
    fontFamily: "Manrope-SemiBold",
    color: "#222A2A",
    fontSize: 13,
    left: "20",
  },
  textValorRegistrado: {
    fontFamily: "Manrope-SemiBold",
    color: "#222A2A",
    fontSize: 13,
    right: "50",
  },
});

export default DatoRegistrado;
