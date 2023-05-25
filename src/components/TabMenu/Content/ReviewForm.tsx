import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import getReviews from "../../../services/getReviews";
import getUser from "../../../services/account/getUser";
import { Label } from "@mui/icons-material";
import { useAuth } from "../../../context/AuthContext";

interface IReviewFormProps {
    paperId: any;
}

function ReviewForm(props: IReviewFormProps) {
    const navigate = useNavigate();
    const { authState } = useAuth();
    const [rows, setRows] = useState<any[]>([]);

    // get reviews
    React.useEffect(() => {
        getReviews(props.paperId)
            .then((value) => {
                setRows(value ?? [])
            })
    }, [])

    // handles review click - navigates to review view
    const handleViewReviewClick = (data: any) => {
        navigate(`/AuthorRateReview`, { state: { data: data } })
    };
    // console.log(authState.userData)
    return (
        <div style={{ marginBottom: "8px" }}>
            {rows.map((x, index) => (
                <div key={`review-${index}`} style={{ backgroundColor: "#D9D9D9", marginBottom: "8px", textAlign: "left", padding: "8px" }}>
                    <label>Reviewer: </label><span>{x.reviewername}</span><br />
                    {x.review === null && (<label>No Review <br /></label>)}
                    {x.review !== null && (<label>Rating: {x.paperrating} <br /></label>)}
                    {authState.userData.accountType === "AUTHOR" && x.review !== null && (<label>My Rating: {x.reviewrating} <br /></label>)}
                    {x.review !== null && (<span style={{ textDecorationLine: "underline", cursor: "pointer" }} onClick={() => handleViewReviewClick(x)}>View Review <br /></span>)}

                </div>
            ))}
            {rows.length == 0 && (
                <div style={{ color: "white" }}>No Reviews</div>
            )}
        </div>
    )
}
export default ReviewForm;