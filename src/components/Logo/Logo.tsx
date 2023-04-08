import { Box, Button, Container, Typography } from "@mui/material";
import "@fontsource/poppins/600-italic.css";
import { Link } from "react-router-dom";

function Logo() {
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
      }}
      component={Link}
      to="/"
    >
      Paper Pal
    </Button>
  );
}

export default Logo;
