import {
  Box,
  Button,
  Container,
  Input,
  TextField,
  Typography,
} from "@mui/material";
function Login() {
  return (
    <Container
      sx={{
        display: "flex",
        flexGrow: "1",
        flexDirection: "row",
        padding: "10px",
      }}
    >
      <Box
        sx={{
          border: "solid 1px black",
          flexGrow: "1",
          padding: "20px",
          display: "flex",
          alignItems: "start",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Typography fontWeight={"bold"} paddingY={"30px"} variant="h5">
          Login
        </Typography>
        <TextField
          sx={{ width: "100%" }}
          variant={"outlined"}
          placeholder="Email"
        />
        <TextField
          sx={{ paddingY: "24px", width: "100%" }}
          placeholder="Password"
          variant={"outlined"}
        />
        <Button variant="contained">Submit</Button>
      </Box>
      <Box
        sx={{
          border: "solid 1px black",
          flexGrow: "1",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        Image goes here i guess
      </Box>
    </Container>
  );
}

export default Login;
