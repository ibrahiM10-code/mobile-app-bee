import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Alerta = ({
  fechaAlerta,
  tituloAlerta,
  descAlerta,
  idColmena,
  imgAlerta,
}) => {
  return (
    <View>
      <Text style={{ fontSize: 18, marginVertical: 10 }}>{fechaAlerta}</Text>
      <View style={styles.alertaContainer}>
        <Image source={imgAlerta} style={styles.icon} />
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 14 }}>{tituloAlerta}</Text>
          <Text style={{ fontSize: 12 }}>{descAlerta}</Text>
        </View>
        <TouchableOpacity style={{ alignSelf: "center" }}>
          <Text
            style={{
              fontSize: 14,
              textAlign: "center",
              color: "black",
            }}
          >
            Ver{"\n"}colmena
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  alertaContainer: {
    backgroundColor: "gray",
    flexDirection: "row",
    borderRadius: 5,
    alignItems: "flex-start",
    gap: 15,
    padding: 10,
    marginBottom: 20,
  },
  icon: {
    width: 38,
    height: 38,
    resizeMode: "contain",
    marginTop: 4,
  },
});

export default Alerta;
