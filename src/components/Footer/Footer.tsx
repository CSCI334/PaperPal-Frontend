import { Box, Container, Typography } from "@mui/material";

function Footer() {
  return (
    <Box
      sx={{
        borderTop: "solid 1px black",
        paddingY: "20px",
        backgroundColor: "F6F6F6",
      }}
    >
      <Container>
        <Typography textAlign={"left"}>TradieLog</Typography>
      </Container>
    </Box>
  );
}

export default Footer;
