import { Box } from "@mui/system";
import Logo from "../Logo/Logo";
import { Button } from "@mui/material";

function LeftNavbar() {
  return (
    <Box
      sx={{ position: "sticky" }}
      bgcolor={"primary.main"}
      display={"flex"}
      flexDirection={"column"}
      minWidth={"220px"}
      alignItems={"flex-start"}
    >
      <Box padding={"20px"}>
        <Logo></Logo>
      </Box>
      <Button
        sx={{
          color: "white",
          width: "80%",
          paddingY: "10px",
          borderTopRightRadius: "25px",
          borderBottomRightRadius: "25px",
          borderBottomLeftRadius: "0px",
          borderTopLeftRadius: "0px",
          justifyContent: "left",
        }}
        variant="contained"
        color="secondary"
      >
        All Papers
      </Button>
    </Box>
  );
}
export default LeftNavbar;
