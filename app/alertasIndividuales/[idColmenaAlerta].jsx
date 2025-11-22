import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { FlatList, Text, ToastAndroid } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AlertaParticular from "../../components/AlertaParticular";
import Cargando from "../../components/Cargando";
import Navbar from "../../components/Navbar";
import TopBar from "../../components/TopBar";
import AuthContext from "../../context/AuthProvider";
import { API_URL } from "../../helpers/apiUrl";

const SeccionAlertas = () => {
  const { config, userId, userToken } = useContext(AuthContext);
  const { idColmenaAlerta } = useLocalSearchParams();
  const [alertasColmena, setAlertasColmena] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAlertasColmena = async () => {
      if (!userId || !userToken) return;
      try {
        const response = await axios.get(
          `${API_URL}/alertas/obtener-alertas-particular/${idColmenaAlerta}`,
          config
        );
        if (response.data && response.status === 200) {
          console.log("Alertas encontradas:", response.data);
          setAlertasColmena(response.data);
        } else if (response.status === 204) {
          ToastAndroid.show("No hay alertas para mostrar.", ToastAndroid.SHORT);
          setAlertasColmena([]);
        }
      } catch (error) {
        if (error.status === 500) {
          console.error("Error fetching alert data:", error);
        }
      } finally {
        setLoading(false);
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

  // alertasColmena.map((alerta) => console.log("fecha:", alerta.fecha));
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
      {loading ? (
        <Cargando contenidoCargando={"alertas"} />
      ) : (
        <FlatList
          data={alertasColmena.filter(
            (item) => item.estado_alerta !== "resuelta"
          )}
          renderItem={({ item }) => (
            <AlertaParticular
              fechaAlerta={item.fecha}
              tituloAlerta={item.titulo}
              descAlerta={item.descripcion}
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
            paddingBottom: 100,
          }}
          showsVerticalScrollIndicator={false}
        />
      )}
      <Navbar />
    </SafeAreaView>
  );
};

export default SeccionAlertas;
