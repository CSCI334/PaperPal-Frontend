import React, { useEffect, useState, useCallback, BaseSyntheticEvent } from "react";
import PDFView from "../../components/PDFView/PDFView";
import { Box, TextField } from "@mui/material";
import { useLocation, useNavigate } from 'react-router-dom';
import TabMenu, { ITabs } from "../../components/TabMenu/TabMenu";
import addPaperReview from "../../services/addPaperReview";
import RatingPaperForm from "../../components/TabMenu/Content/RatingPaperForm";
import getReviews from "../../services/getReviews";
import getUser from "../../services/account/getUser";


//This class Renders the Reviewer add review page and deals with all components necessary for render
const ReviewerAddReview: React.FC = () => {
    const [textInput, setTextInput] = useState<string>("");
    const { state } = useLocation()
    const { data } = state
    const navigate = useNavigate()
    const [rating, setRating] = useState()

    useEffect(() => {
        if ((Object.keys(data).length == 0)) navigate("/")
    }, [])

    const handleFormSubmission = useCallback((event: React.BaseSyntheticEvent) => {
        event.preventDefault();

        const rating = event.target.elements.rating.value;

        addPaperReview(rating, data.id, textInput)
            .then(response => {
                navigate(-1);
            })
            .catch(error => {
                console.error(error);
            });
    }, [textInput, data.id, navigate]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTextInput(event.target.value);
    };

    const tabs: ITabs[] = [
        { label: "My Review", content: <RatingPaperForm handleFormSubmission={handleFormSubmission} previousRating={data.paperrating ? data.paperrating.toString() : ''} /> }
    ];

    return (
        <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
                <PDFView paperId={data.id} author={data.author} coAuthors={data.coauthors} />
                <TextField
                    label="Your Review"
                    multiline
                    size="medium"
                    inputProps={{ style: { minHeight: '30vh', minWidth: '50vh' } }}
                    value={textInput}
                    onChange={handleInputChange}
                    variant="outlined"
                    margin="normal"
                />
            </Box>



            <TabMenu tabs={tabs} />

        </Box>
    );
};
export default ReviewerAddReview;
