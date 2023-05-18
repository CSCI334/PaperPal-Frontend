import { authenticatedClient } from "./authenticatedClient";
import errorHandler from "./utility/errorHandler";



async function addBid(id: string, bid: string) {
    try {
        const requestData = {

            "paperId": id,
            "bidAmount": bid
        };

        const { data } = await authenticatedClient()({
            url: "/bid",
            method: "POST",
            data: requestData,
        });

        return data;
    } catch (error) {
        errorHandler(error);
    }
}

export default addBid;
