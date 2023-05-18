import { Box, Button, Container, TableCell, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import TableView, {
  Data,
  HeadCell,
} from "../../components/TableView/TableView";
import createStatusMessage from "../../components/TableView/TableUtilContent";
import { Email, Add } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import getContactList from "../../services/getContactList";

function createContact(
  id: number,
  name: string,
  email: string,
  status: string,

): Data {
  return {
    id,
    name,
    email,
    status,

  };
}

export default function ContactList() {
  const [rows, setRows] = useState<Data[]>([]);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname !== '/contactlist') {
      return;
    }

    getContactList()
      .then((value) => {
        const contactList = value?.map((item) => {
          return createContact(
            item.id,
            item.username.toString(),
            item.email.toString(),
            item.accountstatus.toString(),

          )
        })
        setRows(contactList ?? [])
      })
      .catch(() => {
        console.log("sadf")
      })
  }, [])



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

      </TableRow>
    );
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ mt: 2, marginRight: "auto", mb: 2, ml: 2 }}>
        <Button variant="contained" endIcon={<Add />}
          color="button" onClick={() => navigate("/addcontact")}>
          Add New
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
