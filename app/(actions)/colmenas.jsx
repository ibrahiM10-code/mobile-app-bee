import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Navbar from "../../components/Navbar";
import TopBar from "../../components/TopBar";

const Colmenas = () => {
  return (
    <SafeAreaView>
      <TopBar />
      <Text>Mis colmenas</Text>
      <View>
        <FlatList />
      </View>
      <Navbar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default Colmenas;
