// src/context/AuthContext.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null); // puedes guardar info del usuario
  const [userToken, setUserToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar token almacenado al inicio
  useEffect(() => {
    const loadToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("token");
        const userId = await AsyncStorage.getItem("userId");
        if (storedToken) setUserToken(storedToken);
        if (userId) setUserId({ id: userId });
      } catch (error) {
        console.error("Error loading token:", error);
      }
    };
    loadToken();
  }, []);

  const setUser = async (userId) => {
    try {
      await AsyncStorage.setItem("userId", JSON.stringify(userId));
      setUserId(userId);
    } catch (error) {
      console.error("Error saving userId:", error);
    }
  };

  const setToken = async (token) => {
    try {
      await AsyncStorage.setItem("token", token);
      setUserToken(token);
    } catch (error) {
      console.error("Error saving token:", error);
    }
  };

  const config = { headers: { Authorization: `Bearer ${userToken}` } };
  const value = {
    userToken,
    userId,
    setUser,
    setToken,
    setUserToken,
    setUserId,
    config,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
