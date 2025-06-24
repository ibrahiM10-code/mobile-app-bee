import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DatoRegistrado from "../../components/DatoRegistrado";
import TopBar from "../../components/TopBar";

const DetallesSensor = () => {
  const { nombreSensor } = useLocalSearchParams();

  const mockData = [
    {
      fechaRegistro: "21-09-2025 09:57",
      valorRegistrado: "30°",
    },
    {
      fechaRegistro: "21-09-2025 11:31",
      valorRegistrado: "31°",
    },
    {
      fechaRegistro: "21-09-2025 12:24",
      valorRegistrado: "32°",
    },
    {
      fechaRegistro: "21-09-2025 13:50",
      valorRegistrado: "33°",
    },
  ];

  return (
    <SafeAreaView style={{ backgroundColor: "#E1D9C1", flex: 1 }}>
      <TopBar />
      <View style={styles.tituloWrapper}>
        <Text
          style={{ fontFamily: "Manrope-Bold", fontSize: 28, color: "#222A2A" }}
        >
          {nombreSensor}
        </Text>
        {/* <Image style={{ width: 24, height: 24, resizeMode: "contain" }} /> */}
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.datoWrap}>
          <Text
            style={{
              fontFamily: "Manrope-Bold",
              fontSize: 80,
              textAlign: "center",
              color: "#222A2A",
              left: 8,
              bottom: 4,
            }}
          >
            31°
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
            La colmena está con una temperatura óptima e ideal para las abejas.
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
        Últimas temperaturas registradas
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
            Grados
          </Text>
        </View>
        {mockData.map((dato, index) => (
          <DatoRegistrado
            key={index}
            fechaRegistro={dato.fechaRegistro}
            valorRegistrado={dato.valorRegistrado}
          />
        ))}
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
    width: 200,
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
    paddingBottom: 15,
  },
  enunciados: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: -20,
  },
});

export default DetallesSensor;
