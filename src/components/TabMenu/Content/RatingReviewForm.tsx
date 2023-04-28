import { BaseSyntheticEvent } from "react";

interface IRatingReviewProps {
	handleFormSubmission: (event: BaseSyntheticEvent) => void;
}

function RatingReviewForm({ handleFormSubmission }: IRatingReviewProps) {
	{/* TODO:: add functionlity to load as edit form */}
	return (
		<div>
			<form onSubmit={handleFormSubmission}>
				<div style={{ textAlign: "left" }}>
					<input type="radio" id="3" name="rating_review" value="3" />{" "}
					<label style={{ color: "white" }} htmlFor="3">3 - Very Fair Review</label><br />
					<input type="radio" id="2" name="rating_review" value="2" />{" "}
					<label style={{ color: "white" }} htmlFor="2">2 - Fair Review</label><br />
                    <input type="radio" id="1" name="rating_review" value="1" />{" "}
					<label style={{ color: "white" }} htmlFor="1">1 - Slightly Fair Review</label><br />
					<input type="radio" id="0" name="rating_review" value="0" />{" "}
					<label style={{ color: "white" }} htmlFor="0">0 - Borderline Review</label><br />
                    <input type="radio" id="-1" name="rating_review" value="-1" />{" "}
					<label style={{ color: "white" }} htmlFor="-1">-1 - Slightly Biased Reject</label><br />
					<input type="radio" id="-2" name="rating_review" value="-2" />{" "}
					<label style={{ color: "white" }} htmlFor="-2">-2 - Biased Review</label><br />
                    <input type="radio" id="-3" name="rating_review" value="-3" />{" "}
					<label style={{ color: "white" }} htmlFor="-3">-3 - Very Biased Review</label><br />
					<br />
				</div>
				<input type="submit" value="Submit" style={{ backgroundColor: "#72BAD1", color: "white", border: "0", width: "150px", padding: "8px", borderRadius: "5px" }} />
			</form>
		</div>
	)
}
export default RatingReviewForm;