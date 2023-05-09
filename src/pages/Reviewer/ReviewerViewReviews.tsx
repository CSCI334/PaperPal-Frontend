import React, { BaseSyntheticEvent, useState } from "react";
import PDFView from "../../components/PDFView/PDFView";
import { Container, Box } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import TabMenu, { ITabs } from "../../components/TabMenu/TabMenu";
import ReviewForm from "../../components/TabMenu/Content/ReviewForm";
import CommentForm from "../../components/TabMenu/Content/CommentForm";


//This class Renders the Reviewer view review page and deals with all components necessary for render
const ReviewerViewReviews: React.FC = () => {
    const [searchparams] = useSearchParams();
    // TODO:: get this from db using searchparams
    const pdfFile = "https://cdn.filestackcontent.com/wcrjf9qPTCKXV3hMXDwK";

    // TODO:: connect to backend and DB
	const handleCommentForm = (event: BaseSyntheticEvent) => {
		event?.preventDefault();
		console.log("Event: ", event);
	}

    const tabs: ITabs[] = [
		{ label: "Reviews", content: <ReviewForm /> },
		{ label: "Comments", content: <CommentForm canAddComment={true} handleSubmit={handleCommentForm} /> }
	];

    return (
        <div style={{ display: "flex", height: "100%" }}>
            <Container maxWidth="md" sx={{ display: "flex", flexDirection: "column", minHeight: "100%" }}>
                <PDFView file={pdfFile} />
            </Container>
            <TabMenu tabs={tabs} />
        </div>
    );
};
export default ReviewerViewReviews;
