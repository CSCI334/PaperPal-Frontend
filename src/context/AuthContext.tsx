import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import getUser from "../services/account/getUser";
import AuthState from "../types/AuthData";
import axios from "axios";
import { HTTP } from "../data/HttpConfig";

axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.baseURL = HTTP.dev.BASE_URL;

interface Props {
  children?: ReactNode;
}

export const AuthContext = createContext<any>("");
function AuthProvider({ children }: Props) {
  const [authState, setAuthState] = useState(
    AuthState.createFromString(localStorage.getItem("loggedUser") || "")
  );
    
  useEffect(() => {
    if (Object.keys(authState.headers).length === 0) return;
    axios.defaults.headers.common.Authorization =
      `Bearer ${authState.headers.Authorization}`;
      
    getUser()
      .then((loggedUser) => {
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
  return useContext<{authState: AuthState, setAuthState:React.Dispatch<React.SetStateAction<AuthState>>}>(AuthContext);
}

export default AuthProvider;
