import errorHandler from "../utility/errorHandler";
import { authenticatedClient } from "../authenticatedClient";

async function getSubmittedPapers(id: number) {
    try {
        const { data } = await authenticatedClient().get('/paper')
        let authorPapers = data.filter((x: any) => x.authorid = id);
        return authorPapers
    } catch (error) {
        errorHandler(error);
    }
}
export default getSubmittedPapers;
