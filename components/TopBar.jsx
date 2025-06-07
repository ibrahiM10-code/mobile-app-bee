import { Image, StyleSheet, Text, View } from "react-native";

const TopBar = () => {
  return (
    <View style={styles.topContainer}>
      <View style={styles.topContentWrap}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginRight: 25,
          }}
        >
          <Image source={require("../assets/icons/colmena.png")} />
          <Text style={{ fontSize: 24, color: "white" }}>Monitor Beehive</Text>
        </View>
        <Image
          source={require("../assets/icons/usuario.png")}
          style={{
            resizeMode: "contain",
            width: 40,
            position: "absolute",
            right: 12,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    backgroundColor: "gray",
    paddingVertical: 8,
    position: "relative",
  },
  topContentWrap: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 60,
  },
});

export default TopBar;
