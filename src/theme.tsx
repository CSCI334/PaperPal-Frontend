import { createTheme } from "@mui/material/styles";
import { blue, grey, red } from "@mui/material/colors";

// https://mui.com/material-ui/customization/theming/
const theme = createTheme({
  palette: {
    primary: {
      main: "#256F3D",
    },
    secondary: {
      main: "#72BAD1",
    },
    error: {
      main: red.A400,
    },
    text: {
      primary: "#000000",
      secondary: "#BEBEBF",
    },
  },
  typography: {
    h6: {
      color: "text.primary",
    },
    button: {
      color: "text.primary",
      textTransform: "none",
    },
  },
});

export default theme;
