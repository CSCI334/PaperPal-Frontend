import axios from "axios";
import errorHandler from "../utility/errorHandler";
import jwtDecode from "jwt-decode";

async function getReviewerContact() {
    try {
        const {data} = await axios.get('/contact')
        return data.value;
    } catch (error) {
        errorHandler(error);
    }
}

export default getReviewerContact;