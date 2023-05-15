import { Box, Button, Container, TableCell, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import TableView, {
    Data,
    HeadCell,
} from "../../components/TableView/TableView";
import createStatusMessage from "../../components/TableView/TableUtilContent";
import { Edit } from "@mui/icons-material";
import getAllPaper from "../../services/getAllPaper";
import { GenericForm } from "../../types/GenericForm";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../../context/FeedbackContext";

function createPaper(
    id: number,
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
    const [ rows, setRows ] = useState<Data[]>([]);
    const { isLoading, setIsLoading } = useLoading()
    const navigate = useNavigate()
    const handleAcceptRejectButtonClick = (id: string, data: Data) => {
        navigate(`/judge`, { state: { data: data } })
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

    useEffect(() => {
        setIsLoading(true)
        getAllPaper()
            .then((value) => {
                value = value ?? []
                const rows = value.map((value: GenericForm) => {
                    if (value.paperstatus === "TBD") value.paperstatus = "Pending"
                    return createPaper(value.id, value.title, value.coauthors, value.author, value.paperstatus)
                })
                setRows(rows ?? [])
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [])

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
                        onClick={() => handleAcceptRejectButtonClick(row.id.toString(), row)}
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
