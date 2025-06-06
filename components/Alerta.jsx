import { Image, StyleSheet, Text, View } from "react-native";

const Alerta = ({
  fechaAlerta,
  tituloAlerta,
  descAlerta,
  idColmena,
  imgAlerta,
}) => {
  return (
    <View>
      <Text>{fechaAlerta}</Text>
      <View>
        <Image source={imgAlerta} />
        <View>
          <Text>{tituloAlerta}</Text>
          <Text>{descAlerta}</Text>
        </View>
        <Text>Ver colmena</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Alerta;
