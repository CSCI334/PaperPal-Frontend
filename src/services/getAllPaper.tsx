import axios from "axios";
import errorHandler from "./utility/errorHandler";
import jwtDecode from "jwt-decode";

async function getAllPaper() {
    try {
        const {data} = await axios.get('/paper')
    } catch (error) {
        errorHandler(error);
    }
}

export default getAllPaper;