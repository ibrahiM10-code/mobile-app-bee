import { useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { observaciones } from "../helpers/observaciones";

const ModalObservaciones = ({ visible, onClose, onConfirm }) => {
  const [selectedOptions, setSelectedOptions] = useState(observaciones);

  const toggleOption = (option) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [option]: {
        ...prev[option],
        selected: !prev[option].selected,
      },
    }));
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>
            Selecciona las observaciones por agregar
          </Text>

          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
          >
            {Object.entries(selectedOptions).map(
              ([option, { text, selected }]) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.optionButton,
                    selected && styles.optionButtonSelected,
                  ]}
                  onPress={() => toggleOption(option)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      selected && styles.optionTextSelected,
                    ]}
                  >
                    {text}
                  </Text>
                </TouchableOpacity>
              )
            )}
          </ScrollView>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.confirmButton]}
              onPress={() => {
                const selected = Object.entries(selectedOptions)
                  .filter(([_, value]) => value.selected)
                  .map(([_, value]) => value.text);
                onConfirm(selected);
              }}
            >
              <Text style={styles.buttonText}>Descargar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
  },
  modalView: {
    backgroundColor: "#222A2A",
    borderRadius: 12,
    padding: 20,
    width: "100%",
    maxHeight: "80%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  scrollView: {
    width: "100%",
    marginVertical: 10,
  },
  modalTitle: {
    fontFamily: "Manrope-Bold",
    fontSize: 18,
    marginBottom: 10,
    color: "#E1D9C1",
    textAlign: "center",
  },
  optionButton: {
    width: "100%",
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    backgroundColor: "#E1D9C1",
    minHeight: 70,
  },
  optionButtonSelected: {
    backgroundColor: "#F39005",
  },
  optionText: {
    fontFamily: "Manrope-SemiBold",
    color: "#222A2A",
    textAlign: "left",
    fontSize: 14,
    lineHeight: 20,
  },
  optionTextSelected: {
    color: "#222A2A",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
    paddingTop: 10,
  },
  button: {
    padding: 12,
    borderRadius: 8,
    width: "48%",
  },
  buttonText: {
    fontFamily: "Manrope-Bold",
    color: "#E1D9C1",
    textAlign: "center",
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: "#222A2A",
    borderWidth: 1,
    borderColor: "#E1D9C1",
  },
  confirmButton: {
    backgroundColor: "#F39005",
    borderWidth: 1,
    borderColor: "#222A2A",
  },
});

export default ModalObservaciones;
