import axios from "axios";
import { router } from "expo-router";
import { useContext, useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Colmena from "../../components/Colmena";
import Navbar from "../../components/Navbar";
import TopBar from "../../components/TopBar";
import AuthContext from "../../context/AuthProvider";

const Colmenas = () => {
  const { userId, config } = useContext(AuthContext);
  const [colmena, setColmena] = useState(null);

  useEffect(() => {
    if (!userId) return;
    const getDatosColmenas = async () => {
      try {
        const response = await axios.get(
          `http://192.168.0.9:5000/colmenas/obtener-colmenas/${userId}`,
          config
        );
        setColmena(response.data);
        console.log(response.data);
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
              tempColmena={0}
              humColmena={0}
              pesoColmena={0}
              sonidoColmena={0}
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
          keyExtractor={(item) => item.idColmena}
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
                router.push("/agregar-colmena");
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

const styles = StyleSheet.create({});

export default Colmenas;
