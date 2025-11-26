import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FlatList, Text, ToastAndroid } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Alerta from "../../components/Alerta";
import Cargando from "../../components/Cargando";
import Navbar from "../../components/Navbar";
import TopBar from "../../components/TopBar";
import AuthContext from "../../context/AuthProvider";
import { API_URL } from "../../helpers/apiUrl";

const SeccionAlertas = () => {
  const { config, userId, userToken } = useContext(AuthContext);
  const [alertas, setAlertas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAlertas = async () => {
      try {
        if (!userId || !userToken) return;
        const response = await axios.get(
          `${API_URL}/alertas/obtener-alertas-apicultor/${userId}`,
          config
        );
        if (response.status === 200) {
          console.log("Alertas encontradas:", response.data);
          setAlertas(response.data);
        } if (response.status === 204) {
          ToastAndroid.show("No hay alertas para mostrar.", ToastAndroid.SHORT);
          setAlertas([]);
        }
      } catch (error) {
        console.error("Error fetching alert data:", error);
      } finally {
        setLoading(false);
      }
    };
    getAlertas();
  }, [config, userId]);

  const getCantidadPendientes = alertas.filter((alerta, idx) => alerta.estado_alerta === "pendiente")
  

  return (
    <SafeAreaView style={{ backgroundColor: "#E1D9C1", flex: 1 }}>
      <TopBar />
      {
        getCantidadPendientes.length > 0 ? 
        (
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
        ) : (
            <Text
            style={{
              fontFamily: "Manrope-Bold",
              fontSize: 22,
              marginTop: 30,
              marginHorizontal: 20,
              color: "#222A2A",
            }}
          >
            No hay alertas en este momento.
          </Text>
        )
      }
      {loading ? (
        <Cargando contenidoCargando={"alertas"} />
      ) : (
        <FlatList
          data={alertas}
          renderItem={({ item }) => {
            if (item.estado_alerta === "resuelta") return null;
            return (
              <Alerta
                fechaAlerta={item.fecha}
                tituloAlerta={item.titulo}
                descAlerta={item.descripcion}
                imgAlerta={""}
                tipoAlerta={item.tipo_alerta}
                idColmena={item.colmena_id}
                key={item._id}
              />
            );
          }}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingBottom: 100,
          }}
        />
      )}
      <Navbar />
    </SafeAreaView>
  );
};

export default SeccionAlertas;
