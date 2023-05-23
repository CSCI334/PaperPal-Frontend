import { authenticatedClient } from "./authenticatedClient";
import errorHandler from "./utility/errorHandler";



async function acceptReject(paperId: string, status: string) {
    try {
        const requestData = {
            "status": status
        };

        const { data } = await authenticatedClient()({
            url: `paper/judge/${paperId}`,
            method: "POST",
            data: requestData,
        });

        return data;
    } catch (error) {
        errorHandler(error);
    }
}

export default acceptReject;
