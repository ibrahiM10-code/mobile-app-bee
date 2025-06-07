import { Image, StyleSheet, Text, View } from "react-native";

const Navbar = () => {
  return (
    <View style={styles.backContainer}>
      <View>
        <Image source={require("../assets/icons/hogar.png")} width={36} />
        <Text style={{ fontSize: 10 }}>Inicio</Text>
      </View>
      <View>
        <Image source={require("../assets/icons/documento.png")} width={34} />
        <Text style={{ fontSize: 10 }}>Historial de reportes</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backContainer: {
    backgroundColor: "grey",
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
  },
});

export default Navbar;
