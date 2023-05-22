import React, { BaseSyntheticEvent, useEffect, useState } from "react";
import PDFView from "../../components/PDFView/PDFView";
import { Box } from "@mui/material";
import { useLocation, useNavigate } from 'react-router-dom';
import TabMenu, { ITabs } from "../../components/TabMenu/TabMenu";
import ReviewForm from "../../components/TabMenu/Content/ReviewForm";
import CommentForm from "../../components/TabMenu/Content/CommentForm";
import addComments from "../../services/addComments";
import { AuthContext, useAuth } from "../../context/AuthContext";


//This class Renders the Reviewer view review page and deals with all components necessary for render
const ReviewerViewReviews: React.FC = () => {
    const { state } = useLocation()
    const { data } = state
    const navigate = useNavigate()
    const [tabs, setTabs] = useState<ITabs[]>([])
    const [triggerReload, setTriggerReload] = useState<number>(0)
    // @meghan define auth state
    const { authState } = useAuth();

    useEffect(() => {
        if ((Object.keys(data).length == 0)) navigate("/")
    }, [])

    const handleCommentForm = (event: BaseSyntheticEvent) => {
        event?.preventDefault();
        addComments(event.target[0].value, data.id).then((value) => { setTabs([]); setTriggerReload(triggerReload + 1); })
    }

    useEffect(() => {
        // get the current logged user account type
        console.log(authState.userData.accountType);
        setTabs([
            { label: "Reviews", content: <ReviewForm paperId={data.id} /> },
            { label: "Comments", content: <CommentForm paperId={data.id} canAddComment={true} handleSubmit={handleCommentForm} /> }
        ]);
    }, [data, triggerReload])

    return (
        <Box sx={{ display: "flex", flexDirection: "row" }}>
            <PDFView paperId={data.id} author={data.author} coAuthors={data.coauthors} />
            <TabMenu tabs={tabs} />
        </Box>
    );
};
export default ReviewerViewReviews;
