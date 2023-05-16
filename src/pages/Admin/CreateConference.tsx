import { Box, Container, TextField } from "@mui/material";
import ContainerForm from "../../components/FormContainer/ContainerForm";
import { ConferenceInfoProps } from "./ConferenceDetail";
import { useState } from "react";
import dayjs from "dayjs";
import createConference from "../../services/admin/createConference";
import { useNavigate } from "react-router-dom";
import { useLoading, useSnackbar } from "../../context/FeedbackContext";


export default function CreateConference() {
  const { isLoading, setIsLoading } = useLoading()
  const { snackbar, setSnackbar } = useSnackbar()
  const [conferenceDetail, setConferenceDetail] = useState<ConferenceInfoProps>({
    id: 1,
    name: "",
    location: "",
    chairName: "",
    chairEmail: "",
    paperSubmissionDeadline: dayjs(''),
    paperBiddingDeadline: dayjs(''),
    paperAnnouncement: dayjs(''),
    paperReviewDeadline: dayjs('')
  });

  const navigate = useNavigate();


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    // Perform any validation or additional logic here before submitting
    createConference(conferenceDetail).then(() => navigate("/"))
    // Submit the form data
    console.log(conferenceDetail);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setConferenceDetail((prevConferenceDetail) => ({
      ...prevConferenceDetail,
      [name]: value,
    }));
  };
  return (
    <Container sx={{ flexGrow: "1" }}>
      <Container sx={{ flexGrow: "1" }}>
        <ContainerForm
          title={"Create Conference"}
          buttonText={"Start Conference"}
          sx={{
            alignItems: "center",
          }}
          onSubmit={handleSubmit}
        >
          <TextField
            variant={"outlined"}
            label="Conference Name"
            margin="normal"
            name="name"
            value={conferenceDetail.name}
            onChange={handleChange}

            required
          />
          <TextField
            variant={"outlined"}
            label="Conference Location"
            margin="normal"
            name="location"
            value={conferenceDetail.location}
            onChange={handleChange}
            required
          />
          <TextField
            variant={"outlined"}
            label="Conference Chair Name"
            margin="normal"
            name="chairName"
            value={conferenceDetail.chairName}
            onChange={handleChange}
            required
          />
          <TextField
            variant={"outlined"}
            label="Conference Chair Email"
            margin="normal"
            name="chairEmail"
            value={conferenceDetail.chairEmail}
            onChange={handleChange}
            required
          />
          <TextField
            variant={"outlined"}
            label="Paper Submission Deadline"
            margin="normal"
            InputLabelProps={{ shrink: true }}
            type="date"
            required
            name="paperSubmissionDeadline"
            value={conferenceDetail.paperSubmissionDeadline}
            onChange={handleChange}
          />
          <TextField
            variant={"outlined"}
            label="Paper Bidding Deadline"
            margin="normal"
            InputLabelProps={{ shrink: true }}
            type="date"
            required
            name="paperBiddingDeadline"
            value={conferenceDetail.paperBiddingDeadline}
            onChange={handleChange}
          />
          <TextField
            variant={"outlined"}
            label="Paper Review Deadline"
            margin="normal"
            InputLabelProps={{ shrink: true }}
            type="date"
            required
            name="paperReviewDeadline"
            value={conferenceDetail.paperReviewDeadline}
            onChange={handleChange}
          />
          <TextField
            variant={"outlined"}
            label="Conference Commenced Date"
            margin="normal"
            InputLabelProps={{ shrink: true }}
            type="date"
            required
            name="paperAnnouncement"
            value={conferenceDetail.paperAnnouncement}
            onChange={handleChange}
          />
        </ContainerForm>
      </Container>
    </Container>
  );
}
