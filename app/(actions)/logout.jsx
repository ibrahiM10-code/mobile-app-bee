import { router } from "expo-router";
import { useContext, useEffect } from "react";
import AuthContext from "../../context/AuthProvider";

function LogOut() {
  const { setToken, setUser } = useContext(AuthContext);

  useEffect(async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("userId");
    setToken(null);
    setUser(null);
    router.push("/");
  }, []);

  return <></>;
}

export default LogOut;
