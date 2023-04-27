import { createTheme } from "@mui/material/styles";
import { blue, grey, red } from "@mui/material/colors";

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    button: true;
  }
}

declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: string;
      action: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
      action?: string;
    };
  }

  interface Palette {
    button: Palette["primary"];
  }
  interface PaletteOptions {
    button: PaletteOptions["primary"];
  }
}

// https://mui.com/material-ui/customization/theming/
const theme = createTheme({
  palette: {
    primary: {
      main: "#256F3D",
      contrastText: "white",
    },
    secondary: {
      main: "#FFFFFF",
      contrastText: "black",
    },
    error: {
      main: red.A400,
      contrastText: "white",
    },
    text: {
      primary: "#000000",
      secondary: "#BEBEBF",
    },
    button: {
      main: "#72BAD1",
      contrastText: "white",
      
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
  status: {
    danger: red[500],
    action: "#72BAD1",
  },
});

export default theme;
