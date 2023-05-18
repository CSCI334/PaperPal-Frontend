import { useEffect } from "react";
import { useLoading, useSnackbar } from "../context/FeedbackContext";
import getAllPaper from "../services/getAllPaper";
import { GenericForm } from "../types/GenericForm";
import useHttpRequest from "./useHttpRequest";
import getConferenceInfo from "../services/admin/getConferenceInfo";

export default function useConferenceInfo(onComplete: (value: any) => void, dependencyList?: React.DependencyList | undefined) {
    useHttpRequest(
        getConferenceInfo(),
        onComplete,
        dependencyList
    )
}
