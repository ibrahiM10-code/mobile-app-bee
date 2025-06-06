import { Image, StyleSheet, Text, View } from "react-native";

const SensorData = ({ nombreSensor, datoSensor, estado, icono }) => {
  return (
    <View>
      <View>
        <Text>{nombreSensor}</Text>
        <Image source={icono} style={{ width: 18 }} />
      </View>
      <View>
        <Text style={{ fontSize: 36 }}>{datoSensor}</Text>
      </View>
      <View>
        <Text style={{ fontSize: 10 }}>{estado}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default SensorData;
