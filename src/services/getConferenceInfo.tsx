import axios from "axios";
import errorHandler from "./utility/errorHandler";
import { fetchClient } from "./axiosClient";
import { GenericForm } from "../types/GenericForm";

async function getConferenceInfo() {
    try {
        const { data } = await fetchClient()({
            url: "conference",
            method: "GET"
        })
        return data as GenericForm[]
    } catch (error) {
        errorHandler(error);
    }



}
export default getConferenceInfo;