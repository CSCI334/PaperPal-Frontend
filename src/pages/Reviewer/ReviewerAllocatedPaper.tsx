import { TableCell, TableRow, IconButton, Box } from "@mui/material";
import {useEffect, useState} from "react";
import TableView, { Data, HeadCell } from "../../components/TableView/TableView";
import createStatusMessage from "../../components/TableView/TableUtilContent";
import getAllPaper from "../../services/getAllPaper";
import { EditNote, Visibility } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import {GenericForm} from "../../types/GenericForm";

//A function to create papers
function createPaper(
    id: string,
    title: string,
    author: string,
    coauthors: string,
    status: string
): Data {
    return {
        id,
        title,
        author,
        coauthors,
        status
    };
}
// TODO :: implement a way to stop pages showing up in the bidding phase
//This deals with rendering all the allocated papers a reviewer has and other functionality such as moving to different pages related to this one
function ReviewerAllocatedPaper() {
    const navigate = useNavigate();
    const [ rows, setRows ] = useState<Data[]>([]);

    //gets all papers from backend and creates paper objects out of them
    useEffect(() => {
        getAllPaper()
            .then((value) => {
                value = value ?? []
                const rows = value.map((value: GenericForm) => {
                    if (value.paperrating === null) {
                        value.paperstatus = "Ready for Review"
                    }
                    else {
                        value.paperstatus = "Reviewed"
                    }
                    return createPaper(value.id, value.title, value.username, value.coauthors, value.paperstatus)
                })
                setRows(rows ?? [])
            })
    }, [])

    //Sends the user to the addReview page
    const handleReviewClick = (data: Data) => {
        navigate(`/reviewerAddReview`, { state: { data: data } })
    };

    //Sends the user to the View page
    const handleViewClick = (data: Data) => {
        navigate(`/reviewerView`, { state: { data: data } })
    };

    //Generates the table header cells
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

    //Generates all table rows except for the header row
    const rowComponent = (row: Data) => {
        return (
            <TableRow>
                <TableCell component="th" scope="row">{row.title}</TableCell>
                <TableCell>{row.author}</TableCell>
                <TableCell>{row.coauthors}</TableCell>
                <TableCell>
                    {createStatusMessage(row.status.toString())}
                </TableCell>
                <TableCell>
                    <IconButton
                        disabled={row.status === "Reviewed"}
                        onClick={() => handleReviewClick(row)}
                    >
                        <EditNote />
                    </IconButton>
                </TableCell>
                <TableCell>
                    <IconButton
                        disabled={row.status !== "Reviewed"}
                        onClick={() => handleViewClick(row)}
                    >
                        <Visibility />
                    </IconButton>
                </TableCell>
            </TableRow>
        );
    };

    //Renders all allocated papers
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
