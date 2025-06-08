import { Image, StyleSheet, Text, View } from "react-native";

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
    <View style={styles.colmenaContainer}>
      <Image source={imgColmena} style={styles.imagenColmena} />
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 10, alignSelf: "flex-end" }}>
          Estado: {estado}.
        </Text>
        <Text style={{ fontSize: 14, alignSelf: "flex-start", bottom: 10 }}>
          {nombreColmena}
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ alignSelf: "center" }}>
            <Image
              source={require("../assets/icons/temperatura.png")}
              style={{
                width: 25,
                height: 25,
                resizeMode: "contain",
              }}
            />
            <Text style={{ fontSize: 13, left: 5 }}>{tempColmena}°</Text>
          </View>
          <View>
            <Image
              source={require("../assets/icons/humedad.png")}
              style={styles.icon}
            />
            <Text style={{ fontSize: 13, alignSelf: "center" }}>
              {humColmena}%
            </Text>
          </View>
          <View>
            <Image
              source={require("../assets/icons/balanza.png")}
              style={styles.icon}
            />
            <Text style={{ fontSize: 13, alignSelf: "center" }}>
              {pesoColmena}kg
            </Text>
          </View>
          <View>
            <Image
              source={require("../assets/icons/sonido.png")}
              style={styles.icon}
            />
            <Text style={{ fontSize: 13, alignSelf: "center" }}>
              {sonidoColmena}Hz
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  colmenaContainer: {
    backgroundColor: "gray",
    flexDirection: "row",
    borderRadius: 5,
    alignItems: "flex-start",
    gap: 15,
    padding: 10,
    marginBottom: 20,
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
