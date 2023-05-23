import {BaseSyntheticEvent, useState} from "react";

interface IRatingReviewProps {
	handleFormSubmission: (event: BaseSyntheticEvent) => void;
	previousRating: string;
}

function RatingReviewForm({ handleFormSubmission, previousRating }: IRatingReviewProps) {
	const [selectedRating, setPreviousRating] = useState(previousRating ? previousRating.toString() : '0');
	return (
		<div>
			<form onSubmit={handleFormSubmission}>
				<div style={{ textAlign: "left" }}>
					<input type="radio" id="3" name="rating_review" value="3" checked={selectedRating === "3"} onChange={() => setPreviousRating("3")} />{" "}
					<label style={{ color: "white" }} htmlFor="3">3 - Very Fair Review</label><br />
					<input type="radio" id="2" name="rating_review" value="2" checked={selectedRating === "2"} onChange={() => setPreviousRating("2")}/>{" "}
					<label style={{ color: "white" }} htmlFor="2">2 - Fair Review</label><br />
					<input type="radio" id="1" name="rating_review" value="1" checked={selectedRating === "1"} onChange={() => setPreviousRating("1")}/>{" "}
					<label style={{ color: "white" }} htmlFor="1">1 - Slightly Fair Review</label><br />
					<input type="radio" id="0" name="rating_review" value="0" checked={selectedRating === "0"} onChange={() => setPreviousRating("0")}/>{" "}
					<label style={{ color: "white" }} htmlFor="0">0 - Borderline Review</label><br />
					<input type="radio" id="-1" name="rating_review" value="-1" checked={selectedRating === "-1"} onChange={() => setPreviousRating("-1")}/>{" "}
					<label style={{ color: "white" }} htmlFor="-1">-1 - Slightly Biased Reject</label><br />
					<input type="radio" id="-2" name="rating_review" value="-2" checked={selectedRating === "-2"} onChange={() => setPreviousRating("-2")}/>{" "}
					<label style={{ color: "white" }} htmlFor="-2">-2 - Biased Review</label><br />
					<input type="radio" id="-3" name="rating_review" value="-3" checked={selectedRating === "-3"} onChange={() => setPreviousRating("-3")}/>{" "}
					<label style={{ color: "white" }} htmlFor="-3">-3 - Very Biased Review</label><br />
					<br />
				</div>
				<input type="submit" value="Submit" style={{ backgroundColor: "#72BAD1", color: "white", border: "0", width: "150px", padding: "8px", borderRadius: "5px" }} />
			</form>
		</div>
	)
}
export default RatingReviewForm;
