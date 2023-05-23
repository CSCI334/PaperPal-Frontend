
import axios from "axios";
import errorHandler from "../utility/errorHandler";
import jwtDecode from "jwt-decode";
import { authenticatedClient } from "../authenticatedClient";

//todo: cleanup

async function allocateAllPaper() {
    try {
        const { data } = await authenticatedClient()({
            url: "allocate-papers",
            method: "GET",
        });
        return data
    } catch (error) {
        errorHandler(error);
    }
}

export default allocateAllPaper;
