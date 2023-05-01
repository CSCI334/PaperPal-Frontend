import React, { useState } from "react";
import PDFView from "../../components/PDFView/PDFView";
import { Container, Box, TextField } from "@mui/material";
import { useSearchParams } from "react-router-dom";


//This class Renders the Reviewer add review page and deals with all components necessary for render
const ReviewerAddReview: React.FC = () => {
    const [textInput, setTextInput] = useState<string>("");
    const [searchparams] = useSearchParams();
    // TODO:: get this from db using searchparams
    const pdfFile = "https://cdn.filestackcontent.com/wcrjf9qPTCKXV3hMXDwK";
    const aName = "Lorem Ipsum";
    const sDate = new Date();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTextInput(event.target.value);
    };
    // TODO:: add a -3 - 3 scale and submission button as well as submitting that data to the backend.
    return (
        <Container maxWidth="md" sx={{ display: "flex", flexDirection: "column", minHeight: "100%" }}>
            <Box width="100%" textAlign="left" padding={4}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <p style={{ marginRight: '10px' }}>Author: {aName}</p>
                    <p>Submitted on: {sDate.toLocaleDateString()}</p>
                </div>
            </Box>
            <PDFView file={pdfFile} />
            <Box >
                <TextField
                    label="Your Review"
                    multiline
                    fullWidth
                    value={textInput}
                    onFocus={(e) => e.stopPropagation()}
                    onBlur={(e) => e.stopPropagation()}
                    onChange={handleInputChange}
                    variant="outlined"
                    margin="normal"
                />
            </Box>
        </Container>
    );
};
export default ReviewerAddReview;
