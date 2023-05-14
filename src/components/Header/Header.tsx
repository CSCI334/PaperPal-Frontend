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
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthState from "../../types/AuthData";
import { useAuth } from "../../context/AuthContext";

function Header() {
  const { authState, setAuthState } = useAuth()
  return (
    <AppBar position="sticky" color="secondary">
      <Toolbar component={Container}>
        <Box
          sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-start" }}
        >
          <Button
            component={Link}
            to="/services"
            variant="text"
            sx={{
              fontSize: "18px",
            }}
          >
            Link that goes somewhere
          </Button>
        </Box>

        <Typography> System Administrator </Typography>
        <IconButton sx={{ p: 0, marginX: "20px" }}>
          <Avatar>A</Avatar>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
export default Header;
