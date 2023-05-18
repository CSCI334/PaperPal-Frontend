import { useEffect } from "react";
import { useLoading, useSnackbar } from "../context/FeedbackContext";

export default function useHttpRequest(httpRequest: Promise<any>, callback: (value: any) => void, dependencyList?: React.DependencyList | undefined) {
    const { isLoading, setIsLoading } = useLoading()
    const { snackbar, setSnackbar } = useSnackbar()

    useEffect(() => {
        setIsLoading(true)
        httpRequest
            .then(callback)
            .catch((value) => {
                const severity = value.status >= 500 ? "error" : "warning"
                setSnackbar({ message: value.message, severity: severity })
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, dependencyList)
}
