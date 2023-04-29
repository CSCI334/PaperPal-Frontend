import { Home, ContactMail, Logout } from "@mui/icons-material";
import { Props as NavbarButtonProps } from "./NavbarButton";

type ButtonPathMap = {
  [key: string]: string;
}

// Button title with their respective Route 
// routes needs to be fixed for the homepage
export const buttonRoutes :ButtonPathMap   = {
  "Home Page": "/create",
  "Reviewer Contact List": "/contactlist",
  "Submitted Paper": "/authorSubmittedPaper"
};


//TODO: change icon and route

// Admin left navigation bar
export const adminButtonList: NavbarButtonProps[] = [
  { title: "Home Page", selected: true, icon: <Home /> },
  { title: "Reviewer Contact List", selected: false, icon: <ContactMail /> },
  { title: "Logout", selected: false, icon: <Logout /> },
];

// Reviewer left navigation bar
export const reviewerButtonList: NavbarButtonProps[] = [
  { title: "Allocated Paper", selected: true, icon: <Home /> },
  { title: "Bidding", selected: false, icon: <ContactMail /> },
  { title: "Logout", selected: false, icon: <Logout /> },
];

// Reviewer left navigation bar
export const authorButtonList: NavbarButtonProps[] = [
  { title: "Submitted Paper", selected: true, icon: <Home /> },
  { title: "Logout", selected: false, icon: <Logout /> },
];

// Reviewer left navigation bar
export const chairButtonList: NavbarButtonProps[] = [
  { title: "All Paper", selected: true, icon: <Home /> },
  { title: "Logout", selected: false, icon: <Logout /> },
];



