import { Typography } from "@mui/material";
import { BaseSyntheticEvent, useState } from "react";

interface IRatingPaperProps {
	handleFormSubmission: (event: BaseSyntheticEvent) => void;
	previousRating: string;
	backendRating?: string;
}

function RatingPaperForm({ handleFormSubmission, previousRating, backendRating }: IRatingPaperProps) {
	const [selectedRating, setPreviousRating] = useState(previousRating);
	// const [storedRating, setStoredRating] = useState(backendRating);
	console.log(backendRating)
	// console.log(backendRating)
	// console.log(storedRating)
	return (
		<div>
			<form onSubmit={handleFormSubmission}>
				<div style={{ textAlign: "left" }}>
					{backendRating !== undefined && (<Typography variant="body1" color={"white"} sx={{ mb: '10px' }}>Current Rating: {backendRating}</Typography>)}
					<input type="radio" id="3" name="rating" value="3" checked={selectedRating === "3"} onChange={() => setPreviousRating("3")} />{" "}
					<label style={{ color: "white" }} htmlFor="3">3 - Strong Accept</label><br />
					<input type="radio" id="2" name="rating" value="2" checked={selectedRating === "2"} onChange={() => setPreviousRating("2")} />{" "}
					<label style={{ color: "white" }} htmlFor="2">2 - Accept</label><br />
					<input type="radio" id="1" name="rating" value="1" checked={selectedRating === "1"} onChange={() => setPreviousRating("1")} />{" "}
					<label style={{ color: "white" }} htmlFor="1">1 - Weak Accept</label><br />
					<input type="radio" id="0" name="rating" value="0" checked={selectedRating === "0"} onChange={() => setPreviousRating("0")} />{" "}
					<label style={{ color: "white" }} htmlFor="0">0 - Borderline Paper</label><br />
					<input type="radio" id="-1" name="rating" value="-1" checked={selectedRating === "-1"} onChange={() => setPreviousRating("-1")} />{" "}
					<label style={{ color: "white" }} htmlFor="-1">-1 - Weak Reject</label><br />
					<input type="radio" id="-2" name="rating" value="-2" checked={selectedRating === "-2"} onChange={() => setPreviousRating("-2")} />{" "}
					<label style={{ color: "white" }} htmlFor="-2">-2 - Reject</label><br />
					<input type="radio" id="-3" name="rating" value="-3" checked={selectedRating === "-3"} onChange={() => setPreviousRating("-3")} />{" "}
					<label style={{ color: "white" }} htmlFor="-3">-3 - Strong Reject</label><br />
					<br />
				</div>
				<input type="submit" value="Submit" style={{ backgroundColor: "#72BAD1", color: "white", border: "0", width: "150px", padding: "8px", borderRadius: "5px" }} />
			</form>
		</div>
	)
}
export default RatingPaperForm;