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
          color: "white",
        },
      }}
    >
      <Toolbar>
        <Logo></Logo>
      </Toolbar>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            sx={{
              width: "80%",
              paddingY: "10px",
              borderTopRightRadius: "25px",
              borderBottomRightRadius: "25px",
              borderBottomLeftRadius: "0px",
              borderTopLeftRadius: "0px",
              justifyContent: "left",
            }}
          >
            <ListItemIcon>
              <Inbox />
            </ListItemIcon>
            <ListItemText primary={"Inbox"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}
export default LeftNavbar;
