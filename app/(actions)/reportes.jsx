import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Navbar from "../../components/Navbar";
import TarjetaReporte from "../../components/TarjetaReporte";
import TopBar from "../../components/TopBar";

const Reportes = () => {
  const reports = [
    {
      id: 1,
      title: "Colmena 1 - Apiario 1",
      description: "Reporte del 11 de noviembre de 2025",
    },
    {
      id: 2,
      title: "Colmena 2 - Apiario 1",
      description: "Reporte del 07 de noviembre de 2025",
    },
    {
      id: 3,
      title: "Colmena 3 - Apiario 1",
      description: "Reporte del 14 de noviembre de 2025",
    },
    {
      id: 4,
      title: "Colmena 4 - Apiario 2",
      description: "Reporte del 29 de noviembre de 2025",
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#E1D9C1" }}>
      <TopBar />

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 80 }}>
        {reports.map((report, idx) => (
          <TarjetaReporte
            key={report.id}
            titulo={report.title}
            descripcion={report.description}
            onPress={() => console.log(`Descargando reporte ${report.id}`)}
            idx={idx}
          />
        ))}
      </ScrollView>
      <Navbar />
    </SafeAreaView>
  );
};

export default Reportes;
