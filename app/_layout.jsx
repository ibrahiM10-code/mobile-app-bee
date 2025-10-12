import { useFonts } from "expo-font";
import * as Notifications from "expo-notifications";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { AuthProvider } from "../context/AuthProvider";
import NotificationsProvider from "../context/NotificationsProvider";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

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

  return (
    <AuthProvider>
      <NotificationsProvider>
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
      </NotificationsProvider>
    </AuthProvider>
  );
};

export default RootLayout;
