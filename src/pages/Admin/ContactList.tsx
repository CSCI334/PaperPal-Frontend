import { Box, Button, Container, TableCell, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import TableView, {
  Data,
  HeadCell,
} from "../../components/TableView/TableView";
import createStatusMessage from "../../components/TableView/TableUtilContent";
import { Email } from "@mui/icons-material";
import getReviewerContact from "../../services/admin/getReviewerContact";
import axios from "axios";
import errorHandler from "../../services/utility/errorHandler";



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

export default  function ContactList() {


  const [rows, setRows] = useState<Data[]>([
  ]);
  useEffect(() => {
    
    axios.get<Data[]>('http://localhost:8000/contact')
        .then(response => {
          const transformedData = response.data.map((item) =>
          createContact(
            item.id.toString(),
            item.username.toString(),
            item.email.toString(),
            item.accountstatus.toString(),
            "SendEmail"
          )
        );
        console.log("test");
        setRows(transformedData);
        }).catch((error) => {errorHandler(error)});

  }, [])




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
      
      <TableRow key={row.id}>
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
    <Box sx={{  display: "flex", flexDirection: "column"}}>
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
  
 </Box>
    
  );
}
