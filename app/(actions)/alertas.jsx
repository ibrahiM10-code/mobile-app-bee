import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Alerta from "../../components/Alerta";
import Navbar from "../../components/Navbar";
import TopBar from "../../components/TopBar";
import AuthContext from "../../context/AuthProvider";
import { API_URL } from "../../helpers/apiUrl";
import { formatFecha } from "../../helpers/formateaFecha";

const SeccionAlertas = () => {
  const { config, userId } = useContext(AuthContext);
  const [alertas, setAlertas] = useState([]);

  useEffect(() => {
    const getAlertas = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/alertas/obtener-alertas-apicultor/${userId}`,
          config
        );
        if (response.status === 200) {
          console.log("Alertas encontradas:", response.data);
          setAlertas(response.data);
        } else if (response.status === 404) {
          console.log("No hay alertas para mostrar.");
        }
      } catch (error) {
        console.error("Error fetching alert data:", error);
      }
    };
    getAlertas();
  }, [config, userId]);

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
          data={alertas}
          renderItem={({ item }) => (
            <Alerta
              fechaAlerta={formatFecha(item.fecha)}
              tituloAlerta={item.titulo_alerta}
              descAlerta={item.descripcion_alerta}
              imgAlerta={""}
              tipoAlerta={item.tipo_alerta}
              idColmena={item.colmena_id}
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
