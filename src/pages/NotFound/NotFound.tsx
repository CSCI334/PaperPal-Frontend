import { Container } from "@mui/material";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <Container
      sx={{
        display: "flex",
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <h1>404 Not Found</h1>
      <Link to="/">Go to home page</Link>
    </Container>
  );
}

export default NotFound;
