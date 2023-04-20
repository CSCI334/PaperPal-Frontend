import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import "./index.css";
import theme from "./theme";
import { CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound/NotFound";
import Home from "./pages/Home/Home";
import App from "./App";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Login from "./pages/Login/Login";
import CreateConference from "./pages/Admin/CreateConference";
import AddNewContact from "./pages/Admin/AddNewContact";
import ContactList from "./pages/Admin/ContactList";
import AuthorRegister from "./pages/Register/AuthorRegister";
import ReviewerRegister from "./pages/Register/ReviewerRegister";
import ChairRegister from "./pages/Register/ChairRegister";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          {/* routing with left nav bar , header, and footer */}
          <Route element={<App />}>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateConference />} />
            <Route path="/addcontact" element={<AddNewContact />} />
            <Route path="/contactlist" element={<ContactList />} />
          </Route>
          {/* Routing for login or register */}
          <Route path="/login" element={<Login />} />
          <Route path="/registerauthor" element={<AuthorRegister />} />
          <Route path="/registerreviewer" element={<ReviewerRegister />} />
          <Route path="/registerchair" element={<ChairRegister />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
