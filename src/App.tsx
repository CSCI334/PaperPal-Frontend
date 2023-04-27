import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Box } from "@mui/system";
import LeftNavbar from "./components/LeftNavbar/LeftNavbar";
import { Props as NavbarButtonProps } from "./components/LeftNavbar/NavbarButton";
import { Inbox, Mail, ThumbDown  } from "@mui/icons-material";
import { adminButtonList } from "./components/LeftNavbar/NavBarButtonList";
import { useState } from "react";

function App() {
  const buttons:NavbarButtonProps[] = adminButtonList;
 
  return (
    <>
      <LeftNavbar buttons={buttons} ></LeftNavbar>
      <Box
        sx={{
          flexGrow: "1",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Header></Header>
        <Outlet></Outlet>
        <Footer></Footer>
      </Box>
    </>
  );
}

export default App;
