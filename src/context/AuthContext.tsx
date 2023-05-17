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
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "./FeedbackContext";

axios.defaults.headers.common[ "Content-Type" ] = "application/json";
axios.defaults.baseURL = HTTP.dev.BASE_URL;

interface Props {
  children?: ReactNode;
}

export const AuthContext = createContext<any>("");
function AuthProvider({ children }: Props) {
  const navigate = useNavigate()
  const { snackbar, setSnackbar } = useSnackbar()
  const [ authState, setAuthState ] = useState(
    AuthState.createFromString(localStorage.getItem("loggedUser") || "")
  );

  useEffect(() => {
    if (Object.keys(authState.headers).length === 0) return;
    getUser()
      .then((loggedUser) => {
        setAuthState((prev: any) => {
          return ({
            ...prev, userData: {
              ...prev.userData,
              ...loggedUser
            }
          });
        });
        localStorage.setItem("loggedUser", JSON.stringify(authState))
      })
      .catch((error) => {
        if (error.status == 403) navigate("/login")
        if (error.message === "No response received from the server") setSnackbar({ message: "Server is unreachable :c", severity: "error" })
      });
  }, [ authState.headers ]);

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext<{ authState: AuthState, setAuthState: React.Dispatch<React.SetStateAction<AuthState>> }>(AuthContext);
}

export default AuthProvider;
