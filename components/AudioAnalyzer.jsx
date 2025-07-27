import { Ionicons } from '@expo/vector-icons';
import { Audio } from "expo-av";
import * as DocumentPicker from "expo-document-picker";
import React, { useRef, useState } from "react";
import { ActivityIndicator, Alert, FlatList, Modal, Platform, Pressable, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../constants/Colors";

const API_URL = "https://api-abeja.onrender.com/predict";



const AudioAnalyzer = () => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] || Colors.light;
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState('');
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [selectedAudio, setSelectedAudio] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [audios, setAudios] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const soundRef = useRef(null);

  // Reproducir audio
  const playAudio = async (uri) => {
    try {
      setIsPlaying(true);
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
      }
      const { sound } = await Audio.Sound.createAsync({ uri });
      soundRef.current = sound;
      await sound.playAsync();
      sound.setOnPlaybackStatusUpdate((status) => {
        if (!status.isPlaying) setIsPlaying(false);
      });
    } catch (e) {
      setError("Error al reproducir el audio");
      setIsPlaying(false);
    }
  };

  // Seleccionar audio
  const pickAudio = async () => {
    setError(null);
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: "audio/*" });
      if (!result.canceled && result.assets && result.assets.length > 0) {
        setAudios((prev) => [...prev, { name: result.assets[0].name, uri: result.assets[0].uri, local: false }]);
        setModalVisible(false);
      }
    } catch (e) {
      setError("Error al seleccionar el audio");
    }
  };

  // Simulador de progreso de carga
  const simulateProgress = () => {
    const stages = [
      { stage: "Preparando archivo...", duration: 1000, progress: 20 },
      { stage: "Extrayendo características de audio...", duration: 3000, progress: 40 },
      { stage: "Procesando con modelo de IA...", duration: 4000, progress: 70 },
      { stage: "Calculando probabilidades...", duration: 2000, progress: 90 },
      { stage: "Finalizando análisis...", duration: 1000, progress: 100 }
    ];

    let currentStageIndex = 0;
    
    const processStage = () => {
      if (currentStageIndex < stages.length) {
        const currentStage = stages[currentStageIndex];
        setLoadingStage(currentStage.stage);
        setProgress(currentStage.progress);
        
        setTimeout(() => {
          currentStageIndex++;
          processStage();
        }, currentStage.duration);
      }
    };

    processStage();
  };

  // Enviar audio
  const sendAudio = async () => {
    if (!selectedAudio) {
      setError("Primero selecciona un audio de la lista");
      return;
    }
    
    setLoading(true);
    setError(null);
    setResult(null);
    setProgress(0);
    setLoadingStage("Iniciando análisis...");
    
    // Iniciar simulador de progreso
    simulateProgress();
    
    try {
      const formData = new FormData();
      formData.append("file", {
        uri: selectedAudio.uri,
        name: selectedAudio.name,
        type: "audio/wav",
      });
      
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });
      
      const json = await response.json();
      
      // Asegurar que el progreso llegue al 100%
      setProgress(100);
      setLoadingStage("¡Análisis completado!");
      
      // Pequeño delay para mostrar el mensaje de completado
      setTimeout(() => {
        setResult(json);
        setLoading(false);
        setLoadingStage('');
        setProgress(0);
      }, 500);
      
    } catch (e) {
      setError("Error al enviar el audio");
      setLoading(false);
      setLoadingStage('');
      setProgress(0);
    }
  };

  // Componente de barra de progreso
  const ProgressBar = ({ progress }) => (
    <View style={styles.progressContainer}>
      <View style={[styles.progressBar, { backgroundColor: theme.tabIconDefault }]}>
        <View 
          style={[
            styles.progressFill, 
            { 
              width: `${progress}%`, 
              backgroundColor: theme.tint 
            }
          ]} 
        />
      </View>
      <Text style={[styles.progressText, { color: theme.text }]}>
        {progress}%
      </Text>
    </View>
  );

  const renderAudioItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.audioItem, selectedAudio?.uri === item.uri && { borderColor: theme.tint, borderWidth: 2 }]}
      onPress={() => setSelectedAudio(item)}
      onLongPress={() => playAudio(item.uri)}
      disabled={isPlaying}
    >
      <Ionicons name="musical-notes" size={24} color={theme.icon} style={{ marginRight: 10 }} />
      <Text style={{ color: theme.text, flex: 1 }}>{item.name}</Text>
      {selectedAudio?.uri === item.uri && <Ionicons name="checkmark-circle" size={20} color={theme.tint} />}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>  
      <Text style={[styles.title, { color: theme.text }]}>Analizador de Audio</Text>
      
      <FlatList
        data={[...audios, { addButton: true }]}
        keyExtractor={(item, idx) => item.addButton ? 'add' : item.uri + idx}
        renderItem={({ item }) =>
          item.addButton ? (
            <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
              <Ionicons name="add-circle" size={36} color={theme.tint} />
              <Text style={{ color: theme.tint, marginLeft: 8, fontFamily: "Manrope-Bold" }}>Agregar audio</Text>
            </TouchableOpacity>
          ) : (
            renderAudioItem({ item })
          )
        }
        style={{ width: '100%', maxWidth: 400 }}
        contentContainerStyle={{ gap: 8, paddingBottom: 16 }}
      />
      
      <TouchableOpacity
        style={[
          styles.sendButton, 
          { 
            backgroundColor: loading ? theme.tabIconDefault : theme.icon,
            opacity: loading || !selectedAudio ? 0.6 : 1
          }
        ]}
        onPress={sendAudio}
        disabled={loading || !selectedAudio}
      >
        <Text style={{ color: theme.background, fontFamily: "Manrope-Bold" }}>
          {loading ? "Analizando..." : "Analizar audio"}
        </Text>
      </TouchableOpacity>
      
      {selectedAudio && !loading && (
        <Text style={{ color: theme.text, marginTop: 10, fontSize: 12 }}>
          Audio seleccionado: {selectedAudio.name}
        </Text>
      )}
      
      {/* Indicador de progreso mejorado */}
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color={theme.tint} style={{ marginBottom: 10 }} size="large" />
          <Text style={[styles.loadingStage, { color: theme.text }]}>
            {loadingStage}
          </Text>
          <ProgressBar progress={progress} />
          <Text style={[styles.loadingHint, { color: theme.tabIconDefault }]}>
            Este proceso puede tomar hasta 5 minutos
          </Text>
        </View>
      )}
      
      {error && (
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={24} color="red" style={{ marginRight: 8 }} />
          <Text style={{ color: "red", flex: 1 }}>{error}</Text>
        </View>
      )}
      
      {result && (
        <View style={[styles.resultBox, { backgroundColor: theme.tabIconDefault }]}>
          <View style={styles.resultHeader}>
            <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
            <Text style={{ color: theme.text, fontFamily: "Manrope-Bold", fontSize: 16, marginLeft: 8 }}>
              Resultado del Análisis
            </Text>
          </View>
          
          {result.error ? (
            <Text style={{ color: "red", fontFamily: "Manrope-Regular", fontSize: 14, marginTop: 8 }}>
              Error: {result.error}
            </Text>
          ) : (
            <View style={styles.resultContent}>
              <View style={styles.predictionRow}>
                <Text style={{ color: theme.text, fontFamily: "Manrope-Bold", fontSize: 18 }}>
                  {result.prediccion}
                </Text>

              </View>
              
              <View style={styles.probabilitiesContainer}>
                <View style={styles.probabilityItem}>
                  <Text style={{ color: theme.text, fontFamily: "Manrope-Regular" }}>
                    Con reina: {(result.probabilidad_con_reina * 100).toFixed(1)}%
                  </Text>
                </View>
                <View style={styles.probabilityItem}>
                  <Text style={{ color: theme.text, fontFamily: "Manrope-Regular" }}>
                    Sin reina: {(result.probabilidad_sin_reina * 100).toFixed(1)}%
                  </Text>
                </View>
              </View>
            </View>
          )}
        </View>
      )}
      
      {/* Modal simplificado solo para seleccionar archivo */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
          <View style={[styles.modalBox, { backgroundColor: theme.background }]}>  
            <Text style={{ color: theme.text, fontFamily: "Manrope-Bold", fontSize: 18, marginBottom: 16 }}>
              Seleccionar audio
            </Text>
            <TouchableOpacity style={styles.modalButton} onPress={pickAudio}>
              <Ionicons name="document" size={24} color={theme.icon} style={{ marginRight: 8 }} />
              <Text style={{ color: theme.text }}>Seleccionar archivo de audio</Text>
            </TouchableOpacity>
            <Text style={[styles.modalHint, { color: theme.tabIconDefault }]}>
              Formatos soportados: WAV, MP3, FLAC, OGG, M4A
            </Text>
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontFamily: "Manrope-Bold",
    marginBottom: 24,
  },
  audioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222',
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 4,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#111',
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 4,
    marginTop: 8,
  },
  sendButton: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginTop: 10,
  },
  loadingContainer: {
    marginTop: 20,
    alignItems: 'center',
    width: '100%',
    maxWidth: 350,
  },
  loadingStage: {
    fontSize: 14,
    fontFamily: "Manrope-Regular",
    marginBottom: 10,
    textAlign: 'center',
  },
  loadingHint: {
    fontSize: 12,
    fontFamily: "Manrope-Regular",
    marginTop: 8,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  progressContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  progressBar: {
    width: '100%',
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
    transition: 'width 0.3s ease',
  },
  progressText: {
    fontSize: 12,
    fontFamily: "Manrope-Bold",
    marginTop: 4,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    padding: 12,
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
    borderRadius: 8,
    width: '100%',
    maxWidth: 350,
  },
  resultBox: {
    marginTop: 24,
    borderRadius: 8,
    padding: 16,
    width: "100%",
    maxWidth: 350,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  resultContent: {
    gap: 12,
  },
  predictionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  confidenceBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  probabilitiesContainer: {
    gap: 6,
  },
  probabilityItem: {
    paddingVertical: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    borderRadius: 12,
    padding: 24,
    minWidth: 280,
    alignItems: 'center',
  },
  modalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    width: 240,
    justifyContent: 'center',
  },
  modalHint: {
    fontSize: 12,
    fontFamily: "Manrope-Regular",
    textAlign: 'center',
    marginTop: 12,
    maxWidth: 220,
  },
});

export default AudioAnalyzer;