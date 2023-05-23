import React, { useState } from "react";
import { Box, Container, TableCell, TableRow, IconButton, Button } from "@mui/material";
import TableView, { Data, HeadCell } from "../../components/TableView/TableView";
import createStatusMessage from "../../components/TableView/TableUtilContent";
import { Visibility } from '@mui/icons-material';
import DragDrop from '../../components/DragDrop/DragDrop';
import { useNavigate } from 'react-router-dom';
import getAllPaper from "../../services/getAllPaper";
import { GenericForm } from "../../types/GenericForm";
import uploadPaper from "../../services/author/uploadPaper";
import { useAuth } from "../../context/AuthContext";
import httpOnClick from "../../hooks/httpOnClick";
import { useLoading, useSnackbar } from "../../context/FeedbackContext";

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

//Class the deals with rendering of a page and any functionality needed
const AuthorSubmittedPaper: React.FC = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const { authState, setAuthState } = useAuth()
    const username = authState.userData.username;
    const [rows, setRows] = useState<Data[]>([]);
    const [triggerReload, setTriggerReload] = useState<number>(0);
    const { isLoading, setIsLoading } = useLoading()
    const { snackbar, setSnackbar } = useSnackbar()

    // gets all papers from backend and creates paper objects out of them
    React.useEffect(() => {
        getAllPaper()
            .then((value) => {
                value = value ?? []
                const rows = value.map((value: GenericForm) => {
                    if (value.paperstatus == "TBD") value.paperstatus = "In Review"
                    if (value.paperstatus == "") value.paperstatus = ""
                    return createPaper(value.id, value.title, username, value.coauthors, value.paperstatus)
                })
                setRows(rows ?? [])
            })
    }, [username, triggerReload])

    //Deals with the opening of a DragDrop component
    const handleOpen = () => {
        setOpen(true);
    };

    //Deals with the closing of a DragDrop component
    const handleClose = () => {
        setOpen(false);
    };




    //Deals with what happens when files are uploaded in a DragDrop component
    const handleUpload = (file: File | null, paperName: string, coAuthors: string[]) => {
        uploadPaper(file!, paperName, coAuthors.join(', '))
            .then((value) => {
                let message = "Submit Paper Success"
                setSnackbar({ message: message, severity: "success" })
                console.log(value)
            })
            .catch((value) => {
                const severity = value.status >= 500 ? "error" : "warning"
                setSnackbar({ message: value.message, severity: severity })
            })

        setTriggerReload(triggerReload + 1)
    };

    // Deals with clicking the view paper button
    const handleViewClick = (data: Data) => {
        navigate(`/AuthorViewRatings`, { state: { data: data } })
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
                <TableCell>{row.author}</TableCell>
                <TableCell>{row.coauthors}</TableCell>
                <TableCell>
                    {createStatusMessage(row.status.toString())}
                </TableCell>
                <TableCell>
                    <IconButton
                        onClick={() => handleViewClick(row)}
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
