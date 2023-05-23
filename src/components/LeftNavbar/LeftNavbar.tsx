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
import { Add, Inbox, Mail, MarkEmailRead, NoteAdd, SkipNext } from "@mui/icons-material";
import { Props as NavbarButtonProps } from "./NavbarButton";
import NavbarButton from "./NavbarButton";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminButtonList, authorButtonList, buttonRoutes, chairButtonList, reviewerButtonList } from "./NavBarButtonList";
import { useAuth } from "../../context/AuthContext";
import CountdownTimer from "./Timer";
import AuthState from "../../types/AuthData";
import httpOnClick from "../../hooks/httpOnClick";
import allocateAllPapers from "../../services/admin/allocateAllPapers";
import moveToNextPhase from "../../services/admin/moveToNextPhase";
import sendAnnouncementEmail from "../../services/admin/sendAnnouncementEmail";


interface ButtonLists {
  admin: NavbarButtonProps[];
  reviewer: NavbarButtonProps[];
  chair: NavbarButtonProps[];
  author: NavbarButtonProps[];
}

interface LeftNavbarProps {
  buttons: NavbarButtonProps[];
}

function LeftNavbar({ buttons }: LeftNavbarProps) {
  const navigate = useNavigate();
  const buttonLists: ButtonLists = {
    admin: adminButtonList,
    reviewer: reviewerButtonList,
    chair: chairButtonList,
    author: authorButtonList,
  };

  // const navBarButtonList  = buttonLists[status as keyof ButtonLists] || [];
  // still hard coded need to change this
  const { authState, setAuthState } = useAuth();
  const accountType = authState.userData.accountType ?? ""
  const navBarButtonList = buttonLists[ accountType.toLowerCase() as keyof ButtonLists ] ?? [ { title: " " } ];
  const [ selectedButton, setSelectedButton ] = useState(localStorage.getItem("selectedButton") || navBarButtonList[ 0 ].title);

  // When the button clicked, it will navigate to the relevant page
  const handleButtonClick = (title: string) => {
    setSelectedButton(title);
    const path = buttonRoutes[ title ];
    if (path) {
      navigate(path);
    }
    else if (title == "Logout") {
      // localStorage.removeItem("loggedUser")
      localStorage.clear();
      setAuthState(AuthState.createFromString(localStorage.getItem("loggedUser") || ""))
      navigate(`/login`)
    }
    else {
      navigate(`/${title.toLowerCase}`)
    }

  };

  useEffect(() => {
    localStorage.setItem("selectedButton", selectedButton);
  }, [ selectedButton ]);


  const moveToNextPhaseClick = httpOnClick(() => moveToNextPhase(),
    () => { }, "Succesfully moved to next phase")

  const allocateAllPaperClick = httpOnClick(() => allocateAllPapers()
    , () => { }, "Succesfully allocated all paper")

  const sendAnnouncementEmailClick = httpOnClick(() => sendAnnouncementEmail()
    , () => { }, "Succesfully sent email")

  return (
    <Drawer
      sx={{
        minWidth: "250px",
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
        },
      }}

      variant="permanent"
      anchor="right"
      PaperProps={{
        sx: {
          position: "unset",
          backgroundColor: "primary.main",
          color: "primary.contrastText",
          sx: { width: "90%" },
        },
      }}
    >
      <Toolbar>
        <Logo></Logo>
      </Toolbar>
      <Divider />
      <List>
        {navBarButtonList.map((button) => (
          <NavbarButton
            key={button.title}
            title={button.title}
            selected={selectedButton === button.title}
            icon={button.icon}
            onClick={() => handleButtonClick(button.title)}
          />
        ))}
        <CountdownTimer></CountdownTimer>
        {/* TODO: add remaining phase timer */}
      </List>
      {accountType === "ADMIN" &&
        <>
          <Button sx={{ m: "12px" }} onClick={moveToNextPhaseClick} variant="contained" endIcon={<SkipNext />}
            color="button" >
            Move to next phase
          </Button>
          <Button sx={{ m: "12px" }} onClick={allocateAllPaperClick} variant="contained" endIcon={<NoteAdd />}
            color="button" >
            Allocate all paper
          </Button>
          <Button sx={{ m: "12px" }} onClick={sendAnnouncementEmailClick} variant="contained" endIcon={<MarkEmailRead />}
            color="button" >
            Send announcement email
          </Button>
        </>
      }
    </Drawer>
  );
}

export default LeftNavbar;
