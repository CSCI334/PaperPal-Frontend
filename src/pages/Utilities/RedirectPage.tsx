import { Box, Typography } from "@mui/material";
import LeftBanner from "../../components/LeftBanner/LeftBanner";

function RedirectPageStatus() {
    return (
        <Box
            sx={{
                display: "flex",
                flexGrow: "1",
                flexDirection: "row",

            }}
        >
            <LeftBanner></LeftBanner>
            <Typography variant="h2" margin={"auto"}>Please verify your email and login again</Typography>

        </Box>)
}

export default RedirectPageStatus;