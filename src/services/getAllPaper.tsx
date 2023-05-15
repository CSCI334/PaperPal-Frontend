import axios from "axios";
import errorHandler from "./utility/errorHandler";
import jwtDecode from "jwt-decode";
import { fetchClient } from "./axiosClient";

async function getAllPaper() {
    try {
        const { data } = await fetchClient().get('/paper')
        return data
    } catch (error) {
        errorHandler(error);
    }
}
export default getAllPaper;
