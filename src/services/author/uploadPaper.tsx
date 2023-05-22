import axios from "axios";
import errorHandler from "../utility/errorHandler";
import { authenticatedClient } from "../authenticatedClient";

async function uploadPaper(file: any, paperTitle: string, paperCoauthors: string) {
    try {
        const requestData = {
            paper: file,
            title: paperTitle,
            coauthors: paperCoauthors
        };

        const { data } = await authenticatedClient().post(
            "/paper/upload",
            requestData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            }
        );

        return data;
    } catch (error) {
        errorHandler(error);
    }
}

export default uploadPaper;
