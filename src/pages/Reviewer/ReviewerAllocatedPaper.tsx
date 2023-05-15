import { Container, TableCell, TableRow, IconButton, Box } from "@mui/material";
import { useState } from "react";
import TableView, { Data, HeadCell } from "../../components/TableView/TableView";
import createStatusMessage from "../../components/TableView/TableUtilContent";
import { EditNote, Visibility } from '@mui/icons-material';
import { createSearchParams, useNavigate } from 'react-router-dom';

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

function ReviewerAllocatedPaper() {
    const navigate = useNavigate();
    // TODO:: connect to backend and DB
    const [ rows, setRows ] = useState<Data[]>([
        createPaper("1", "Paper 1", "September 9, 2020", "Billy Lambert", "Ready for Review"),
        createPaper("2", "Paper 2", "August 2, 2021", "Kiara Melendez", "Ready for Review"),
        createPaper("3", "Paper 3", "September 24, 2022", "Annalise Mccormick", "Ready for Review"),
        createPaper("4", "Paper 4", "December 29, 2020", "Khalil Colon", "Ready for Review"),
        createPaper("5", "Paper 5", "May 20, 2021", "Mercedes Patton", "Ready for Review"),
        createPaper("6", "Paper 6", "May 15, 2022", "Faris Osborn", "Reviewed"),
        createPaper("7", "Paper 7", "February 27, 2020", "Kaylum Perkins", "Reviewed"),
        createPaper("8", "Paper 8", "October 24, 2021", "Asma Acevedo", "Ready for Review"),
        createPaper("9", "Paper 9", "November 7, 2022", "Leonardo Edwards", "Ready for Review"),
        createPaper("10", "Paper 10", "May 29, 2020", "David Gray", "Ready for Review"),
        createPaper("11", "Paper 11", "July 14, 2021", "Miranda Barber", "Reviewed"),
        createPaper("12", "Paper 12", "December 31, 2022", "Gladys Patrick", "Reviewed"),
    ]);

    const handleReviewClick = (paperId: string) => {
        navigate({
            pathname: "/reviewerAddReview",
            search: createSearchParams({
                id: paperId
            }).toString()
        })
    };

    const handleViewClick = (paperId: string) => {
        navigate({
            pathname: "/reviewerView",
            search: createSearchParams({
                id: paperId
            }).toString()
        })
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
            label: "Status"
        },
        {
            id: "review",
            label: "My Review"
        },
        {
            id: "view",
            label: "View"
        }
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
                        onClick={() => handleReviewClick(row.id.toString())}
                    >
                        <EditNote />
                    </IconButton>
                </TableCell>
                <TableCell>
                    <IconButton
                        disabled={row.status !== "Reviewed"}
                        onClick={() => handleViewClick(row.id.toString())}
                    >
                        <Visibility />
                    </IconButton>
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
export default ReviewerAllocatedPaper;
