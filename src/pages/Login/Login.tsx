import {
  Box,
  Button,
  Container,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import LeftBanner from "../../components/LeftBanner/LeftBanner";

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    neutral: true;
  }
}

function Login() {
  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: "1",
        flexDirection: "row",
      }}
    >
      <LeftBanner></LeftBanner>
      <Box
        sx={{
          flexGrow: "1",
          padding: "20px",
          display: "flex",
          alignItems: "start",
          justifyContent: "center",
          flexDirection: "column",
          minWidth: "50%",
        }}
      >
        <Typography fontWeight={"bold"} variant="h5" marginY={"20px"}>
          Login
        </Typography>
        <TextField
          sx={{
            width: "100%",
          }}
          variant={"outlined"}
          label="Email"
          margin="normal"
          required
        />
        <TextField
          sx={{ width: "100%" }}
          margin="normal"
          label="Password"
          required
          variant={"outlined"}
        />
        <Button
          sx={{
            marginY: "20px",
          }}
          variant="contained"
          color="button"
        >
          Login
        </Button>
      </Box>
    </Box>
  );
}

export default Login;
