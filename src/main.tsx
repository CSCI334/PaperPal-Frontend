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
import AuthorViewRatings from "./pages/Author/AuthorViewRatings";
import AuthorSubmittedPaper from "./pages/Author/AuthorSubmittedPaper";
import AuthorRegister from "./pages/Register/AuthorRegister";
import AuthProvider from "./context/AuthContext";
import ReviewerRegister from "./pages/Register/ReviewerRegister";
import ChairRegister from "./pages/Register/ChairRegister";

import ConferenceDetails from "./pages/Admin/ConferenceDetail";
import Dummy from "./pages/Admin/ContactList copy";
import AllPapersList from "./pages/ConferenceChair/AllPapersListView";
import AcceptOrRejectPaperView from "./pages/ConferenceChair/AcceptOrRejectPaperView";
import BiddingSystem from "./pages/Reviewer/BiddingSystem";
import ReviewerAllocatedPaper from "./pages/Reviewer/ReviewerAllocatedPaper";
import ReviewerAddReview from "./pages/Reviewer/ReviewerAddReview";
import ReviewerViewReviews from "./pages/Reviewer/ReviewerViewReviews";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* routing with left nav bar , header, and footer */}
            <Route element={<App />}>
              <Route path="/" element={<Home />} />
              <Route path="/create" element={<CreateConference />} />
              <Route path="/addcontact" element={<AddNewContact />} />
              <Route path="/contactlist" element={<ContactList />} />
              <Route
                path="/AuthorViewRatings"
                element={<AuthorViewRatings />}
              />
              <Route
                path="/authorsubmittedpaper"
                element={<AuthorSubmittedPaper />}
              />
              <Route path="/conferencedetail" element={<ConferenceDetails />} />
              <Route path="/reviewerAllocatedPapers" element={<ReviewerAllocatedPaper />} />
              <Route path="/reviewerAddReview" element={<ReviewerAddReview />} />
              <Route path="/biddingSystem" element={<BiddingSystem />} />
              <Route path="/reviewerView" element={<ReviewerViewReviews />} />
              
              {/* Conference Chair */}
              <Route path="/allpaperslist" element={<AllPapersList />} />
              <Route path="/acceptrejectpaper" element={<AcceptOrRejectPaperView />} />
            </Route>
            {/* Routing for login or register */}
            <Route path="/login" element={<Login />} />
            <Route path="/registerauthor" element={<AuthorRegister />} />
            <Route path="/registerreviewer" element={<ReviewerRegister />} />
            <Route path="/registerchair" element={<ChairRegister />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
