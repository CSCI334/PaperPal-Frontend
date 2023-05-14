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
import {
  AdminProtectedRoute,
  AuthorProtectedRoute,
  ChairProtectedRoute,
  ProtectedRoute,
  ReviewerProtectedRoute,
} from "./services/utility/routeGuard";

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

              {/* Admin  */}
              <Route path="/create" element={<AdminProtectedRoute><CreateConference /></AdminProtectedRoute>} />
              <Route path="/addcontact" element={<AdminProtectedRoute><AddNewContact /></AdminProtectedRoute>} />
              <Route path="/contactlist" element={<AdminProtectedRoute><ContactList /></AdminProtectedRoute>} />
              <Route path="/conferencedetail" element={<AdminProtectedRoute><ConferenceDetails /></AdminProtectedRoute>} />

              {/* Author */}
              <Route path="/AuthorViewRatings" element={<AuthorProtectedRoute><AuthorViewRatings /></AuthorProtectedRoute>} />
              <Route path="/authorsubmittedpaper" element={<AuthorProtectedRoute><AuthorSubmittedPaper /></AuthorProtectedRoute>} />

              {/* Conference Chair */}
              <Route path="/allpaperslist" element={<ChairProtectedRoute><AllPapersList /></ChairProtectedRoute>} />
              <Route path="/acceptrejectpaper" element={<ChairProtectedRoute><AcceptOrRejectPaperView /></ChairProtectedRoute>} />

              {/* Reviewer */}
              <Route path="/biddingSystem" element={<ReviewerProtectedRoute><BiddingSystem /></ReviewerProtectedRoute>} />
              <Route path="/reviewerAllocatedPapers" element={<ReviewerProtectedRoute><ReviewerAllocatedPaper /></ReviewerProtectedRoute>} />
              <Route path="/reviewerAddReview" element={<ReviewerProtectedRoute><ReviewerAddReview /></ReviewerProtectedRoute>} />
              <Route path="/reviewerView" element={<ReviewerProtectedRoute><ReviewerViewReviews /></ReviewerProtectedRoute>} />
            </Route>
            {/* Routing for login or register */}
            <Route path="/login" element={<Login />} />
            <Route path="/register-author" element={<AuthorRegister />} />
            <Route path="/register-reviewer" element={<ReviewerRegister />} />
            <Route path="/register-chair" element={<ChairRegister />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
