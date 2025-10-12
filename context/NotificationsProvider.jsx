import axios from "axios";
import * as Notifications from "expo-notifications";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { API_URL } from "../helpers/apiUrl";
import registerForPushNotificationsAsync from "../utils/registerForPushNotifications";
import AuthContext from "./AuthProvider";

const NotificationsContext = createContext();

export default function NotificationsProvider({ children }) {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef(null);
  const responseListener = useRef(null);
  const { userId, config } = useContext(AuthContext);

  useEffect(() => {
    if (!userId) {
      console.log("Waiting for User ID");
      return;
    }
    const setupNotifications = async () => {
      console.log("Push token config:", config);
      const token = await registerForPushNotificationsAsync();
      if (token) {
        setExpoPushToken(token);
        try {
          console.log("TOKEN: ", token);
          const data = { userId, expoPushToken: token };
          console.log("DATA:", data);
          const response = await axios.post(
            `${API_URL}/auth/registra-expo-push-token`,
            data,
            config
          );
          console.log("PASSED REQUEST!");
          if (response.status === 200) {
            console.log(response);
          } else {
            console.log("Error ha sucedido.");
          }
        } catch (error) {
          console.error("ERROR:", error);
        }
      }
      notificationListener.current =
        Notifications.addNotificationReceivedListener((notification) => {
          setNotification(notification);
        });

      responseListener.current =
        Notifications.addNotificationResponseReceivedListener((response) => {
          console.log(response);
        });
    };

    setupNotifications();

    return () => {
      if (notificationListener.current) {
        notificationListener.current.remove();
      }
      if (responseListener.current) {
        responseListener.current.remove();
      }
    };
  }, [userId, config]);

  return (
    <NotificationsContext.Provider value={{ expoPushToken, notification }}>
      {children}
    </NotificationsContext.Provider>
  );
}
