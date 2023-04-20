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
import { Props as NavbarButtonProps } from "./NavbarButton";
import NavbarButton from "./NavbarButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { buttonRoutes } from "./NavBarButtonList";



interface LeftNavbarProps {
  buttons: NavbarButtonProps[];
}

const drawerWidth = 240;

function LeftNavbar({ buttons }: LeftNavbarProps) {
  const [selectedButton, setSelectedButton] = useState(buttons[0].title);
  const navigate = useNavigate();

  // When the button clicked, it will navigate to the relevant page
  const handleButtonClick = (title: string) => {
    setSelectedButton(title);
    const path = buttonRoutes[title];
    if (path) {
      navigate(path);
    }
    else {
      navigate(`/${title.toLowerCase}`)
    }

  };

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
        {buttons.map((button) => (
          <NavbarButton
            key={button.title}
            title={button.title}
            selected={selectedButton === button.title}
            icon={button.icon}
            onClick={() => handleButtonClick(button.title)}
          />
        ))}
        {/* TODO: add remaining phase timer */}
      </List>
    </Drawer>
  );
}

export default LeftNavbar;
