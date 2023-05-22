import axios from "axios";
import errorHandler from "./utility/errorHandler";
import { authenticatedClient } from "./authenticatedClient";

async function getComments(paperId: any) {
    try {
        const { data } = await authenticatedClient().get(
            `paper/${paperId}/comments`
        );

        return data;
    } catch (error) {
        errorHandler(error);
    }
}

export default getComments;
