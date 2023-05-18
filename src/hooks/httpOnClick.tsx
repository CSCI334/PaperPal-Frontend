import { useCallback, useEffect } from "react"
import { useLoading, useSnackbar } from "../context/FeedbackContext"

export default function httpOnClick(
    httpRequest: () => Promise<any>,
    onSuccess: (value: any) => void,
    successMessage?: string,
    supressAlert: boolean = false) {

    const { isLoading, setIsLoading } = useLoading()
    const { snackbar, setSnackbar } = useSnackbar()

    return () => {
        setIsLoading(true)
        httpRequest()
            .then(value => {
                if (!supressAlert) {
                    let message = "Success"
                    if (successMessage) message = successMessage
                    setSnackbar({ message: message, severity: "success" })
                }
                setIsLoading(false)
                return value
            })
            .then(onSuccess)
            .catch((value) => {
                const severity = value.status >= 500 ? "error" : "warning"
                setSnackbar({ message: value.message, severity: severity })
            })
    }
}
