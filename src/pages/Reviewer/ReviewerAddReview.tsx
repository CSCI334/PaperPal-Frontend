import React, { useEffect, useState, useCallback, BaseSyntheticEvent } from "react";
import PDFView from "../../components/PDFView/PDFView";
import { Box, TextField } from "@mui/material";
import { useLocation, useNavigate } from 'react-router-dom';
import TabMenu, { ITabs } from "../../components/TabMenu/TabMenu";
import addPaperReview from "../../services/addPaperReview";
import RatingPaperForm from "../../components/TabMenu/Content/RatingPaperForm";
import getReviews from "../../services/getReviews";
import getUser from "../../services/account/getUser";
import useHttpRequest from "../../hooks/useHttpRequest";
import { useAuth } from "../../context/AuthContext";

// const useConditionalHttpRequest = (shouldRunEffect: boolean, data: any) => {
//     useEffect(() => {
//         if (shouldRunEffect) {
//             useHttpRequest(getReviews(data.id), (data) => {
//                 data = data ?? [];
//                 console.log(data);
//             }, []);
//         }
//     }, [shouldRunEffect, data]);
// };



//This class Renders the Reviewer add review page and deals with all components necessary for render
const ReviewerAddReview: React.FC = () => {
    const [textInput, setTextInput] = useState<string>("");
    const { state } = useLocation()
    const { data } = state
    const navigate = useNavigate()
    const { authState } = useAuth();
    const [rating, setRating] = useState<number>()
    let shouldRunEffect = false;
    console.log("yo")
    // if (data.status !== "Ready for Review") {
    //     // console.log("test")
    //     shouldRunEffect = true;
    // }
    // useConditionalHttpRequest(shouldRunEffect, data);
    // useEffect(() => {
    //     if (shouldRunEffect) {
    //         useHttpRequest(getReviews(data.id), (data) => {
    //             data = data ?? [];
    //             console.log(data);
    //         }, []);
    //     }
    // }, [shouldRunEffect]);

    // useHttpRequest(getReviews(data.id), (value) => {
    //     value = value ?? []
    //     const foundObject = value.find((obj: { reviewername: any, reviewrating: any }) => obj.reviewername === authState.userData.username);
    //     console.log(foundObject);
    //     setTextInput(foundObject.review)
    //     setRating(foundObject.paperrating)
    // }, [], shouldRunEffect)

    useEffect(() => {
        if ((Object.keys(data).length == 0)) navigate("/")
        if (data.status !== "Ready for Review") {
            getReviews(data.id).then((value) => {
                const foundObject = value.find((obj: { reviewername: any, reviewrating: any }) => obj.reviewername === authState.userData.username);
                console.log(foundObject);
                setTextInput(foundObject.review)
                setRating(foundObject.paperrating)
            })
        }

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
        console.log(state);
        setTextInput(event.target.value);
    };

    const tabs: ITabs[] = [
        { label: "My Review", content: <RatingPaperForm handleFormSubmission={handleFormSubmission} previousRating={data.paperrating ? data.paperrating.toString() : ''} backendRating={rating?.toString()} /> }
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
