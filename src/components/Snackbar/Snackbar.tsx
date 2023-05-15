import { Snackbar } from "@mui/material";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';
import { useLoading, useSnackbar } from "../../context/FeedbackContext";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SnackBar() {
    const { isLoading, setIsLoading } = useLoading()
    const { snackbar, setSnackbar } = useSnackbar()
    const [ message, severity ] = [ snackbar.message, snackbar.severity ]
    const [ open, setOpen ] = React.useState(false);
    let existingTimeout = setTimeout(() => { }, 1000)
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: String) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false)
        clearTimeout(existingTimeout)
        existingTimeout = setTimeout(() => {
            setSnackbar({ message: undefined, severity: snackbar.severity })
        }, 2000);
    };

    useEffect(() => {
        setOpen(false);
    }, []);

    useEffect(() => {
        if (snackbar.message !== undefined) {
            setIsLoading(false)
            setOpen(true)
        }
    }, [ snackbar.severity, snackbar.message ])

    return (
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severity}>
                {message}
            </Alert>
        </Snackbar>
    );
}
