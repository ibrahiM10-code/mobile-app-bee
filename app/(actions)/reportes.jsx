import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import {
  Platform,
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Navbar from "../../components/Navbar";
import TarjetaReporte from "../../components/TarjetaReporte";
import TopBar from "../../components/TopBar";
import AuthContext from "../../context/AuthProvider";
import { API_URL } from "../../helpers/apiUrl";
// import descargarReporte from "../../helpers/descargarReporte";
import { formatFecha } from "../../helpers/formateaFecha";

const Reportes = () => {
  const [reportes, setReportes] = useState([]);
  const { config, userId, userToken } = useContext(AuthContext);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    const cargaReportes = async () => {
      try {
        if (!userId || !userToken) return;
        const response = await axios.get(
          `${API_URL}/reportes/reportes-colmenas/${userId}`,
          config
        );
        if (response.status === 200) {
          setReportes(response.data);
        } else if (response.status === 204) {
          ToastAndroid.show("No se encontraron reportes.", ToastAndroid.SHORT);
          setReportes([]);
        }
      } catch (error) {
        if (error.status === 500) {
          console.error("Error del servidor. Intente nuevamente mas tarde.");
        }
      }
    };
    cargaReportes();
  }, [userId, config]);

  // Hacer que muestre el nombre sola una vez.
  const options = reportes.map((reporte) => ({
    label: reporte.nombre_colmena,
    value: reporte.colmena_id,
  }));

  const newOptions = options.reduce((acc, current) => {
    const x = acc.find((item) => item.label === current.label);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);

  const buscarReporte = async (colmenaId, fechaElegida) => {
    const fechaFiltro = `${fechaElegida
      .getDate()
      .toString()
      .padStart(2, "0")}-${(fechaElegida.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${fechaElegida.getFullYear()}`;
    try {
      const response = await axios.get(
        `${API_URL}/reportes/filtrar-reportes/${colmenaId}/${fechaFiltro}`,
        config
      );
      if (response.status === 200) {
        console.log("Reporte encontrado:", response.data);
        setReportes(response.data);
      } else if (response.status === 204) {
        ToastAndroid.show(
          "No se encontraron reportes para la fecha seleccionada.",
          ToastAndroid.SHORT
        );
      }
    } catch (error) {
      if (error.status === 500) {
        console.error("Error al buscar el reporte:", error);
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#E1D9C1" }}>
      <TopBar />
      <View style={{ flexDirection: "row", alignItems: "center", padding: 16 }}>
        <View style={{ flex: 1, marginRight: 8 }}>
          <Text style={{ marginBottom: 4 }}>Fecha:</Text>
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: "#222A2A",
              borderRadius: 6,
              padding: 10,
              backgroundColor: "transparent",
            }}
            onPress={() => setShowDatePicker(true)}
          >
            <Text>
              {selectedDate
                ? selectedDate.toLocaleDateString()
                : "Elige una fecha"}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={(_, date) => {
                setShowDatePicker(false);
                if (date) setSelectedDate(date);
              }}
              timeZoneName={"America/Santiago"}
              locale="es-ES"
            />
          )}
        </View>
        <View style={{ flex: 1, marginLeft: 8 }}>
          <Text style={{ marginBottom: 4 }}>Colmena:</Text>
          <View
            style={{
              borderWidth: 1,
              borderColor: "#222A2A",
              borderRadius: 6,
              backgroundColor: "transparent",
              height: 40,
            }}
          >
            <Picker
              selectedValue={selectedOption}
              onValueChange={(itemValue) => setSelectedOption(itemValue)}
              style={{ width: "100%", bottom: 5 }}
            >
              <Picker.Item label="Selecciona una opción..." value="" />
              {newOptions.map((opt) => (
                <Picker.Item
                  key={opt.value}
                  label={opt.label}
                  value={opt.value}
                />
              ))}
            </Picker>
          </View>
        </View>
      </View>
      <View style={{ paddingHorizontal: 16, marginBottom: 8 }}>
        <TouchableOpacity
          style={{
            backgroundColor: "#222A2A",
            padding: 12,
            borderRadius: 6,
            alignItems: "center",
            opacity: selectedOption && selectedDate ? 1 : 0.5,
          }}
          disabled={!selectedOption || !selectedDate}
          onPress={() => buscarReporte(selectedOption, selectedDate)}
        >
          <Text style={{ color: "#E1D9C1", fontWeight: "bold" }}>
            Buscar reporte
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 80 }}>
        {reportes.map((reporte, idx) => (
          <TarjetaReporte
            key={idx}
            titulo={`Reporte del ${formatFecha(reporte.fecha_descarga)}`}
            nombreColmena={reporte.nombre_colmena}
            nombreApiario={reporte.nombre_apiario}
            fotoColmena={
              reporte.foto_colmena
                ? { uri: `${API_URL}/static/${reporte.foto_colmena}` }
                : require("../../assets/images/colmena.jpg")
            }
            onPress={() => console.log(newOptions)}
            // onPress={() =>
            //   descargarReporte(
            //     API_URL,
            //     reporte.colmena_id,
            //     config,
            //     userId,
            //     "",
            //     true,
            //     reporte.fecha_descarga
            //   )
            // }
          />
        ))}
      </ScrollView>
      <Navbar />
    </SafeAreaView>
  );
};

export default Reportes;
