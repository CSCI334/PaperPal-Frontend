import { BaseSyntheticEvent } from "react";

interface IRatingPaperProps {
	handleFormSubmission: (event: BaseSyntheticEvent) => void;
}

function RatingPaperForm({ handleFormSubmission }: IRatingPaperProps) {
	{/* TODO:: add functionlity to load as edit form */}
	return (
		<div>
			<form onSubmit={handleFormSubmission}>
				<div style={{ textAlign: "left" }}>
					<input type="radio" id="3" name="rating" value="3" />{" "}
					<label style={{ color: "white" }} htmlFor="3">3 - Strong Accept</label><br />
					<input type="radio" id="2" name="rating" value="2" />{" "}
					<label style={{ color: "white" }} htmlFor="2">2 - Accept</label><br />
                    <input type="radio" id="1" name="rating" value="1" />{" "}
					<label style={{ color: "white" }} htmlFor="1">1 - Weak Accept</label><br />
					<input type="radio" id="0" name="rating" value="0" />{" "}
					<label style={{ color: "white" }} htmlFor="0">0 - Borderline Paper</label><br />
                    <input type="radio" id="-1" name="rating" value="-1" />{" "}
					<label style={{ color: "white" }} htmlFor="-1">-1 - Weak Reject</label><br />
					<input type="radio" id="-2" name="rating" value="-2" />{" "}
					<label style={{ color: "white" }} htmlFor="-2">-2 - Reject</label><br />
                    <input type="radio" id="-3" name="rating" value="-3" />{" "}
					<label style={{ color: "white" }} htmlFor="-3">-3 - Strong Reject</label><br />
					<br />
				</div>
				<input type="submit" value="Submit" style={{ backgroundColor: "#72BAD1", color: "white", border: "0", width: "150px", padding: "8px", borderRadius: "5px" }} />
			</form>
		</div>
	)
}
export default RatingPaperForm;