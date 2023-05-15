import { Box, Button, Container, TableCell, TableRow } from "@mui/material";
import { useState } from "react";
import TableView, {
  Data,
  HeadCell,
} from "../../components/TableView/TableView";
import createStatusMessage from "../../components/TableView/TableUtilContent";
import { Edit } from "@mui/icons-material";

function createPaper(
  id: string,
  title: string,
  coauthors: string,
  author: string,
  status: string,
): Data {
  return {
    id,
    title,
    coauthors,
    author,
    status
  };
}

export default function AllPapersList() {
  // TODO:: connect to backend and DB
  const [ rows, setRows ] = useState<Data[]>([
    createPaper("1", "Paper 1", "-", "Billy Lambert", "Accepted"),
    createPaper("2", "Paper 2", "-", "Kiara Melendez", "Accepted"),
    createPaper("3", "Paper 3", "September 24, 2022", "Annalise Mccormick", "Rejected"),
    createPaper("4", "Paper 4", "December 29, 2020", "Khalil Colon", "Accepted"),
    createPaper("5", "Paper 5", "May 20, 2021", "Mercedes Patton", "Accepted"),
    createPaper("6", "Paper 6", "May 15, 2022", "Faris Osborn", "Rejected"),
    createPaper("7", "Paper 7", "February 27, 2020", "Kaylum Perkins", "Rejected"),
    createPaper("8", "Paper 8", "October 24, 2021", "Asma Acevedo", "Pending"),
    createPaper("9", "Paper 9", "November 7, 2022", "Leonardo Edwards", "Pending"),
    createPaper("10", "Paper 10", "May 29, 2020", "David Gray", "Pending"),
    createPaper("11", "Paper 11", "July 14, 2021", "Miranda Barber", "Rejected"),
    createPaper("12", "Paper 12", "December 31, 2022", "Gladys Patrick", "Rejected"),
  ]);

  const handleAcceptRejectButtonClick = (id: string) => {
    // TODO:: link to accept or reject paper view
  };

  const headCells: readonly HeadCell[] = [
    {
      id: "title",
      label: "Title",
    },
    {
      id: "author",
      label: "Author"
    },
    {
      id: "coauthors",
      label: "Co-author(s)",
    },
    {
      id: "accept_reject",
      label: "Accept / Reject",
    },
    {
      id: "status",
      label: "Status",
    }
  ];

  const rowComponent = (row: Data) => {
    return (
      <TableRow >
        <TableCell component="th" scope="row">{row.title}</TableCell>
        <TableCell>{row.author}</TableCell>
        <TableCell>{row.coauthors}</TableCell>
        <TableCell >
          <Button
            sx={{ textAlign: "center", p: 0, minWidth: "30px" }}
            color="button"
            onClick={() => handleAcceptRejectButtonClick(row.id.toString())}
          >
            {<Edit />}
          </Button>
        </TableCell>
        <TableCell>
          {createStatusMessage(row.status.toString())}
        </TableCell>
      </TableRow>
    );
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <TableView
        rows={rows}
        defaultOrderBy="title"
        headCells={headCells}
        rowComponent={rowComponent}
      />
    </Box>
  );
}
