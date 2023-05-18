import { useEffect } from "react";
import { useLoading, useSnackbar } from "../context/FeedbackContext";
import getAllPaper from "../services/getAllPaper";
import { GenericForm } from "../types/GenericForm";
import useHttpRequest from "./useHttpRequest";

export default function useAllPaper(onComplete: (value: any) => void, dependencyList?: React.DependencyList | undefined) {
    useHttpRequest(
        getAllPaper(),
        onComplete,
        dependencyList
    )
}
