import axios from "axios";
import errorHandler from "./utility/errorHandler";
import jwtDecode from "jwt-decode";
import { authenticatedClient } from "./authenticatedClient";

async function getAllPaper() {
    try {
        const { data } = await authenticatedClient().get('/paper')
        return data
    } catch (error) {
        errorHandler(error);
    }
}
export default getAllPaper;
