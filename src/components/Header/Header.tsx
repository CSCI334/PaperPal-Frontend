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
  LinearProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useLoading } from "../../context/FeedbackContext";

function Header() {
  const { authState, setAuthState } = useAuth()
  const { isLoading, setIsLoading } = useLoading();

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
          </Button>
        </Box>

        <Typography> {authState.userData.username ?? ""} </Typography>
        <IconButton sx={{ p: 0, marginX: "20px" }}>
          <Avatar>{(authState.userData.username ?? "A")[ 0 ]}</Avatar>
        </IconButton>
      </Toolbar>
      <LinearProgress sx={{
        display: isLoading ? 'block' : 'none'
      }} />
    </AppBar>
  );
}
export default Header;
