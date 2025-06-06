import { Image, StyleSheet, Text, View } from "react-native";

const TopBar = () => {
  return (
    <View>
      <View>
        <Image
          source={require("../assets/icons/colmena.png")}
          style={{ width: 37 }}
        />
        <Text style={{ fontSize: 24 }}>Monitor Beehive</Text>
        <Image
          source={require("../assets/icons/usuario.png")}
          style={{ width: 44 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default TopBar;
