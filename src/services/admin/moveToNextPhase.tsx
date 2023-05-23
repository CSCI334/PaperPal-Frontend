
import axios from "axios";
import errorHandler from "../utility/errorHandler";
import jwtDecode from "jwt-decode";
import { authenticatedClient } from "../authenticatedClient";

//todo: cleanup

async function moveToNextPhase() {
    try {
        const { data } = await authenticatedClient()({
            url: "next-phase",
            method: "GET",
        });
        return data
    } catch (error) {
        errorHandler(error);
    }
}

export default moveToNextPhase;
