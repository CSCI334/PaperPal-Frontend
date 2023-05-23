import { BaseSyntheticEvent, useState } from "react";

interface IAcceptOrRejectFormProps {
	handleFormSubmission: (event: BaseSyntheticEvent) => void;
	previousRating: string;
}

function AcceptOrRejectForm({ handleFormSubmission, previousRating }: IAcceptOrRejectFormProps) {
	const [selectedRating, setPreviousRating] = useState(previousRating ? previousRating.toString() : '');
	return (
		<div>
			<form onSubmit={handleFormSubmission}>
				<div style={{ textAlign: "left" }}>
					<input type="radio" id="accept" name="accept_reject" value="accept" checked={selectedRating === "accept"} onChange={() => setPreviousRating("accept")} />{" "}
					<label style={{ color: "white" }} htmlFor="accept">Accept</label><br />
					<input type="radio" id="reject" name="accept_reject" value="reject" checked={selectedRating === "reject"} onChange={() => setPreviousRating("reject")} />{" "}
					<label style={{ color: "white" }} htmlFor="reject">Reject</label><br />
					<br />
				</div>
				<input type="submit" value="Submit" style={{ backgroundColor: "#72BAD1", cursor: "pointer", color: "white", border: "0", width: "150px", padding: "8px", borderRadius: "5px" }} />
			</form>
		</div>
	)
}
export default AcceptOrRejectForm;
