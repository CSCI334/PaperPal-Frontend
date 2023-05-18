import React, { useEffect } from "react";
import PDFView from "../../components/PDFView/PDFView";
import { Box } from "@mui/material";
import { useLocation, useNavigate } from 'react-router-dom';
import TabMenu, { ITabs } from "../../components/TabMenu/TabMenu";
import ReviewForm from "../../components/TabMenu/Content/ReviewForm";
import CommentForm from "../../components/TabMenu/Content/CommentForm";


//This class Renders the Reviewer view review page and deals with all components necessary for render
const ReviewerViewReviews: React.FC = () => {
    const { state } = useLocation()
    const { data } = state
    const navigate = useNavigate()

    const example: ITabs[] = [
        { label: "Reviews", content: <ReviewForm /> },
        { label: "Comments", content: <CommentForm canAddComment={true} /> }
    ];

    useEffect(() => {
        if ((Object.keys(data).length == 0)) navigate("/")

    }, [])

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
            <Box sx={{ display: "flex", flexDirection: "row" }}>
                <PDFView paperId={data.id} author={data.author} coAuthors={data.coauthors} />
                <TabMenu tabs={example} />
            </Box>
            <TabMenu tabs={tabs} />
        </div>
    );
};
export default ReviewerViewReviews;
