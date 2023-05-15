import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  styled,
  Button,
  Avatar,
  Container,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Header() {
  const { authState, setAuthState } = useAuth()
  console.log(authState)
  return (
    <AppBar position="sticky" color="secondary">
      <Toolbar component={Container}>
        <Box
          sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-start" }}
        >
          <Button
            variant="text"
            sx={{
              fontSize: "18px",
            }}
          >
            Header Title
          </Button>
        </Box>

        <Typography> {authState.userData.username ?? ""} </Typography>
        <IconButton sx={{ p: 0, marginX: "20px" }}>
          <Avatar>{(authState.userData.username ?? "A")[ 0 ]}</Avatar>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
export default Header;
