import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SensorData from "../../components/SensorData";
import TopBar from "../../components/TopBar";

const Dashboard = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopBar />
      <ScrollView
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <Image
          source={require("../../assets/images/foto-dashboard.jpg")}
          style={{ resizeMode: "cover", width: "100%", height: 330 }}
        />
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
            paddingHorizontal: 16,
            marginTop: -175,
            zIndex: 1,
          }}
        >
          <SensorData
            nombreSensor={"Temperatura"}
            datoSensor={31}
            estado={"Optima"}
            metrica={"°"}
            icono={require("../../assets/icons/temperatura.png")}
          />
          <SensorData
            nombreSensor={"Humedad"}
            datoSensor={30}
            estado={"Optima"}
            metrica={"%"}
            icono={require("../../assets/icons/humedad.png")}
          />

          <SensorData
            nombreSensor={"Peso"}
            datoSensor={45}
            estado={"Optimo"}
            metrica={"kg"}
            icono={require("../../assets/icons/balanza.png")}
          />
          <SensorData
            nombreSensor={"Sonido"}
            datoSensor={350}
            estado={"Reina presente"}
            metrica={"Hz"}
            icono={require("../../assets/icons/sonido.png")}
          />
        </View>
        <Text style={{ fontSize: 24, marginBottom: 16, paddingHorizontal: 40 }}>
          Sobre esta colmena...
        </Text>
        <View style={styles.sobreColmena}>
          <View>
            <Image
              source={require("../../assets/images/colmena.jpg")}
              style={{ width: 137, height: 105 }}
            />
          </View>
          <View style={styles.reporteColmena}>
            <Text style={{ fontSize: 10, width: "16%" }}>
              La colmena presenta datos óptimos en todas las áreas sensorizadas,
              su peso indica la posibilidad de extracción de miel, su
              temperatura es óptima, al igual que la humedad y el sonido interno
              asegura la presencia de su abeja reina.
            </Text>
            <TouchableOpacity>
              <Text style={{ backgroundColor: "green", color: "white" }}>
                Descargar reporte
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      {/* <Navbar /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sobreColmena: {
    paddingHorizontal: 40,
    flexDirection: "row",
    alignItems: "center",
    gap: 32,
  },
  reporteColmena: {},
});

export default Dashboard;
