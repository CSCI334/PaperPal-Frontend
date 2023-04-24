import { Box, Container, TextField } from "@mui/material";
import ContainerForm from "../../components/FormContainer/ContainerForm";

export default function AddNewContact() {
  return (
      <Container sx={{ flexGrow: "1" }}>
        <ContainerForm
          title={"Add New Contact"}
          buttonText={"Add Contact"}
          sx={{
            alignItems: "center",
          }}
        >
          <TextField
            variant={"outlined"}
            label="Reviewer Name"
            margin="normal"
            required
          />
          <TextField
            variant={"outlined"}
            label="Reviewer Email"
            margin="normal"
            required
          />
        </ContainerForm>
      </Container>
  );
}
