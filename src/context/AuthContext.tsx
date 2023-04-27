import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import getUser from "../services/getUser";
import AuthState from "../types/AuthData";
import axios from "axios";
import { HTTP } from "../data/HttpConfig";

axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.baseURL = HTTP.dev.BASE_URL;

interface Props {
  children?: ReactNode;
}

const AuthContext = createContext<any>(AuthState.createFromString(""));
function AuthProvider({ children }: Props) {
  const [authState, setAuthState] = useState(
    AuthState.createFromString(localStorage.getItem("loggedUser") || "")
  );

  useEffect(() => {
    if (Object.keys(authState.headers).length === 0) return;

    axios.defaults.headers.common.Authorization =
      authState.headers.Authorization;
    getUser()
      .then((loggedUser) => {
        console.log(loggedUser);
        setAuthState((prev: any) => ({ ...prev, loggedUser }));
      })
      .catch(console.error);
  }, [authState.headers, setAuthState]);

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthProvider;
