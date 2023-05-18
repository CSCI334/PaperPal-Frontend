import { GenericForm } from "../types/GenericForm";
import { authenticatedClient } from "./authenticatedClient";
import errorHandler from "./utility/errorHandler";

export default async function getContactList() {
    try {
        const { data } = await authenticatedClient()({
            url: "contact",
            method: "GET"
        })
        return data as GenericForm[]
    } catch (error) {
        errorHandler(error)
    }
}
