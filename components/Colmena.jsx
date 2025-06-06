import { Image, StyleSheet, Text, View } from "react-native";

const Colmenas = ({
  nombreColmena,
  tempColmena,
  humColmena,
  pesoColmena,
  sonidoColmena,
  imgColmena,
  estado,
  imgSensor,
}) => {
  return (
    <View>
      <Image source={imgColmena} />
      <View>
        <Text>{nombreColmena}</Text>
        <View>
          <Image source={imgSensor} />
          <Text>{tempColmena}</Text>
          <Image source={imgSensor} />
          <Text>{humColmena}</Text>
          <Image source={imgSensor} />
          <Text>{pesoColmena}</Text>
          <Image source={imgSensor} />
          <Text>{sonidoColmena}</Text>
        </View>
        <Text>Estado: {estado}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Colmenas;
