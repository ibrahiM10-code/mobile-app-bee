import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Navbar from "../../components/Navbar";
import TopBar from "../../components/TopBar";

const Dashboard = () => {
  return (
    <SafeAreaView>
      <TopBar />
      <ScrollView>
        <View>
          <Image
            source={require("../../assets/images/foto-dashboard.jpg")}
            width={10}
          />
          <SensorData
            nombreSensor={"Temperatura"}
            datoSensor={31}
            estado={"Optima"}
            icono={require("../../assets/icons/temperatura.png")}
          />
          <SensorData
            nombreSensor={"Humedad"}
            datoSensor={30}
            estado={"Optima"}
            icono={require("../../assets/icons/humedad.png")}
          />
        </View>
        <View>
          <SensorData
            nombreSensor={"Peso"}
            datoSensor={31}
            estado={"Optimo"}
            icono={require("../../assets/icons/balanza.png")}
          />
          <SensorData
            nombreSensor={"Sonido"}
            datoSensor={31}
            estado={"Reina presente"}
            icono={require("../../assets/icons/sonido.png")}
          />
        </View>
        <View>
          <Text>Sobre esta colmena...</Text>
          <View>
            <Image
              source={require("../../assets/images/colmena.jpg")}
              style={{ width: 157, height: 125 }}
            />
          </View>
          <View>
            <Text style={{ fontSize: 10 }}>
              La colmena presenta datos óptimos en todas las áreas sensorizadas,
              su peso indica la posibilidad de extracción de miel, su
              temperatura es óptima, al igual que la humedad y el sonido interno
              asegura la presencia de su abeja reina.
            </Text>
            <TouchableOpacity>
              <Text>Descargar reporte</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <Navbar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default Dashboard;
