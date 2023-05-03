import React, { useState } from "react";
import PDFView from "../../components/PDFView/PDFView";
import { Container, Box } from "@mui/material";
import { useSearchParams } from "react-router-dom";


//This class Renders the Reviewer view review page and deals with all components necessary for render
const ReviewerViewReviews: React.FC = () => {
    const [searchparams] = useSearchParams();
    // TODO:: get this from db using searchparams
    const pdfFile = "https://cdn.filestackcontent.com/wcrjf9qPTCKXV3hMXDwK";

    // TODO:: add tabs component.
    return (
        <Container maxWidth="md" sx={{ display: "flex", flexDirection: "column", minHeight: "100%" }}>
            <PDFView file={pdfFile} />
        </Container>
    );
};
export default ReviewerViewReviews;
