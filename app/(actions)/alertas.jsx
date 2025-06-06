import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Alerta from "../../components/Alerta";
import Navbar from "../../components/Navbar";
import TopBar from "../../components/TopBar";

const SeccionAlertas = () => {
  const mockData = [
    {
      fechaAlerta: "30 de Septiembre, 2025",
      tituloAlerta: "Temperatura baja",
      descAlerta:
        "La colmena 4 tiene una temperatura de 18 grados, se recomienda tomar accion",
      imgAlerta: require("../../assets/icons/advertencia.png"),
      idColmena: 1,
    },
    {
      fechaAlerta: "30 de Septiembre, 2025",
      tituloAlerta: "Humedad baja",
      descAlerta:
        "La colmena 4 tiene una humedad del 20%, se recomienda tomar accion",
      imgAlerta: require("../../assets/icons/advertencia.png"),
      idColmena: 2,
    },
    {
      fechaAlerta: "21 de Septiembre, 2025",
      tituloAlerta: "Temperatura ideal",
      descAlerta:
        "La colmena 4 tiene una temperatura de 30 grados, ideal para su bienestar.",
      imgAlerta: require("../../assets/icons/comprobado.png"),
      idColmena: 3,
    },
  ];

  return (
    <SafeAreaView>
      <TopBar />
      <Text>Ultimas alertas</Text>
      <View>
        <FlatList
          data={mockData}
          renderItem={({ item }) => <Alerta />}
          keyExtractor={(item) => item.id}
        />
      </View>
      <Navbar />
    </SafeAreaView>
  );
};

export default SeccionAlertas;
