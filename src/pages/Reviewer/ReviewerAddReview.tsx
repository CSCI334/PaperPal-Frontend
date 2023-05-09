import React, { BaseSyntheticEvent, useState } from "react";
import PDFView from "../../components/PDFView/PDFView";
import { Container, Box, TextField } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import TabMenu, { ITabs } from "../../components/TabMenu/TabMenu";
import RatingPaperForm from "../../components/TabMenu/Content/RatingPaperForm";


//This class Renders the Reviewer add review page and deals with all components necessary for render
const ReviewerAddReview: React.FC = () => {
    const [textInput, setTextInput] = useState<string>("");
    const [searchparams] = useSearchParams();
    // TODO:: get this from db using searchparams
    const pdfFile = "https://cdn.filestackcontent.com/wcrjf9qPTCKXV3hMXDwK";

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTextInput(event.target.value);
    };

    // TODO:: connect to backend and DB
    const handleRatingForm = (event: BaseSyntheticEvent) => {
        event?.preventDefault();
        console.log("Event: ", event);
    }

    const tabs: ITabs[] = [
        { label: "My Review", content: <RatingPaperForm handleFormSubmission={handleRatingForm} /> }
    ];

    // TODO:: add a -3 - 3 scale and submission button as well as submitting that data to the backend.
    return (
        <div style={{ display: "flex", height: "100%" }}>
            <Container maxWidth="md" sx={{ display: "flex", flexDirection: "column", minHeight: "100%" }}>
                <PDFView file={pdfFile} />
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
            <TabMenu tabs={tabs} />
        </div>
    );
};
export default ReviewerAddReview;
