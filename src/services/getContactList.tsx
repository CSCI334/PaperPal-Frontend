import { GenericForm } from "../types/GenericForm";
import { fetchClient } from "./axiosClient";
import errorHandler from "./utility/errorHandler";

export default async function getContactList() {
    try {
        const { data } = await fetchClient()({
            url: "contact",
            method: "GET"
        })
        return data as GenericForm[]
    } catch (error) {
        errorHandler(error)
    }
}
