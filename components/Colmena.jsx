import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Colmena = ({
  nombreColmena,
  tempColmena,
  humColmena,
  pesoColmena,
  sonidoColmena,
  imgColmena,
  estado,
  idColmena,
}) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.colmenaContainer}>
        <Image source={imgColmena} style={styles.imagenColmena} />
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontFamily: "Manrope-Bold",
              fontSize: 10,
              alignSelf: "flex-end",
            }}
          >
            Estado: {estado}.
          </Text>
          <Text
            style={{
              fontFamily: "Manrope-Bold",
              fontSize: 14,
              alignSelf: "flex-start",
              bottom: 10,
              color: "#222A2A",
            }}
          >
            {nombreColmena}
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ alignSelf: "center" }}>
              <Image
                source={require("../assets/icons/temperatura.png")}
                style={{
                  width: 25,
                  height: 25,
                  resizeMode: "contain",
                }}
              />
              <Text
                style={{
                  fontFamily: "Manrope-Regular",
                  fontSize: 13,
                  left: 5,
                  color: "#222A2A",
                }}
              >
                {tempColmena}°
              </Text>
            </View>
            <View>
              <Image
                source={require("../assets/icons/humedad.png")}
                style={styles.icon}
              />
              <Text
                style={{
                  fontFamily: "Manrope-Regular",
                  fontSize: 13,
                  alignSelf: "center",
                  color: "#222A2A",
                }}
              >
                {humColmena}%
              </Text>
            </View>
            <View>
              <Image
                source={require("../assets/icons/balanza.png")}
                style={styles.icon}
              />
              <Text
                style={{
                  fontFamily: "Manrope-Regular",
                  fontSize: 13,
                  alignSelf: "center",
                  color: "#222A2A",
                }}
              >
                {pesoColmena}kg
              </Text>
            </View>
            <View>
              <Image
                source={require("../assets/icons/sonido.png")}
                style={styles.icon}
              />
              <Text
                style={{
                  fontFamily: "Manrope-Regular",
                  fontSize: 13,
                  alignSelf: "center",
                  color: "#222A2A",
                }}
              >
                {sonidoColmena}Hz
              </Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  colmenaContainer: {
    backgroundColor: "#F39005",
    flexDirection: "row",
    borderRadius: 5,
    alignItems: "flex-start",
    gap: 15,
    padding: 10,
    marginBottom: -15,
    borderColor: "#222A2A",
    borderWidth: 1,
  },
  imagenColmena: {
    width: 70,
    height: 70,
    resizeMode: "contain",
    marginTop: 4,
    borderRadius: 5,
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    marginTop: 4,
  },
});

export default Colmena;
