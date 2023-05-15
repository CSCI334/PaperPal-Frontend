import { AlertColor } from "@mui/material";
import {
    Dispatch,
    ReactNode,
    SetStateAction,
    createContext,
    useContext,
    useState,
} from "react";

interface Props {
    children?: ReactNode;
}

export interface SnackbarProps {
    message: string | undefined
    severity: AlertColor
}

const LoadingContext = createContext<any>(false);
const SnackbarContext = createContext<any>(false);

// Context for providing user feedback
export function FeedbackProvider({ children }: Props) {
    // To use the snackbar, use the useSnackbar hook and trigger it by calling setSnackbar
    // Argument for setSnackbar is in SnackbarProps
    const [ snackbar, setSnackbar ] = useState(
        false
    );

    // Same with snackbar, but with boolean instead of props
    const [ isLoading, setIsLoading ] = useState(
        false
    );

    return (
        <SnackbarContext.Provider value={{ snackbar, setSnackbar }}>
            <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
                {children}
            </LoadingContext.Provider>
        </SnackbarContext.Provider>
    );
}

export function useLoading() {
    const { isLoading, setIsLoading }: { isLoading: boolean, setIsLoading: Dispatch<SetStateAction<boolean>> } = useContext(LoadingContext)
    return { isLoading, setIsLoading };
}

export function useSnackbar() {
    const { snackbar, setSnackbar }: { snackbar: SnackbarProps, setSnackbar: Dispatch<SetStateAction<SnackbarProps>> } = useContext(SnackbarContext)
    return { snackbar, setSnackbar };
}
