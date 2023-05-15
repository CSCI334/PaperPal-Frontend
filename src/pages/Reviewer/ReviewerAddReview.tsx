import React, { useState } from "react";
import PDFView from "../../components/PDFView/PDFView";
import { Container, Box, TextField } from "@mui/material";
import { useSearchParams } from "react-router-dom";


//This class Renders the Reviewer add review page and deals with all components necessary for render
const ReviewerAddReview: React.FC = () => {
    const [ textInput, setTextInput ] = useState<string>("");
    const [ searchparams ] = useSearchParams();
    // TODO:: get this from db using searchparams
    const pdfFile = "https://cdn.filestackcontent.com/wcrjf9qPTCKXV3hMXDwK";

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTextInput(event.target.value);
    };
    // TODO:: add a -3 - 3 scale and submission button as well as submitting that data to the backend.
    return (
        <Container maxWidth="md" sx={{ display: "flex", flexDirection: "column", minHeight: "100%" }}>
            <PDFView paperId={pdfFile} />
            <Box
                sx={{
                    marginTop: "100px"
                }}>
                <TextField
                    label="Your Review"
                    multiline
                    fullWidth
                    value={textInput}
                    onChange={handleInputChange}
                    variant="outlined"
                    margin="normal"
                />
            </Box>
        </Container>
    );
};
export default ReviewerAddReview;
