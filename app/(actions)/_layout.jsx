import { Stack } from "expo-router";

const AccionesLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="alertas" options={{ headerShown: false }} />
      <Stack.Screen name="colmenas" options={{ headerShown: false }} />
      <Stack.Screen name="registro" options={{ headerShown: false }} />
      <Stack.Screen name="agregar-colmena" options={{ headerShown: false }} />
      <Stack.Screen name="reportes" options={{ headerShown: false }} />
    </Stack>
  );
};

export default AccionesLayout;
