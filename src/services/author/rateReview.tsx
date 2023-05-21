import axios from "axios";
import errorHandler from "../utility/errorHandler";
import { authenticatedClient } from "../authenticatedClient";

async function rateReview(rate: any, id: any) {
    try {
        const requestData = {
            rating: parseInt(rate),
            reviewId: id
        };

        const { data } = await authenticatedClient().post(
            "/paper/review/rating",
            requestData
        );

        return data;
    } catch (error) {
        errorHandler(error);
    }
}

export default rateReview;
