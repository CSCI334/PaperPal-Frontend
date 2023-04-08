import { Box } from "@mui/system";
import Logo from "../Logo/Logo";
import { Typography } from "@mui/material";
import "@fontsource/poppins/300-italic.css";
function LeftBanner() {
  return (
    <Box
      sx={{
        flexGrow: "1",
        flexShrink: "1",
        padding: "32px",
        display: "flex",
        flexDirection: "column",
      }}
      bgcolor={"primary.main"}
    >
      <Box
        sx={{
          textAlign: "left",
          flexGrow: "1",
        }}
      >
        <Logo></Logo>
      </Box>
      <Typography
        sx={{
          fontFamily: "Poppins",
          fontWeight: "300",
          fontStyle: "italic",
          fontSize: "60px",
          textAlign: "left",
          background: "-webkit-linear-gradient(#fff, rgba(0,0,0,0))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Conference <br />
        Management <br />
        System
      </Typography>
    </Box>
  );
}
export default LeftBanner;
