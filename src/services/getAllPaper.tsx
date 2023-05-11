import axios from "axios";
import errorHandler from "./errorHandler";
import jwtDecode from "jwt-decode";

async function getAllPaper() {
    try {
        const {data} = await axios.get('/paper')
    } catch (error) {
        errorHandler(error);
    }
}

export default getAllPaper;