import { createTheme } from '@mui/material/styles';
import { blue, red } from '@mui/material/colors';

// https://mui.com/material-ui/customization/theming/
const theme = createTheme({
  palette: {
    primary: {
      main: '#256F3D',
    },
    secondary: {
      main: '#72BAD1',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
