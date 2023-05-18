
import axios from "axios";
import errorHandler from "../utility/errorHandler";
import jwtDecode from "jwt-decode";
import { authenticatedClient } from "../authenticatedClient";

//todo: cleanup

async function inviteReviewer({ email = "", username = "" }) {
    try {
        const requestData = {

            "email": email,
            "username": username,
            "accountType": "REVIEWER"

        };

        const { data } = await authenticatedClient()({
            url: "invite",
            method: "POST",
            data: requestData,
        });



    } catch (error) {
        errorHandler(error);
    }
}

export default inviteReviewer;
