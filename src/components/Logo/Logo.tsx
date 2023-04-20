import { Box, Button, Container, SxProps, Typography } from "@mui/material";
import "@fontsource/poppins/600-italic.css";
import { Link } from "react-router-dom";
interface Props {
  sx?: SxProps;
}
function Logo({ sx }: Props) {
  return (
    <Button
      sx={{
        fontFamily: "Poppins",
        fontWeight: "600",
        fontStyle: "italic",
        fontSize: "larger",
        textDecoration: "none",
        textAlign: "left",
        width: "fit-content",
        color: "white",
        ...sx,
      }}
      component={Link}
      to="/"
    >
      Paper Pal
    </Button>
  );
}

export default Logo;
