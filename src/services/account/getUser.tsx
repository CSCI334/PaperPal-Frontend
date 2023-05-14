import axios from "axios";
import errorHandler from "../utility/errorHandler";
import AuthState from "../../types/AuthData";
import jwtDecode from "jwt-decode";
import { fetchClient } from "../axiosClient";

// Get user, check if token is legit or not 
async function getUser() {
    try {
        const { data } = await fetchClient().get('user');
        return { userData: data };
    } catch (error) {
        errorHandler(error);
    }
}

export default getUser;
