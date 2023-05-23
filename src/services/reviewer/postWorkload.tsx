
import axios from "axios";
import errorHandler from "../utility/errorHandler";
import jwtDecode from "jwt-decode";
import { authenticatedClient } from "../authenticatedClient";

//todo: cleanup

async function postWorkload(amountOfPaper: number) {
    try {
        const requestData = {

            "amountOfPapers": amountOfPaper

        };

        const { data } = await authenticatedClient()({
            url: "workload",
            method: "POST",
            data: requestData,
        });

    } catch (error) {
        errorHandler(error);
    }
}

export default postWorkload;
