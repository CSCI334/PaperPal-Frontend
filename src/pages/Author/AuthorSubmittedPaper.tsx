import React, { useState } from "react";
import { Box, Container, TableCell, TableRow, IconButton , Button} from "@mui/material";
import TableView, {Data, HeadCell} from "../../components/TableView/TableView";
import createStatusMessage from "../../components/TableView/TableUtilContent";
import { Visibility } from '@mui/icons-material';
import DragDrop from '../../components/DragDrop/DragDrop';
import { createSearchParams, useNavigate } from 'react-router-dom';
import getAllPaper from "../../services/getAllPaper";

function createPaper(
    id: string,
    title: string,
    date: string,
    author: string,
    status: string
): Data {
    return {
        id,
        title,
        date,
        author,
        status
    };
}

//Class the deals with rendering of a page and any functionality needed
const AuthorSubmittedPaper: React.FC = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    // TODO:: connect to backend and DB
    const [rows, setRows] = useState<Data[]>([
        createPaper("1", "Paper 1", "September 9, 2020", "Billy Lambert", "Accepted"),
        createPaper("2", "Paper 2", "August 2, 2021", "Kiara Melendez", "Accepted"),
        createPaper("3", "Paper 3", "September 24, 2022", "Annalise Mccormick", "Accepted"),
        createPaper("4", "Paper 4", "December 29, 2020", "Khalil Colon", "In Review"),
        createPaper("5", "Paper 5", "May 20, 2021", "Mercedes Patton", "Accepted"),
        createPaper("6", "Paper 6", "May 15, 2022", "Faris Osborn", "Denied"),
        createPaper("7", "Paper 7", "February 27, 2020", "Kaylum Perkins", "Denied"),
        createPaper("8", "Paper 8", "October 24, 2021", "Asma Acevedo", "Accepted"),
        createPaper("9", "Paper 9", "November 7, 2022", "Leonardo Edwards", "In Review"),
        createPaper("10", "Paper 10", "May 29, 2020", "David Gray", "In Review"),
        createPaper("11", "Paper 11", "July 14, 2021", "Miranda Barber", "Denied"),
        createPaper("12", "Paper 12", "December 31, 2022", "Gladys Patrick", "Denied"),
    ]);

    //Deals with the opening of a DragDrop component
    const handleOpen = () => {
        // setOpen(true);
        getAllPaper();
    };

    //Deals with the closing of a DragDrop component
    const handleClose = () => {
        setOpen(false);
    };

    const handleViewClick = (paperId: string) => {
        navigate({
            pathname: "/AuthorViewRatings",
            search: createSearchParams({
                id: paperId
            }).toString()
        })
    };

    //Deals with what happens when files are uploaded in a DragDrop component
    //FURTHER IMPLEMENTATION REQUIRED
    const handleUpload = (file: File | null, paperName: string, coAuthors: string[]) => {
        console.log('File uploaded:', file);
        console.log('Paper Name:', paperName);
        console.log('Co Authors:', coAuthors);
    };

    const headCells: readonly HeadCell[] = [
        {
            id: "title",
            label: "Title",
        },
        {
            id: "date",
            label: "Date",
        },
        {
            id: "author",
            label: "Author"
        },
        {
            id: "status",
            label: "Status",
        },
        {
            id: "view",
            label: "View"
        },
    ];

    const rowComponent = (row: Data) => {
        return (
            <TableRow>
                <TableCell component="th" scope="row">{row.title}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.author}</TableCell>
                <TableCell>
                    {createStatusMessage(row.status.toString())}
                </TableCell>
                <TableCell>
                    <IconButton
                        onClick={() => handleViewClick(row.id.toString())}
                    >
                        <Visibility />
                    </IconButton>
                </TableCell>
            </TableRow>
        );
    };

    //Renders a page that a user can see previously submitted files and allows for the submission of new files
    return (
        <Container >
            <Box sx={{
                marginTop: "50px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end"
            }}
            >
                <DragDrop open={open} onClose={handleClose} onUpload={handleUpload} />
                <TableView
                    rows={rows}
                    defaultOrderBy="title"
                    headCells={headCells}
                    rowComponent={rowComponent}
                />
                <Button
                    sx={{
                        backgroundColor: "#72BAD1",
                        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.075)",
                        borderRadius: "20px",
                        margin: "16px 0 0 0",
                        width: "150px",
                        color: "white"
                    }}
                        onClick={handleOpen}
                >
                    Submit new paper
                </Button>
            </Box>
        </Container>
    );
};
export default AuthorSubmittedPaper;
