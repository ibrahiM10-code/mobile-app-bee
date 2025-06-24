import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const DatoRegistrado = ({ fechaRegistro, valorRegistrado }) => {
  return (
    <SafeAreaView style={{}}>
      <View style={styles.registros}>
        <Text
          style={{
            fontFamily: "Manrope-SemiBold",
            color: "#222A2A",
            fontSize: 13,
          }}
        >
          {fechaRegistro}
        </Text>
        <Text
          style={{
            fontFamily: "Manrope-SemiBold",
            color: "#222A2A",
            fontSize: 13,
          }}
        >
          {valorRegistrado}
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  registros: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: -2,
    right: 13,
  },
});

export default DatoRegistrado;
