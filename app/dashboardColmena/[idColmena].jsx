import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import { useContext, useEffect, useState } from "react";
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
import SensorData from "../../components/SensorData";
import TopBar from "../../components/TopBar";
import AuthContext from "../../context/AuthProvider";

const Dashboard = () => {
  const [datosSensores, setDatosSensores] = useState([]);
  const { config } = useContext(AuthContext);
  const { idColmena } = useLocalSearchParams();

  useEffect(() => {
    const getDatosSensores = async () => {
      try {
        const response = await axios.get(
          `http://192.168.0.9:5000/sensores/obtener-sensores/${idColmena}`,
          config
        );
        console.log("Datos de sensores:", response.data);
        setDatosSensores(response.data[0]);
      } catch (error) {
        console.error("Error fetching sensor data:", error);
      }
    };

    getDatosSensores();
  }, [config, idColmena]);

  // Simulate alerts state (replace with real logic as needed)
  const hasAlerts = false; // Change to true to test "There are alerts"

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#E1D9C1" }}>
      <TopBar />
      <ScrollView
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {/* Alerts Row */}
        <View
          style={{
            position: "absolute",
            top: 20,
            zIndex: 1,
            right: 20,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            paddingHorizontal: 20,
            marginTop: 16,
            marginBottom: 8,
            gap: 12,
          }}
        >
          <Text
            style={{
              fontFamily: "Manrope-Bold",
              fontSize: 14,
              color: hasAlerts ? "#222A2A" : "#E1D9C1",
              backgroundColor: hasAlerts ? "#F39005" : "#222A2A",
              borderColor: hasAlerts ? "#222A2A" : "#E1D9C1",
              left: 5,
              paddingVertical: 5,
              paddingHorizontal: 20,
              borderRadius: 20,
            }}
          >
            {hasAlerts ? "Revisa las alertas!" : "Todo en orden"}
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: hasAlerts ? "#F39005" : "#222A2A",
              borderColor: hasAlerts ? "#222A2A" : "#E1D9C1",
              paddingVertical: 8,
              paddingHorizontal: 16,
              borderRadius: "50%",
              height: 50,
              width: 50,
              flexDirection: "row",
              alignItems: "center",
            }}
            onPress={() => {
              router.push("/alertasIndividuales/[idColmenaAlerta]");
            }}
          >
            <Text style={{ fontSize: 15 }}>🔔</Text>
          </TouchableOpacity>
        </View>

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
            marginTop: -200,
            zIndex: 1,
          }}
        >
          <SensorData
            nombreSensor={"Temperatura"}
            datoSensor={datosSensores.temperatura || 0}
            estado={"Óptima"}
            metrica={"°"}
            icono={require("../../assets/icons/temperatura.png")}
          />
          <SensorData
            nombreSensor={"Humedad"}
            datoSensor={datosSensores.humedad || 0}
            estado={"Óptima"}
            metrica={"%"}
            icono={require("../../assets/icons/humedad.png")}
          />

          <SensorData
            nombreSensor={"Peso"}
            datoSensor={datosSensores.peso || 0}
            estado={"Óptimo"}
            metrica={"kg"}
            icono={require("../../assets/icons/balanza.png")}
          />
          <SensorData
            nombreSensor={"Sonido"}
            datoSensor={datosSensores.sonido || 0}
            estado={"Reina presente"}
            metrica={"Hz"}
            icono={require("../../assets/icons/sonido.png")}
          />
        </View>
        <Text
          style={{
            fontSize: 24,
            marginBottom: 16,
            paddingHorizontal: 20,
            paddingTop: 30,
            fontFamily: "Manrope-SemiBold",
          }}
        >
          Sobre esta colmena...
        </Text>
        <View style={styles.sobreColmena}>
          <View>
            <Image
              source={require("../../assets/images/colmena.jpg")}
              style={{
                width: 137,
                height: 105,
                borderRadius: 5,
                resizeMode: "cover",
              }}
            />
          </View>
          <View style={styles.reporteColmena}>
            <Text
              style={{
                fontFamily: "Manrope-Regular",
                fontSize: 10,
                width: "16%",
              }}
            >
              La colmena presenta datos óptimos en todas las áreas sensorizadas,
              su peso indica la posibilidad de extracción de miel, su
              temperatura es óptima, al igual que la humedad y el sonido interno
              asegura la presencia de su abeja reina.
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: "#222A2A",
                top: 10,
                maxWidth: "100%",
                alignSelf: "flex-start",
                paddingVertical: 7,
                paddingHorizontal: 10,
                borderRadius: 5,
              }}
            >
              <Text style={{ fontFamily: "Manrope-Bold", color: "#E1D9C1" }}>
                Descargar reporte
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <Navbar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sobreColmena: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    flexDirection: "row",
    alignItems: "center",
    gap: 32,
  },
});

export default Dashboard;
