import { Alert, Platform } from "react-native";
import FileViewer from "react-native-file-viewer";
import RNFS from "react-native-fs";

const descargarReporte = async (API_URL, colmenaId, config, userId, filtro, fechaFiltro) => {
  let url = ""
  console.log(userId);
  try {
    if (filtro) {
      url = `${API_URL}/reportes/descargar-reporte/${colmenaId}/${fechaFiltro}`;
    } else {
      url = `${API_URL}/reportes/obtener-reporte/${colmenaId}/${userId}`;
    }
    console.log(url);
    const fecha = new Date();
    const fechaFormateada = fecha.toISOString().split("T")[0];
    const fileName = `reporte_${colmenaId}_${fechaFormateada}.pdf`;

    // Use a path in the app's document directory
    const filePath =
      Platform.OS === "android"
        ? `${RNFS.DownloadDirectoryPath}/${fileName}` // Save to Downloads on Android
        : `${RNFS.DocumentDirectoryPath}/${fileName}`; // Save to app's docs on iOS

    // Download the file
    const options = {
      fromUrl: url,
      toFile: filePath,
      headers: config.headers,
    };
    const downloadResult = await RNFS.downloadFile(options).promise;

    if (downloadResult.statusCode !== 200) {
      Alert.alert("Error", "No se pudo descargar el reporte.");
      return;
    }

    // Open the PDF with the default viewer
    await FileViewer.open(filePath, { showOpenWithDialog: true });
  } catch (error) {
    console.error("Error downloading or opening report:", error);
    Alert.alert("Error", "No se pudo descargar o abrir el reporte.");
  }
};

export default descargarReporte;