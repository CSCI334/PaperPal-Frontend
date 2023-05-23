import { Box, Button, Container, TextField } from "@mui/material";
import ContainerForm from "../../components/FormContainer/ContainerForm";
import { Add, Cancel } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import inviteReviewer from "../../services/admin/inviteReviewer";
import { useLoading, useSnackbar } from "../../context/FeedbackContext";

export default function AddNewContact() {
  const navigate = useNavigate();
  const { isLoading, setIsLoading } = useLoading()
  const { snackbar, setSnackbar } = useSnackbar()
  const [ { email, username }, setForm ] = useState({ email: "", username: "" });
  const inputHandler = (e: { target: { name: any; value: any; }; }) => {
    const name = e.target.name;
    const value = e.target.value;

    setForm((form) => ({ ...form, [ name ]: value }));
  };

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    setIsLoading(true);
    inviteReviewer({ email, username })
      .then(() => navigate("/contactlist"))
      .catch((value) => {
        const severity = value.status >= 500 ? "error" : "warning"
        setSnackbar({ message: value.message, severity: severity })
      })
      .finally(() => {
        setIsLoading(false)
      })
  };

  return (
    <Container sx={{ flexGrow: "1" }}>
      <ContainerForm
        title={"Add New Contact"}
        sx={{
          alignItems: "center",
        }}
      >
        <TextField
          variant={"outlined"}
          label="Reviewer Name"
          margin="normal"
          name="username"
          onChange={inputHandler}
          required
        />
        <TextField
          variant={"outlined"}
          label="Reviewer Email"
          type="email"
          margin="normal"
          name="email"
          onChange={inputHandler}
          required
        />
        <Button variant="contained" endIcon={<Add />} sx={{ mt: 2, mb: 2 }}
          color="button" onClick={handleSubmit} >
          Add New
        </Button>
        <Button variant="contained" endIcon={<Cancel />}
          color="error" onClick={() => navigate("/contactlist")}>
          Cancel
        </Button>
      </ContainerForm>
    </Container>
  );
}


