import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
  
const openPDF = async (fileUri) => {
    try {
      const disponible = await Sharing.isAvailableAsync();
      if (!disponible) {
        alert("No hay apps disponibles para abrir el PDF.");
        return;
      }
      await Sharing.shareAsync(fileUri, {
        mimeType: "application/pdf",
      });
    } catch (error) {
      console.error("Error sharing PDF:", error);
      alert("No se pudo abrir el PDF.");
    }
};

const descargarReporte = async (API_URL, colmenaId, config, userId) => {
    try {
      const url = `${API_URL}/reportes/obtener-reporte/${colmenaId}/${userId}`;
      const fecha = new Date();
      const fechaFormateada = fecha.toISOString().split("T")[0];
      const fileUri =
        FileSystem.documentDirectory +
        `reporte_${colmenaId}_${fechaFormateada}.pdf`;

      const response = await FileSystem.downloadAsync(url, fileUri, {
        headers: config.headers,
      });
      const fileInfo = await FileSystem.getInfoAsync(response.uri);
      if (!fileInfo.exists || fileInfo.size === 0) {
        alert("El archivo PDF no se descargó correctamente.");
        return;
      }
      openPDF(response.uri);
    } catch (error) {
      console.error("Error downloading report:", error);
    }
};

export default descargarReporte;