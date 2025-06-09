import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TopBar from "../../components/TopBar";

const DetallesSensor = () => {
  const { nombreSensor } = useLocalSearchParams();
  console.log(nombreSensor);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopBar />
      <View style={styles.tituloWrapper}>
        <Text style={{ fontSize: 28 }}>{nombreSensor}</Text>
        {/* <Image style={{ width: 24, height: 24, resizeMode: "contain" }} /> */}
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.datoWrap}>
          <Text style={{ fontSize: 80, textAlign: "center" }}>31°</Text>
        </View>
        <View style={styles.estadoDesc}>
          <Text style={{ fontSize: 16, textAlign: "center" }}>
            La colmena está con una temperatura óptima e ideal para las abejas.
          </Text>
        </View>
      </View>
      <Text
        style={{
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
          <Text style={{ fontSize: 10 }}>Fecha y hora</Text>
          <Text style={{ fontSize: 10 }}>Grados</Text>
        </View>
        <View style={styles.registros}>
          <Text style={{ fontSize: 13 }}>21-09-2025 13:50</Text>
          <Text style={{ fontSize: 13 }}>33°</Text>
        </View>
        {/* <View
          style={{
            borderStyle: "solid",
            borderColor: "white",
            borderWidth: 0.3,
          }}
        ></View> */}
        <View style={styles.registros}>
          <Text style={{ fontSize: 13 }}>21-09-2025 12:24</Text>
          <Text style={{ fontSize: 13 }}>32°</Text>
        </View>
        <View style={styles.registros}>
          <Text style={{ fontSize: 13 }}>21-09-2025 11:31</Text>
          <Text style={{ fontSize: 13 }}>31°</Text>
        </View>
        <View style={styles.registros}>
          <Text style={{ fontSize: 13 }}>21-09-2025 09:57</Text>
          <Text style={{ fontSize: 13 }}>30°</Text>
        </View>
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
    // paddingHorizontal: 80,
    // justifyContent: "center",
  },
  datoWrap: {
    height: 200,
    width: 200,
    borderStyle: "solid",
    borderColor: "black",
    borderRadius: "50%",
    borderWidth: 1,
    justifyContent: "center",
    alignSelf: "center",
  },
  estadoDesc: {
    alignSelf: "center",
    width: "50%",
    marginTop: 25,
    // marginBottom: 45,
  },
  tablaRegistros: {
    backgroundColor: "gray",
    paddingVertical: 10,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    alignSelf: "center",
    width: "80%",
  },
  enunciados: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  registros: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
    // alignSelf: "flex-start",
    right: 13,
  },
});

export default DetallesSensor;
