import { Box } from "@mui/system";
import Logo from "../Logo/Logo";
import {
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { Inbox, Mail } from "@mui/icons-material";
import NavbarButton from "./NavbarButton";

const drawerWidth = 240;
function LeftNavbar() {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
      PaperProps={{
        sx: {
          backgroundColor: "primary.main",
          color: "primary.contrastText",
        },
      }}
    >
      <Toolbar>
        <Logo></Logo>
      </Toolbar>
      <Divider />
      <List>
        <NavbarButton title="Inbox" selected={true}></NavbarButton>
        <NavbarButton title="Mail"></NavbarButton>
      </List>
    </Drawer>
  );
}
export default LeftNavbar;
