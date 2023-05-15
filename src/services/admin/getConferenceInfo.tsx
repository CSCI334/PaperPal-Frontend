import axios from "axios";
import errorHandler from "../utility/errorHandler";
import { authenticatedClient } from "../authenticatedClient";
import { GenericForm } from "../../types/GenericForm";

async function getConferenceInfo() {
    try {
        const { data } = await authenticatedClient()({
            url: "conference",
            method: "GET"
        })
        return data;
    } catch (error) {
        errorHandler(error);
    }



}
export default getConferenceInfo;
