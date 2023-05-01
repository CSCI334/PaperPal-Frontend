import React, { useState } from "react";
import PDFView from "../../components/PDFView/PDFView";
import { Container, Box } from "@mui/material";
import { useSearchParams } from "react-router-dom";


//This class Renders the Reviewer view review page and deals with all components necessary for render
const ReviewerViewReviews: React.FC = () => {
    const [searchparams] = useSearchParams();
    // TODO:: get this from db using searchparams
    const pdfFile = "https://cdn.filestackcontent.com/wcrjf9qPTCKXV3hMXDwK";
    const aName = "Lorem Ipsum";
    const sDate = new Date();

    // TODO:: add tabs component.
    return (
        <Container maxWidth="md" sx={{ display: "flex", flexDirection: "column", minHeight: "100%" }}>
            <Box width="100%" textAlign="left" padding={4}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <p style={{ marginRight: '10px' }}>Author: {aName}</p>
                    <p>Submitted on: {sDate.toLocaleDateString()}</p>
                </div>
            </Box>
            <PDFView file={pdfFile} />
        </Container>
    );
};
export default ReviewerViewReviews;
