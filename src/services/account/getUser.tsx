import axios from "axios";
import errorHandler from "../utility/errorHandler";
import AuthState from "../../types/AuthData";
import jwtDecode from "jwt-decode";
import { fetchClient } from "../axiosClient";

// Get user, check if token is legit or not 
async function getUser() {
    try {
        const { data } = await fetchClient().get('user');
        const jwtToken = data.token;
        // Decripting JWT token
        const decodedJWT: {} = jwtDecode(jwtToken);
        const loggedUser = { ...decodedJWT, ...data };
        const authState = new AuthState(
            { Authorization: loggedUser.token },
            true,
            {
                email: loggedUser.email,
                username: loggedUser.username,
            },
            loggedUser.accountType,
        );
        localStorage.setItem("loggedUser", JSON.stringify(authState))

        return authState;
    } catch (error) {
        console.log(error)
        errorHandler(error);
    }
    const data = AuthState.createFromString(localStorage.getItem("loggedUser") || "");
    return data;
}

export default getUser;
