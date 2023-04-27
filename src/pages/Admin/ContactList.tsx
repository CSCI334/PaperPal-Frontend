import { Box, Button, Container, TableCell, TableRow } from "@mui/material";
import { useState } from "react";
import TableView, {
  Data,
  HeadCell,
} from "../../components/TableView/TableView";
import createStatusMessage from "../../components/TableView/TableUtilContent";
import { Email } from "@mui/icons-material";

function createContact(
  id:string,
  name: string, 
  email: string,
 status: string,
  action: string,
) : Data {
  return {
    id,
    name,
    email,
    status,
    action
  };
}

export default function ContactList() {
  const [rows, setRows] = useState<Data[]>([
    createContact("1","John", "john@gmail.com", "Accepted", "SendEmail"),
    createContact("2","Wickis", "john@gmail.com", "Accepted", "SendEmail"),
    createContact("3","Keren", "john@gmail.com", "Accepted", "SendEmail"),
    createContact("4","Luke", "john@gmail.com", "Accepted", "SendEmail"),
    createContact("5","Bob", "john@gmail.com", "Accepted", "SendEmail"),
    createContact("6","Ben", "john@gmail.com", "Rejected", "SendEmail"),
    createContact("7","Ben", "john@gmail.com", "Rejected", "SendEmail"),
    createContact("8","Dicky", "john@gmail.com", "Pending", "SendEmail"),
    createContact("9","Lofi", "john@gmail.com", "Pending", "SendEmail"),
    createContact("10","John", "john@gmail.com", "Pending", "SendEmail"),
    createContact("11","Alpha", "john@gmail.com", "Not Invited", "SendEmail"),
    createContact("12","Alpha", "john@gmail.com", "Not Invited", "SendEmail"),
  ]);

  const handleEmailButtonClick = (id: string) => {
    // Find the index of the row with the given id
    const rowIndex = rows.findIndex((row) => row.id === id);
    // If the row is found, update its status to "pending"
    if (rowIndex !== -1) {
      const updatedRows = [...rows]; // create a copy of the rows array
      updatedRows[rowIndex].status = "Pending";
      setRows(updatedRows); // set the state of rows with updatedRows array
    }
    alert(`Button clicked for row with id: ${id}`);
  };

  const headCells: readonly HeadCell[] = [
    
    {
      id: "name",
      label: "Name",
    },
    {
      id: "email",
      label: "Email",
    },
    {
      id: "status",
      label: "Status",
    },
    {
      id: "action",
      label: "Action",
    },
  ];

  const rowComponent = (row: Data) => {
    return (
      
      <TableRow>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell>{row.email}</TableCell>
        <TableCell>
          {createStatusMessage(row.status.toString())}
        </TableCell>
        <TableCell>
          <Button
            variant="contained"
            endIcon={<Email />}
            color="button"
            onClick={() => handleEmailButtonClick(row.id.toString())}
          >
            Send Email
          </Button>
        </TableCell>
      </TableRow>
      
     
    );
  };

  return (
    <Container sx={{  display: "flex", flexDirection: "column"}}>
      <Box sx={{ mt: 2, marginLeft: "auto"  }}>
    <Button variant="contained" >
      My Button
    </Button>
  </Box>
  <TableView
    rows={rows}
    defaultOrderBy="name"
    headCells={headCells}
    rowComponent={rowComponent}
  />
  
 </Container>
    
  );
}
