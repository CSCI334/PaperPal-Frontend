import axios from "axios";
import errorHandler from "./errorHandler";
import AuthState from "../types/AuthData";

// Get user, check if token is legit or not 
async function getUser() {
  try {
  // const { data } = await axios({ url: "/user" });
  // const data =  AuthState.createFromString(localStorage.getItem("loggedUser") || "")
  console.log("get user runned");

  } catch (error) {
    errorHandler(error);
  }
  const isExpired = false; 
    if (isExpired) {
      localStorage.removeItem("loggedUser");
      
    }
    const data =  AuthState.createFromString(localStorage.getItem("loggedUser") || "");
    console.log(data);
    return data;
}

export default getUser;
