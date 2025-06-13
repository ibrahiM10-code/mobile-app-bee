import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Inicio = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TouchableOpacity onPress={() => router.push("/dashboard")}>
          <Text style={{ color: "black" }}>Ver dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/alertas")}>
          <Text>Ver alertas</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/colmenas")}>
          <Text>Ver colmenas</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default Inicio;
