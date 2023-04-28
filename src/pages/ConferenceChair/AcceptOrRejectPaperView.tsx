import { Box, Container, Tab, Tabs, Typography } from "@mui/material";
import React, { BaseSyntheticEvent } from "react";
import TabMenu, { ITabs } from "../../components/TabMenu/TabMenu";
import AcceptOrRejectForm from "../../components/TabMenu/Content/AcceptOrRejectForm";
import ReviewForm from "../../components/TabMenu/Content/ReviewForm";
import CommentForm from "../../components/TabMenu/Content/CommentForm";

function AcceptOrRejectPaperView() {
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
				<div>Content goes here</div>
			</Container>
			<TabMenu tabs={example} />
		</div>
	);
}
export default AcceptOrRejectPaperView;