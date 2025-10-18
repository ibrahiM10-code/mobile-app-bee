import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DatoRegistrado from "../../components/DatoRegistrado";
import TopBar from "../../components/TopBar";
import AuthContext from "../../context/AuthProvider";
import { API_URL } from "../../helpers/apiUrl";
import evaluar_dato_sensor from "../../helpers/evaluar_dato_sensor";

const DetallesSensor = () => {
  const [ultimosDatos, setUltimosDatos] = useState([]);
  const [descripcionCorta, setDescripcionCorta] = useState("");
  const { config } = useContext(AuthContext);
  const { nombreSensor, datoSensor, metrica, colmenaId, estado } =
    useLocalSearchParams();
  const sensor = {
    nombre: nombreSensor.toLocaleLowerCase(),
    valor: datoSensor,
    estado,
  };

  useEffect(() => {
    const getUltimosDatos = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/sensores/obtener-ultimos-sensores/${colmenaId}`,
          config
        );
        if (response.status === 200) {
          setUltimosDatos(response.data);
        } else if (response.status === 404) {
          setUltimosDatos([]);
        }
      } catch (error) {
        console.error("Error: ", error);
      } finally {
        setDescripcionCorta(evaluar_dato_sensor(sensor));
      }
    };
    getUltimosDatos();
  }, [config, colmenaId]);

  return (
    <SafeAreaView style={{ backgroundColor: "#E1D9C1", flex: 1 }}>
      <TopBar />
      <View style={styles.tituloWrapper}>
        <Text
          style={{ fontFamily: "Manrope-Bold", fontSize: 28, color: "#222A2A" }}
        >
          {nombreSensor}
        </Text>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.datoWrap}>
          <Text
            style={
              nombreSensor === "Temperatura" || nombreSensor === "Humedad"
                ? {
                    fontFamily: "Manrope-Bold",
                    fontSize: 80,
                    textAlign: "center",
                    color: "#222A2A",
                    left: 8,
                    bottom: 4,
                  }
                : {
                    fontFamily: "Manrope-Bold",
                    fontSize: 70,
                    textAlign: "center",
                    color: "#222A2A",
                    left: 2,
                    bottom: 4,
                  }
            }
          >
            {datoSensor}
            {metrica}
          </Text>
        </View>
        <View style={styles.estadoDesc}>
          <Text
            style={{
              fontFamily: "Manrope-Regular",
              fontSize: 16,
              textAlign: "center",
              color: "#222A2A",
            }}
          >
            {descripcionCorta}
          </Text>
        </View>
      </View>
      <Text
        style={{
          fontFamily: "Manrope-Bold",
          color: "#222A2A",
          fontSize: 15,
          marginTop: 35,
          marginBottom: 27,
          marginHorizontal: 25,
        }}
      >
        Últimos datos registrados
      </Text>
      <View style={styles.tablaRegistros}>
        <View style={styles.enunciados}>
          <Text
            style={{
              fontFamily: "Manrope-Bold",
              color: "#222A2A",
              fontSize: 10,
            }}
          >
            Fecha y hora
          </Text>
          <Text
            style={{
              fontFamily: "Manrope-Bold",
              color: "#222A2A",
              fontSize: 10,
            }}
          >
            Registro
          </Text>
        </View>
        {ultimosDatos.map((dato, index) => {
          let valor = "";
          switch (nombreSensor.toLowerCase()) {
            case "temperatura":
              valor = dato.temperatura;
              break;
            case "humedad":
              valor = dato.humedad;
              break;
            case "peso":
              valor = dato.peso;
              break;
            case "sonido":
              valor = dato.sonido;
              break;
            default:
              valor = "";
          }
          return (
            <DatoRegistrado
              key={index}
              fechaRegistro={dato.fecha}
              horaRegistro={dato.hora}
              valorRegistrado={valor}
            />
          );
        })}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  tituloWrapper: {
    marginTop: 30,
    marginHorizontal: 25,
  },
  infoContainer: {
    marginTop: 30,
  },
  datoWrap: {
    height: 200,
    width: 210,
    borderStyle: "solid",
    borderColor: "#F39005",
    borderRadius: "50%",
    borderWidth: 1,
    justifyContent: "center",
    alignSelf: "center",
  },
  estadoDesc: {
    alignSelf: "center",
    width: "50%",
    marginTop: 25,
  },
  tablaRegistros: {
    backgroundColor: "#F39005",
    paddingVertical: 10,
    borderRadius: 5,
    alignSelf: "center",
    width: "80%",
    marginBottom: 10,
    paddingBottom: 20,
  },
  enunciados: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: -20,
  },
});

export default DetallesSensor;
