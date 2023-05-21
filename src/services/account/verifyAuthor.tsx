import axios from "axios";
import errorHandler from "../utility/errorHandler";

async function verifyAuthor(token: string | null) {
    try {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token ?? ""}`
        }
        const { data } = await axios.post("/verify", {

        }, { headers: headers })
        return data;
    } catch (error) { errorHandler(error) }
}

export default verifyAuthor;
