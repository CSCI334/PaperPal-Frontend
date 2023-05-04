import { Box, Container, Tab, Tabs, Typography } from "@mui/material";
import React, { BaseSyntheticEvent } from "react";
import TabMenu, { ITabs } from "../../components/TabMenu/TabMenu";
import AcceptOrRejectForm from "../../components/TabMenu/Content/AcceptOrRejectForm";
import ReviewForm from "../../components/TabMenu/Content/ReviewForm";
import CommentForm from "../../components/TabMenu/Content/CommentForm";
import PDFView from "../../components/PDFView/PDFView";

function AcceptOrRejectPaperView() {
	const pdfFile = "https://cdn.filestackcontent.com/wcrjf9qPTCKXV3hMXDwK";
	// TODO:: connect to backend and DB
	const handleAcceptOrReject = (event: BaseSyntheticEvent) => {
		event?.preventDefault();
		console.log("Event: ", event);
	}

	const example: ITabs[] = [
		{ label: "Accept / Reject", content: <AcceptOrRejectForm handleFormSubmission={handleAcceptOrReject} /> },
		{ label: "Reviews", content: <ReviewForm /> },
		{ label: "Comments", content: <CommentForm canAddComment={false} /> }
	];

	return (
		<div style={{ display: "flex", height: "100%" }}>
			{/* TODO:: add PDF viewer */}
			<Container sx={{ flexGrow: "1" }}>
				<PDFView file={pdfFile} />
			</Container>
			<TabMenu tabs={example} />
		</div>
	);
}
export default AcceptOrRejectPaperView;
