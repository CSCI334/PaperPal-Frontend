import { Box, Container, Tab, Tabs, Typography } from "@mui/material";
import React, { BaseSyntheticEvent, useEffect, useState } from "react";
import TabMenu, { ITabs } from "../../components/TabMenu/TabMenu";
import AcceptOrRejectForm from "../../components/TabMenu/Content/AcceptOrRejectForm";
import ReviewForm from "../../components/TabMenu/Content/ReviewForm";
import CommentForm from "../../components/TabMenu/Content/CommentForm";
import PDFView from "../../components/PDFView/PDFView";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import acceptReject from "../../services/acceptReject";
import httpOnClick from "../../hooks/httpOnClick";
import { useLoading, useSnackbar } from "../../context/FeedbackContext";

function AcceptOrRejectPaperView() {
	const { state } = useLocation()
	const { data } = state
	const [tabs, setTabs] = useState<ITabs[]>([])
	const { isLoading, setIsLoading } = useLoading()
	const { snackbar, setSnackbar } = useSnackbar()
	const navigate = useNavigate()


	const handleAcceptOrReject = (event: BaseSyntheticEvent) => {
		event?.preventDefault();
		setIsLoading(true)
		let status = event.target.elements.accept_reject.value == 'accept' ? "ACCEPTED" : event.target.elements.accept_reject.value == 'reject' ? "REJECTED" : "";
		acceptReject(data.id, status)
			.then(response => {
				setSnackbar({ message: "Successfully submit judgement", severity: "success" })
				setIsLoading(false)
				navigate(-1);
			})
			.catch(error => {
				setIsLoading(false);
				const severity = error.status >= 500 ? "error" : "warning"
				setSnackbar({ message: error.message, severity: severity })
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
