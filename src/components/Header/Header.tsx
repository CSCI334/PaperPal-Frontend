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
import { Link } from "react-router-dom";
import { EmailOutlined, NotificationsOutlined } from "@mui/icons-material";

function Home() {
  return (
    <AppBar
      position="sticky"
      color="secondary"
      sx={{
        borderBottom: "solid 1px",
      }}
    >
      <Toolbar component={Container}>
        <Box
          sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-start" }}
        >
          <Button
            component={Link}
            to="/services"
            sx={{
              fontSize: "18px",
            }}
          >
            PaperPal
          </Button>
        </Box>
        <Button component={Link} to="/services">
          SERVICES
        </Button>
        <Button sx={{ marginX: "10px" }} component={Link} to="/membership">
          MEMBERSHIP
        </Button>
        <IconButton size="medium">
          <NotificationsOutlined color="primary"></NotificationsOutlined>
        </IconButton>
        <IconButton size="medium">
          <EmailOutlined color="primary"></EmailOutlined>
        </IconButton>
        <Button sx={{ marginX: "10px" }} component={Link} to="/orders">
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
