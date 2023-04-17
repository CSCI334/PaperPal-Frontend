import { Box, Container, TextField } from "@mui/material";
import ContainerForm from "../../components/FormContainer/ContainerForm";

export default function CreateConference() {
  return (
    <Container sx={{ flexGrow: "1" }}>
      <Container sx={{ flexGrow: "1" }}>
        <ContainerForm
          title={"Create Conference"}
          buttonText={"Start Conference"}
          sx={{
            alignItems: "center",
          }}
        >
          <TextField
            variant={"outlined"}
            label="Conference Name"
            margin="normal"
            required
          />
          <TextField
            variant={"outlined"}
            label="Conference Location"
            margin="normal"
            required
          />
          <TextField
            variant={"outlined"}
            label="Conference Chair Name"
            margin="normal"
            required
          />
          <TextField
            variant={"outlined"}
            label="Conference Chair Email"
            margin="normal"
            required
          />
          <TextField
            variant={"outlined"}
            label="Paper Submission Deadline"
            margin="normal"
            InputLabelProps={{ shrink: true }}
            type="date"
            required
            value=""
          />
          <TextField
            variant={"outlined"}
            label="Paper Bidding Deadline"
            margin="normal"
            InputLabelProps={{ shrink: true }}
            type="date"
            required
            value=""
          />
          <TextField
            variant={"outlined"}
            label="Paper Announcement Deadline"
            margin="normal"
            InputLabelProps={{ shrink: true }}
            type="date"
            required
            value=""
          />
          <TextField
            variant={"outlined"}
            label="Conference Commenced Date"
            margin="normal"
            InputLabelProps={{ shrink: true }}
            type="date"
            required
            value=""
          />
        </ContainerForm>
      </Container>
    </Container>
  );
}
