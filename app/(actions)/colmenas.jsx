import axios from "axios";
import { router } from "expo-router";
import { useContext, useEffect, useState } from "react";
import {
  FlatList,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Colmena from "../../components/Colmena";
import Navbar from "../../components/Navbar";
import TopBar from "../../components/TopBar";
import AuthContext from "../../context/AuthProvider";
import { API_URL } from "../../helpers/apiUrl";

const Colmenas = () => {
  const { userId, config, userToken } = useContext(AuthContext);
  const [colmena, setColmena] = useState(null);

  useEffect(() => {
    if (!userId || !userToken) return;
    const getDatosColmenas = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/colmenas/obtener-colmenas/${userId}`,
          config
        );
        if (response.status === 200) {
          setColmena(response.data);
        } else if (response.status === 204) {
          ToastAndroid.show(
            "No hay colmenas para mostrar.",
            ToastAndroid.SHORT
          );
          setColmena([]);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getDatosColmenas();
  }, [userId]);

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
        Mis colmenas
      </Text>
      <View style={{ width: "100%", height: "70%" }}>
        <FlatList
          data={colmena}
          renderItem={({ item }) => (
            <Colmena
              nombreColmena={item.nombre_colmena}
              tempColmena={item.temperatura || 0}
              humColmena={item.humedad || 0}
              pesoColmena={item.peso || 0}
              sonidoColmena={item.sonido || 0}
              estado={"Optimo"}
              imgColmena={
                item.foto_colmena && typeof item.foto_colmena_url === "string"
                  ? { uri: `${item.foto_colmena_url}` }
                  : require("../../assets/images/colmena.jpg")
              }
              nombreApiario={item.nombre_apiario}
              idColmena={item.colmena_id}
              key={item._id}
            />
          )}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{
            paddingHorizontal: 16,
          }}
          overScrollMode="never"
          showsVerticalScrollIndicator={false}
          ListFooterComponent={
            <TouchableOpacity
              style={{
                backgroundColor: "#222A2A",
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderRadius: 5,
                marginVertical: 40,
              }}
              onPress={() => {
                router.push("/prueba");
              }}
            >
              <Text
                style={{
                  color: "#E1D9C1",
                  textAlign: "center",
                  fontFamily: "Manrope-Bold",
                }}
              >
                Agregar Colmena
              </Text>
            </TouchableOpacity>
          }
        />
      </View>
      <Navbar />
    </SafeAreaView>
  );
};

export default Colmenas;
