import { Box, Container, Tab, Tabs, Typography } from "@mui/material";
import React, { BaseSyntheticEvent, useEffect, useState } from "react";
import TabMenu, { ITabs } from "../../components/TabMenu/TabMenu";
import AcceptOrRejectForm from "../../components/TabMenu/Content/AcceptOrRejectForm";
import ReviewForm from "../../components/TabMenu/Content/ReviewForm";
import CommentForm from "../../components/TabMenu/Content/CommentForm";
import PDFView from "../../components/PDFView/PDFView";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import acceptReject from "../../services/acceptReject";

function AcceptOrRejectPaperView() {
	const { state } = useLocation()
	const { data } = state
	const [tabs, setTabs] = useState<ITabs[]>([])

	const navigate = useNavigate()

	const handleAcceptOrReject = (event: BaseSyntheticEvent) => {
		event?.preventDefault();
		let status = event.target.elements.accept_reject.value == 'accept' ? "ACCEPTED" : event.target.elements.accept_reject.value == 'reject' ? "REJECTED" : "";
		acceptReject(data.id, status)
			.then(response => {
				navigate(-1);
			})
			.catch(error => {
				console.error(error);
			});
	}

	useEffect(() => {
		setTabs([
			{ label: "Accept / Reject", content: <AcceptOrRejectForm handleFormSubmission={handleAcceptOrReject} previousRating={data.paperstatus ? data.paperstatus.toString() : ''} /> },
			{ label: "Reviews", content: <ReviewForm paperId={data.id} /> },
			{ label: "Comments", content: <CommentForm paperId={data.id} canAddComment={false} /> }
		]);
	}, [data])

	useEffect(() => {
		if ((Object.keys(data).length == 0)) navigate("/")
	}, [])

	return (
		<Box sx={{ display: "flex", flexDirection: "row" }}>
			<PDFView paperId={data.id} author={data.author} coAuthors={data.coauthors} />
			<TabMenu tabs={tabs} />
		</Box>
	);
}
export default AcceptOrRejectPaperView;
