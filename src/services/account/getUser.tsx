import axios from "axios";
import errorHandler from "../utility/errorHandler";
import AuthState from "../../types/AuthData";
import jwtDecode from "jwt-decode";

// Get user, check if token is legit or not 
async function getUser() {
  try {
    const {data} = await axios.get('/user');
    const jwtToken = data.token;
    // Decripting JWT token
    const decodedJWT:{} = jwtDecode(jwtToken);
    const loggedUser = {...decodedJWT, ...data};
    const authState = new AuthState(
      { Authorization: loggedUser.token },
      true,
      {
        email: loggedUser.email,
        userType: loggedUser.accountType,
        username: loggedUser.username,
      }
    );
    return authState;

  } catch (error) {
    errorHandler(error);
  }
  const isExpired = false; 
    if (isExpired) {
      localStorage.removeItem("loggedUser");
      
    }
    const data =  AuthState.createFromString(localStorage.getItem("loggedUser") || "");
    return data;
}

export default getUser;
