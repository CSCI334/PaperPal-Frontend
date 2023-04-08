import { createTheme } from "@mui/material/styles";
import { blue, red } from "@mui/material/colors";

// https://mui.com/material-ui/customization/theming/
const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#FFFFFF",
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    button: {
      textTransform: "none",
    },
  },
});

export default theme;
