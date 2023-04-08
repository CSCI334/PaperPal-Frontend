import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  styled,
  Button,
  Avatar,
  Container,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import {
  Email,
  EmailOutlined,
  Notifications,
  NotificationsOutlined,
} from "@mui/icons-material";

function Home() {
  return (
    <AppBar
      position="sticky"
      color="secondary"
      sx={{
        backgroundColor: "white",
        borderBottom: "solid 1px black",
      }}
    >
      <Toolbar component={Container}>
        <Box
          sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-start" }}
        >
          <Button
            component={RouterLink}
            to="/services"
            sx={{
              fontSize: "18px",
            }}
          >
            TradieLog
          </Button>
        </Box>
        <Button component={RouterLink} to="/services">
          SERVICES
        </Button>
        <Button
          sx={{ marginX: "10px" }}
          component={RouterLink}
          to="/membership"
        >
          MEMBERSHIP
        </Button>
        <IconButton size="medium">
          <NotificationsOutlined color="primary"></NotificationsOutlined>
        </IconButton>
        <IconButton size="medium">
          <EmailOutlined color="primary"></EmailOutlined>
        </IconButton>
        <Button sx={{ marginX: "10px" }} component={RouterLink} to="/orders">
          ORDERS
        </Button>
        <IconButton sx={{ p: 0 }}>
          <Avatar>A</Avatar>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
export default Home;
