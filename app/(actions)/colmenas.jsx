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
  const { userId, userToken, config } = useContext(AuthContext);
  const [colmena, setColmena] = useState(null);

  useEffect(() => {
    const getDatosColmenas = async () => {
      try {
        const response = await axios.get(
          `http://192.168.0.10:5000/colmenas/obtener-colmenas/${userId}`,
          config
        );
        setColmena(response.data);
        console.log(colmena);
      } catch (error) {
        console.error(error);
      }
    };
    getDatosColmenas();
  }, []);

  const mockData = [
    {
      idColmena: 1,
      nombreColmena: "Colmena 1",
      tempColmena: 31,
      humColmena: 30,
      pesoColmena: 45,
      sonidoColmena: 450,
      estado: "Optimo",
      imgColmena: require("../../assets/images/colmena.jpg"),
    },

    {
      idColmena: 2,
      nombreColmena: "Colmena 2",
      tempColmena: 32,
      humColmena: 30,
      pesoColmena: 45,
      sonidoColmena: 450,
      estado: "Optimo",
      imgColmena: require("../../assets/images/colmena.jpg"),
    },

    {
      idColmena: 3,
      nombreColmena: "Colmena 3",
      tempColmena: 31,
      humColmena: 30,
      pesoColmena: 45,
      sonidoColmena: 450,
      estado: "Optimo",
      imgColmena: require("../../assets/images/colmena.jpg"),
    },

    {
      idColmena: 4,
      nombreColmena: "Colmena 4",
      tempColmena: 31,
      humColmena: 30,
      pesoColmena: 45,
      sonidoColmena: 450,
      estado: "Optimo",
      imgColmena: require("../../assets/images/colmena.jpg"),
    },
  ];
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
          data={mockData}
          renderItem={({ item }) => (
            <Colmena
              nombreColmena={item.nombreColmena}
              tempColmena={item.tempColmena}
              humColmena={item.humColmena}
              pesoColmena={item.pesoColmena}
              sonidoColmena={item.sonidoColmena}
              estado={item.estado}
              imgColmena={item.imgColmena}
              nombreApiario={item.nombreApiario}
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
