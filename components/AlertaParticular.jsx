import axios from "axios";
import { useContext } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthContext from "../context/AuthProvider";
import { API_URL } from "../helpers/apiUrl";

const AlertaParticular = ({
  fechaAlerta,
  tituloAlerta,
  descAlerta,
  idColmena,
  idAlerta,
  estadoAlerta,
  imgAlerta,
  tipoAlerta,
  actualizarEstadoAlerta,
}) => {
  const { config, userId, userToken } = useContext(AuthContext);
  const cambiarEstado = async (nuevoEstado) => {
    if (!userId || !userToken) return;
    try {
      const response = await axios.put(
        `${API_URL}/alertas/actualizar-alerta/${idAlerta}`,
        { estado_alerta: nuevoEstado },
        config
      );
      console.log("Alerta actualizada:", response.data);
      if (actualizarEstadoAlerta) {
        actualizarEstadoAlerta(idAlerta, nuevoEstado); // Update parent state
      }
    } catch (error) {
      console.error("Error updating alert:", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <Text
          style={{
            fontFamily: "Manrope-Bold",
            fontSize: 18,
            marginVertical: 10,
            color: "#222A2A",
          }}
        >
          {fechaAlerta}
        </Text>
        <View style={styles.alertaContainer}>
          <Image
            source={
              tipoAlerta === "advertencia"
                ? require("../assets/icons/advertencia.png")
                : tipoAlerta === "informativa"
                ? require("../assets/icons/comprobado.png")
                : imgAlerta
            }
            style={styles.icon}
          />
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontFamily: "Manrope-Bold",
                color: "#E1D9C1",
                fontSize: 14,
              }}
            >
              {tituloAlerta}
            </Text>
            <Text
              style={{
                fontFamily: "Manrope-Regular",
                color: "#E1D9C1",
                fontSize: 12,
              }}
            >
              {descAlerta}
            </Text>
          </View>
          {estadoAlerta === "pendiente" && tipoAlerta === "advertencia" ? (
            <TouchableOpacity
              style={{ alignSelf: "center" }}
              onPress={() => cambiarEstado("resuelta")}
            >
              <Text
                style={{
                  fontFamily: "Manrope-Bold",
                  fontSize: 14,
                  textAlign: "center",
                  color: "#E1D9C1",
                }}
              >
                Marcar{"\n"}como resuelta
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{ alignSelf: "center" }}
              onPress={() => cambiarEstado("resuelta")}
            >
              <Text
                style={{
                  fontFamily: "Manrope-Bold",
                  fontSize: 14,
                  textAlign: "center",
                  color: "#E1D9C1",
                }}
              >
                Marcar{"\n"}como vista
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  alertaContainer: {
    backgroundColor: "#6D7A79",
    flexDirection: "row",
    borderRadius: 5,
    alignItems: "flex-start",
    gap: 15,
    padding: 10,
    marginBottom: -20,
    borderWidth: 1,
    borderColor: "#222A2A",
  },
  icon: {
    width: 38,
    height: 38,
    resizeMode: "contain",
    marginVertical: 4,
  },
});

export default AlertaParticular;
