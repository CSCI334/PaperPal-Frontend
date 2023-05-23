
import axios from "axios";
import errorHandler from "../utility/errorHandler";
import jwtDecode from "jwt-decode";
import { authenticatedClient } from "../authenticatedClient";

async function sendAnnouncementEmail() {
    try {
        const { data } = await authenticatedClient()({
            url: "send-announcement",
            method: "GET",
        });
        return data
    } catch (error) {
        errorHandler(error);
    }
}

export default sendAnnouncementEmail;
