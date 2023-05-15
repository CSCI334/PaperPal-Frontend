import { BaseSyntheticEvent } from "react";

interface IAcceptOrRejectFormProps {
	handleFormSubmission: (event: BaseSyntheticEvent) => void;
}

function AcceptOrRejectForm({ handleFormSubmission }: IAcceptOrRejectFormProps) {
	{/* TODO:: add functionlity to load as edit form */ }
	return (
		<div>
			<form onSubmit={handleFormSubmission}>
				<div style={{ textAlign: "left" }}>
					<input type="radio" id="accept" name="accept_reject" value="accept" />{" "}
					<label style={{ color: "white" }} htmlFor="accept">Accept</label><br />
					<input type="radio" id="reject" name="accept_reject" value="reject" />{" "}
					<label style={{ color: "white" }} htmlFor="reject">Reject</label><br />
					<br />
				</div>
				<input type="submit" value="Submit" style={{ backgroundColor: "#72BAD1", cursor: "pointer", color: "white", border: "0", width: "150px", padding: "8px", borderRadius: "5px" }} />
			</form>
		</div>
	)
}
export default AcceptOrRejectForm;
