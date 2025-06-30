import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Navbar from "../../components/Navbar";
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
          <View key={report.id}>
            <View style={styles.card}>
              <Text style={styles.title}>{report.title}</Text>
              <Text style={styles.description}>{report.description}</Text>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Descargar de nuevo</Text>
              </TouchableOpacity>
            </View>
            {idx < reports.length - 1 && <View style={styles.divider} />}
          </View>
        ))}
      </ScrollView>
      <Navbar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#E1D9C1",
    borderRadius: 12,
    padding: 20,
    marginBottom: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#222A2A",
    marginHorizontal: 8,
  },
  title: {
    fontSize: 18,
    fontFamily: "Manrope-Bold",
    marginBottom: 8,
    color: "#222A2A",
    textAlign: "center",
  },
  description: {
    fontSize: 15,
    color: "#222A2A",
    marginBottom: 16,
    textAlign: "center",
    fontFamily: "Manrope-Regular",
  },
  button: {
    backgroundColor: "#222A2A",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "#E1D9C1",
    fontFamily: "Manrope-Bold",
    fontSize: 16,
  },
  divider: {
    height: 1,
    backgroundColor: "#222A2A",
    marginVertical: 30,
    marginHorizontal: 8,
  },
});

export default Reportes;
