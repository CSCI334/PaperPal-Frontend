import { Theme } from "@emotion/react";
import { Box, Button, SxProps, TextField, Typography, Link as MuiLink } from "@mui/material";
import { FormEvent, FormEventHandler, ReactNode } from "react";

interface Props {
  title: string;
  buttonText?: string;
  children?: ReactNode;
  helperText?: ReactNode
  sx?: SxProps<Theme>;
  onSubmit?: FormEventHandler<HTMLFormElement>;
}

const defaultStyles: SxProps = {
  flexGrow: "1",
  padding: "20px",
  display: "flex",
  alignItems: "start",
  justifyContent: "center",
  flexDirection: "column",
  minWidth: "50%",
};

export default function ContainerForm({
  title,
  buttonText,
  children,
  sx,
  onSubmit,
}: Props) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (onSubmit) onSubmit(event)
  }

  // TODO: change the linkText to the relevant one
  return (
    <Box sx={[ defaultStyles, ...(Array.isArray(sx) ? sx : [ sx ]) ]}>
      <Typography fontWeight={"bold"} variant="h5" marginY={"20px"} >
        {title}
      </Typography>
      <form onSubmit={handleSubmit} className="w-full">
        <Box
          sx={{
            width: "100%",
            flexDirection: "column",
            display: "flex",
          }}
        >
          {children}
          {buttonText ? (<Button
            sx={{
              marginY: "20px",
            }}
            variant="contained"
            color="button"
            type="submit"
          > {buttonText}</Button>
          ) : null}

        </Box>
      </form>
    </Box>
  );
}

