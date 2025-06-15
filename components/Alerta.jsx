import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const Alerta = ({
  fechaAlerta,
  tituloAlerta,
  descAlerta,
  idColmena,
  imgAlerta,
}) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <Text
          style={{
            fontFamily: "Manrope-Bold",
            fontSize: 18,
            marginVertical: 10,
            color: "#222A2A",
          }}
        >
          {fechaAlerta}
        </Text>
        <View style={styles.alertaContainer}>
          <Image source={imgAlerta} style={styles.icon} />
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontFamily: "Manrope-Bold",
                color: "#E1D9C1",
                fontSize: 14,
              }}
            >
              {tituloAlerta}
            </Text>
            <Text
              style={{
                fontFamily: "Manrope-Regular",
                color: "#E1D9C1",
                fontSize: 12,
              }}
            >
              {descAlerta}
            </Text>
          </View>
          <TouchableOpacity style={{ alignSelf: "center" }}>
            <Text
              style={{
                fontFamily: "Manrope-Bold",
                fontSize: 14,
                textAlign: "center",
                color: "#E1D9C1",
              }}
            >
              Ver{"\n"}colmena
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  alertaContainer: {
    backgroundColor: "#6D7A79",
    flexDirection: "row",
    borderRadius: 5,
    alignItems: "flex-start",
    gap: 15,
    padding: 10,
    marginBottom: -50,
    borderWidth: 1,
    borderColor: "#222A2A",
  },
  icon: {
    width: 38,
    height: 38,
    resizeMode: "contain",
    marginTop: 4,
  },
});

export default Alerta;
