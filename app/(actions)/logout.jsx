import { router } from "expo-router";
import { useContext, useEffect } from "react";
import AuthContext from "../../context/AuthProvider";

const LogOut = () => {
  const { setToken, setUser } = useContext(AuthContext);

  useEffect(() => {
    const loggingOut = async () => {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("userId");
      setToken(null);
      setUser(null);
      router.push("/");
    };
    loggingOut();
  }, []);

  return <></>;
};

export default LogOut;
