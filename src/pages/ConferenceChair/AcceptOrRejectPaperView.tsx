import { Box, Container, Tab, Tabs, Typography } from "@mui/material";
import React, { BaseSyntheticEvent, useEffect } from "react";
import TabMenu, { ITabs } from "../../components/TabMenu/TabMenu";
import AcceptOrRejectForm from "../../components/TabMenu/Content/AcceptOrRejectForm";
import ReviewForm from "../../components/TabMenu/Content/ReviewForm";
import CommentForm from "../../components/TabMenu/Content/CommentForm";
import PDFView from "../../components/PDFView/PDFView";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function AcceptOrRejectPaperView() {
	const { state } = useLocation()
	const { data } = state

	const navigate = useNavigate()

	const handleAcceptOrReject = (event: BaseSyntheticEvent) => {
		event?.preventDefault();
		console.log("Event: ", event);
	}

	const example: ITabs[] = [
		{ label: "Accept / Reject", content: <AcceptOrRejectForm handleFormSubmission={handleAcceptOrReject} /> },
		{ label: "Reviews", content: <ReviewForm /> },
		{ label: "Comments", content: <CommentForm canAddComment={false} /> }
	];

	useEffect(() => {
		if ((Object.keys(data).length == 0)) navigate("/")

	}, [])

	return (
		<Box sx={{ display: "flex", flexDirection: "row" }}>
			{/* TODO:: add PDF viewer */}
			<PDFView paperId={data.id} />
			<TabMenu tabs={example} />
		</Box>
	);
}
export default AcceptOrRejectPaperView;
