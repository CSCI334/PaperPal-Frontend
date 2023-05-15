import axios from "axios";
import errorHandler from "../utility/errorHandler";
import AuthState from "../../types/AuthData";
import jwtDecode from "jwt-decode";
import { authenticatedClient } from "../authenticatedClient";

// Get user, check if token is legit or not 
async function getUser() {
    try {
        const { data } = await authenticatedClient().get('user');
        return data;
    } catch (error) {
        errorHandler(error);
    }
}

export default getUser;
