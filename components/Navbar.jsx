import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const navItems = [
  {
    label: "Colmenas",
    icon: "🍯",
    onPress: () => {
      router.push("/colmenas");
    },
  },
  {
    label: "Alertas",
    icon: "🔔",
    onPress: () => {
      router.push("/alertas");
    },
  },
  {
    label: "Historial Reportes",
    icon: "📄",
    onPress: () => {
      router.push("/reportes");
    },
  },
  {
    label: "Salir",
    icon: "🚪",
    onPress: () => {
      router.push("/logout");
    },
  },
];

const Navbar = () => (
  <View style={styles.navbar}>
    {navItems.map((item) => (
      <TouchableOpacity
        key={item.label}
        style={styles.button}
        onPress={item.onPress}
        activeOpacity={0.7}
      >
        <Text style={styles.icon}>{item.icon}</Text>
        <Text style={styles.label}>{item.label}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

const styles = StyleSheet.create({
  navbar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 64,
    backgroundColor: "#222A2A",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    zIndex: 1000,
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    fontSize: 22,
    marginBottom: 2,
  },
  label: {
    fontSize: 10,
    color: "#E1D9C1",
    alignSelf: "center",
    fontFamily: "Manrope-Bold",
  },
});

export default Navbar;
