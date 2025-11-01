import axios from "axios";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useContext, useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ModalObservaciones from "../../components/ModalObservaciones";
import Navbar from "../../components/Navbar";
import SensorData from "../../components/SensorData";
import TopBar from "../../components/TopBar";
import AuthContext from "../../context/AuthProvider";
import { API_URL } from "../../helpers/apiUrl";
import descargarReporte from "../../helpers/descargarReporte";

const Dashboard = () => {
  const [datosSensores, setDatosSensores] = useState([]);
  const [descEstado, setDescEstado] = useState([]);
  const [isAlerta, setIsAlerta] = useState(false);
  const { config, userId, userToken } = useContext(AuthContext);
  const { idColmena } = useLocalSearchParams();
  const [modalVisible, setModalVisible] = useState(false);

  const handleDescargaReporte = (selectedOptions) => {
    descargarReporte(
      API_URL,
      idColmena,
      config,
      userId,
      selectedOptions,
      false
    );
    setModalVisible(false);
  };

  useEffect(() => {
    const getDatosSensores = async () => {
      try {
        if (!userId || !userToken) return;
        const response = await axios.get(
          `${API_URL}/sensores/obtener-sensores/${idColmena}`,
          config
        );
        if (response.data && response.status === 200) {
          console.log("Datos de sensores:", response.data);
          setDatosSensores(response.data[0]);
        } else if (response.status === 404) {
          console.log("Este apicultor no tiene colmenas registradas.");
          setDatosSensores([]);
        }
      } catch (error) {
        if (error.status === 500) {
          console.error("Error fetching sensor data:", error);
        }
      }
    };
    getDatosSensores();
  }, [config, idColmena]);

  useEffect(() => {
    const getDescripcionColmena = async () => {
      try {
        if (!userId || !userToken) return;
        const response = await axios.get(
          `${API_URL}/reportes/descripcion-colmena/${idColmena}`,
          config
        );
        if (response.status === 200) {
          setDescEstado(response.data);
        } else if (response.status === 500) {
          console.log(
            "La colmena no cuenta con los datos suficientes para generar una descripción."
          );
        }
      } catch (error) {
        if (error.status === 500) {
          setDescEstado([]);
          console.error(
            "Error al obtener la descripción de la colmena:",
            error
          );
        }
      }
    };
    getDescripcionColmena();
  }, [config, idColmena]);

  useFocusEffect(
    useCallback(() => {
      const getAlertasColmena = async () => {
        try {
          if (!userId || !userToken) return;
          const response = await axios.get(
            `${API_URL}/alertas/obtener-alertas-particular/${idColmena}`,
            config
          );
          if (response.status === 200) {
            const hasAlerts = response.data.some(
              (alerta) => alerta.estado_alerta === "pendiente"
            );
            setIsAlerta(hasAlerts);
          } else if (response.status === 204) {
            console.log("Esta colmena no tiene alertas asociadas.");
          }
        } catch (error) {
          if (error.status === 500) {
            console.error("Error fetching alert data:", error);
          }
        }
      };
      getAlertasColmena();
    }, [config, idColmena])
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#E1D9C1" }}>
      <TopBar />
      <ScrollView
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
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
              color: isAlerta ? "#222A2A" : "#E1D9C1",
              backgroundColor: isAlerta ? "#F39005" : "#222A2A",
              borderColor: isAlerta ? "#222A2A" : "#E1D9C1",
              left: 5,
              paddingVertical: 5,
              paddingHorizontal: 20,
              borderRadius: 20,
            }}
          >
            {isAlerta ? "Revisa las alertas!" : "Todo en orden"}
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: isAlerta ? "#F39005" : "#222A2A",
              borderColor: isAlerta ? "#222A2A" : "#E1D9C1",
              paddingVertical: 8,
              paddingHorizontal: 16,
              borderRadius: "50%",
              height: 50,
              width: 50,
              flexDirection: "row",
              alignItems: "center",
            }}
            onPress={() => {
              router.push("/alertasIndividuales/" + idColmena);
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
            colmenaId={datosSensores.colmena_id}
          />
          <SensorData
            nombreSensor={"Humedad"}
            datoSensor={datosSensores.humedad || 0}
            estado={"Óptima"}
            metrica={"%"}
            icono={require("../../assets/icons/humedad.png")}
            colmenaId={datosSensores.colmena_id}
          />

          <SensorData
            nombreSensor={"Peso"}
            datoSensor={datosSensores.peso || 0}
            estado={"Óptimo"}
            metrica={"kg"}
            icono={require("../../assets/icons/balanza.png")}
            colmenaId={datosSensores.colmena_id}
          />
          <SensorData
            nombreSensor={"Sonido"}
            datoSensor={datosSensores.sonido || 0}
            estado={"Reina presente"}
            metrica={"Hz"}
            icono={require("../../assets/icons/sonido.png")}
            colmenaId={datosSensores.colmena_id}
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
                width: descEstado.descripcion ? "15%" : "70%",
              }}
            >
              {descEstado.descripcion ||
                "No hay descripción disponible por el momento."}
            </Text>
            {descEstado.descripcion && (
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
                onPress={() => setModalVisible(true)}
              >
                <Text style={{ fontFamily: "Manrope-Bold", color: "#E1D9C1" }}>
                  Descargar reporte
                </Text>
              </TouchableOpacity>
            )}
            <ModalObservaciones
              visible={modalVisible}
              onClose={() => setModalVisible(false)}
              onConfirm={handleDescargaReporte}
            />
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
