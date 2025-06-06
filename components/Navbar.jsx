import { Image, StyleSheet, Text, View } from "react-native";

const Navbar = () => {
  return (
    <View>
      <View>
        <View>
          <Image
            source={require("../assets/icons/hogar.png")}
            style={{ width: 36 }}
          />
          <Text style={{ fontSize: 10 }}>Inicio</Text>
        </View>
        <View>
          <Image
            source={require("../assets/icons/documento.png")}
            style={{ width: 34 }}
          />
          <Text style={{ fontSize: 10 }}>Historial de reportes</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Navbar;
