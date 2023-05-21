import axios from "axios";
import errorHandler from "./utility/errorHandler";
import { authenticatedClient } from "./authenticatedClient";

async function getReviews(paperId: any) {
    try {
        const { data } = await authenticatedClient().get(
            `paper/${paperId}/reviews`
        );

        return data;
    } catch (error) {
        errorHandler(error);
    }
}

export default getReviews;
