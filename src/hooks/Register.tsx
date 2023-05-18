import { useState } from "react";

export function usePasswordInput(initialValue: string) {
    const [ value, setValue ] = useState(initialValue);
    const [ retypeValue, setRetypeValue ] = useState("");
    const [ matchError, setMatchError ] = useState(false);
    const [ tooShortError, setTooShortError ] = useState(false);

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        setTooShortError(event.target.value.length < 8);
        setMatchError(false);
    };

    const handleRetypePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRetypeValue(event.target.value)
        setMatchError(event.target.value !== value);
    };

    return {
        passwordInputProps: {
            value,
            onChange: handlePasswordChange,
            error: tooShortError,
        },
        retypeInputProps: {
            value: retypeValue,
            onChange: handleRetypePasswordChange,
            error: matchError,
        },
        passwordError: tooShortError,
        matchError,
    };
}
