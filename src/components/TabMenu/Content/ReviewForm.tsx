interface IReviewFormProps { }

function ReviewForm(props: IReviewFormProps) {

    // TODO:: connect to backend and DB
    const mockData = [
        {
            reviewId: 1,
            reviewer: "Jerred Finch",
            reviewSubmitted: "01/01/2023",
            rating: "1"
        },
        {
            reviewId: 2,
            reviewer: "Jonathan C.",
            reviewSubmitted: "01/01/2023",
            rating: "2"
        },
        {
            reviewId: 3,
            reviewer: "Meghan Dickie",
            reviewSubmitted: "01/01/2023",
            rating: "1"
        }
    ]

    return (
        <div style={{ marginBottom: "8px" }}>
            {mockData.map((x, index) => (
                <div key={`review-${index}`} style={{ backgroundColor: "#D9D9D9", marginBottom: "8px", textAlign: "left", padding: "8px" }}>
                    <label>Reviewer: </label><span>{x.reviewer}</span><br />
                    <label>Review Submitted: </label><span>{x.reviewSubmitted}</span><br />
                    <label>Rating: </label><span>{x.rating}</span><br />
                    {/* TODO:: link to view review page */}
                    <span style={{ textDecorationLine: "underline" }}>View Review</span>
                </div>
            ))}
        </div>
    )
}
export default ReviewForm;