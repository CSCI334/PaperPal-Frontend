import { authenticatedClient } from "./authenticatedClient";
import errorHandler from "./utility/errorHandler";



async function addComments(comments: string, id: string) {
    try {
        const requestData = {
            comment: comments,
            paperId: id
        };

        const { data } = await authenticatedClient()({
            url: "paper/comments",
            method: "POST",
            data: requestData,
        });

        return data;
    } catch (error) {
        errorHandler(error);
    }
}

export default addComments;
