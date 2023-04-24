import { Theme } from "@emotion/react";
import { Box, Button, SxProps, TextField, Typography, Link as MuiLink } from "@mui/material";
import { FormEventHandler, ReactNode } from "react";
import { Link } from "react-router-dom";


// if need a text below the form such have dont have an account, set the needRoutingLink to true, and give isRegistered boolean to give the relevant text
interface Props {
  title: string;
  buttonText?: string;
  children?: ReactNode;
  sx?: SxProps<Theme>;
  onSubmit?: FormEventHandler<HTMLFormElement>;
  isRegistered?: boolean;
  needRoutingLink? :boolean;
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

type RoutingLink = {
  text: string;
  link: string;
  linkText: string;
}

export default function ContainerForm({
  title,
  buttonText,
  children,
  sx,
  onSubmit,
  isRegistered,
  needRoutingLink,
}: Props) {
  // TODO: change the linkText to the relevant one
  const routingLink : RoutingLink = isRegistered? {text: "Already have an account?", link:"/login", linkText: "Log in"} : {text: "Don't have an author account?", link:"/registerauthor", linkText: "Signup"}
  return (
    <Box sx={[defaultStyles, ...(Array.isArray(sx) ? sx : [sx])]}>
      <Typography fontWeight={"bold"} variant="h5" marginY={"20px"} >
        {title}
      </Typography>
      <form onSubmit={onSubmit} className="w-full">
        <Box
          sx={{
            width: "100%",
            flexDirection: "column",
            display: "flex",
          }}
        >
          {children}
          {buttonText? (<Button
            sx={{
              marginY: "20px",
            }}
            variant="contained"
            color="button"
            type="submit"
          > {buttonText}</Button>
          )   : null}
          
          {needRoutingLink? (
            <Typography variant="body2">
              {routingLink.text}{" "}
              <MuiLink component={Link} to={routingLink.link}>
                {routingLink.linkText}
              </MuiLink>
            </Typography>
          ): null}
        </Box>
        </form>
    </Box>
  );
}

