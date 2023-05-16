import { authenticatedClient } from "./authenticatedClient";
import errorHandler from "./utility/errorHandler";



async function addPaperReview(rating: string, id: string, review: string) {
    try {
        const requestData = {

            "rating": rating,
            "paperId": id,
            "review": review
        };

        const { data } = await authenticatedClient()({
            url: "paper/review",
            method: "POST",
            data: requestData,
        });

        return data;
    } catch (error) {
        errorHandler(error);
    }
}

export default addPaperReview;
