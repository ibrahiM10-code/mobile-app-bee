import { Stack } from "expo-router";

const AccionesLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="alertas" options={{ headerShown: false }} />
      <Stack.Screen name="colmenas" options={{ headerShown: false }} />
      <Stack.Screen name="registro" options={{ headerShown: false }} />
      <Stack.Screen name="agregar-colmena" options={{ headerShown: false }} />
      <Stack.Screen name="reportes" options={{ headerShown: false }} />
      <Stack.Screen name="logout" options={{ headerShown: false }} />
      <Stack.Screen name="recuperar-clave" options={{ headerShown: false }} />
      <Stack.Screen name="ingresa-codigo" options={{ headerShown: false }} />
      <Stack.Screen name="nueva-clave" options={{ headerShown: false }} />
    </Stack>
  );
};

export default AccionesLayout;
