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

    console.log(state);
    useEffect(() => {
        if ((Object.keys(data).length == 0)) navigate("/")
    }, [])

    const handleFormSubmission = useCallback((event: React.BaseSyntheticEvent) => {
        event.preventDefault();

        const rating = event.target.elements.rating.value;

        addPaperReview(rating, data.id, textInput)
            .then(response => {
                console.log(response);
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
        { label: "My Review", content: <RatingPaperForm handleFormSubmission={handleFormSubmission} /> }
    ];

    return (
        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <Box sx={{ marginLeft: "300px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <PDFView paperId={data.id} author={data.author} coAuthors={data.coauthors} />
                <Box
                    sx={{
                        marginTop: "100px",
                        width: "100%"
                    }}>
                    <TextField
                        label="Your Review"
                        multiline
                        fullWidth
                        value={textInput}
                        onChange={handleInputChange}
                        variant="outlined"
                        margin="normal"
                    />
                </Box>
            </Box>
            <Box sx={{ marginLeft: "0px" }}>
                <TabMenu tabs={tabs} />
            </Box>
        </Box>
    );
};
export default ReviewerAddReview;
