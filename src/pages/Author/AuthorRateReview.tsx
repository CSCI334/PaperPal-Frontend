import React, { BaseSyntheticEvent, useEffect, useState } from "react";
import { Container } from "@mui/material";
import TabMenu, { ITabs } from "../../components/TabMenu/TabMenu";
import RatingReviewForm from "../../components/TabMenu/Content/RatingReviewForm";
import { useLocation, useNavigate } from "react-router-dom";
import rateReview from "../../services/author/rateReview";


//This class Renders the AuthorView ratings page and deals with all components necessary for render
const AuthorRateReview: React.FC = () => {
    const { state } = useLocation()
    const { data } = state
    const navigate = useNavigate()
    const [tabs, setTabs] = useState<ITabs[]>([])

    useEffect(() => {
        if ((Object.keys(data).length == 0)) navigate("/")
    }, [])

    useEffect(() => {
        setTabs([
            { label: "Rating of Review", content: <RatingReviewForm handleFormSubmission={handleRatingForm} previousRating={data.reviewrating ? data.reviewrating.toString() : '0'} /> }
        ]);
    }, [data])

    const handleRatingForm = (event: BaseSyntheticEvent) => {
        event?.preventDefault();
        console.log(data)
        const rating = event.target.elements.rating_review.value;
        rateReview(rating, data.paperid)
            .then(response => {
                navigate(-1);
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <div style={{ display: "flex", height: "100%" }}>
            <Container maxWidth="md" sx={{ display: "flex", flexDirection: "column", minHeight: "100%" }}>
                <div style={{ display: 'flex', justifyContent: "space-between" }}>
                    <div style={{ display: "flex" }}>
                        <p style={{ marginRight: '10px' }}>Reviewer: {data.reviewerid}</p>
                        <p>Paper Rating: {data.paperrating}</p>
                    </div>
                    <div>
                        <p><strong>Your Rating:</strong> {data.reviewrating == null ? "No Rating Provided" : data.reviewrating}</p>
                    </div>
                </div>
                <textarea key={`comment-keys`} style={{ resize: "none" }} id="review" value={data.review} name={`review`} disabled cols={30} rows={30} />
            </Container>
            <TabMenu tabs={tabs} />
        </div>
    );
};
export default AuthorRateReview;
