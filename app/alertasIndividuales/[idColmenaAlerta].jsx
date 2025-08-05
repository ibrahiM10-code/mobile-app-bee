import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AlertaParticular from "../../components/AlertaParticular";
import Navbar from "../../components/Navbar";
import TopBar from "../../components/TopBar";
import AuthContext from "../../context/AuthProvider";
import { API_URL } from "../../helpers/apiUrl";
import { formatFecha } from "../../helpers/formateaFecha";

const SeccionAlertas = () => {
  const { config } = useContext(AuthContext);
  const { idColmenaAlerta } = useLocalSearchParams();
  const [alertasColmena, setAlertasColmena] = useState([]);

  useEffect(() => {
    const getAlertasColmena = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/alertas/obtener-alertas-particular/${idColmenaAlerta}`,
          config
        );
        console.log("Alertas encontradas:", response.data);
        setAlertasColmena(response.data);
      } catch (error) {
        console.error("Error fetching alert data:", error);
      }
    };
    getAlertasColmena();
  }, [config, idColmenaAlerta]);

  const actualizarEstadoAlerta = (idAlerta, nuevoEstado) => {
    setAlertasColmena((prev) =>
      prev.map((alerta) =>
        alerta._id === idAlerta
          ? { ...alerta, estado_alerta: nuevoEstado }
          : alerta
      )
    );
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#E1D9C1", flex: 1 }}>
      <TopBar />

      <Text
        style={{
          fontFamily: "Manrope-Bold",
          fontSize: 28,
          marginTop: 30,
          marginHorizontal: 20,
          color: "#222A2A",
        }}
      >
        Últimas alertas
      </Text>
      <View style={{ height: "100%" }}>
        <FlatList
          data={alertasColmena.filter(
            (item) => item.estado_alerta !== "resuelta"
          )}
          renderItem={({ item }) => (
            <AlertaParticular
              fechaAlerta={formatFecha(item.fecha)}
              tituloAlerta={item.titulo_alerta}
              descAlerta={item.descripcion_alerta}
              //imgAlerta={item.imgAlerta}
              idColmena={item.colmena_id}
              idAlerta={item._id}
              tipoAlerta={item.tipo_alerta}
              estadoAlerta={item.estado_alerta}
              actualizarEstadoAlerta={actualizarEstadoAlerta}
              key={item._id}
            />
          )}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{
            paddingHorizontal: 16,
            bottom: 20,
          }}
        />
      </View>
      <Navbar />
    </SafeAreaView>
  );
};

export default SeccionAlertas;
