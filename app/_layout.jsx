import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { AuthProvider } from "../context/AuthProvider";

const RootLayout = () => {
  SplashScreen.preventAutoHideAsync();
  const [fontsLoaded, error] = useFonts({
    "Manrope-Regular": require("../assets/fonts/Manrope-Regular.ttf"),
    "Manrope-Medium": require("../assets/fonts/Manrope-Medium.ttf"),
    "Manrope-SemiBold": require("../assets/fonts/Manrope-SemiBold.ttf"),
    "Manrope-Bold": require("../assets/fonts/Manrope-Bold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded || error) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) {
    return null;
  }

  // Rutas temporales
  // Cambios por hacer en el futuro: dashboard/id de colmena; alertas/id de colmena;
  // Rutas por agregar en el futuro: reportes, ajustes.
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(actions)" options={{ headerShown: false }} />
        <Stack.Screen
          name="sensor/[nombreSensor]"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="dashboardColmena/[idColmena]"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="alertasIndividuales/[idColmenaAlerta]"
          options={{ headerShown: false }}
        />
      </Stack>
    </AuthProvider>
  );
};

export default RootLayout;
