import { TableCell, TableRow, IconButton, Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import TableView, { Data, HeadCell } from "../../components/TableView/TableView";
import createStatusMessage from "../../components/TableView/TableUtilContent";
import getAllPaper from "../../services/getAllPaper";
import getConferenceInfo from "../../services/admin/getConferenceInfo";
import { EditNote, Visibility } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { GenericForm } from "../../types/GenericForm";
import useHttpRequest from "../../hooks/useHttpRequest";

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

interface ReviewerAllocatedPaperProps {
    phase: string;
    deadline: Date;
}
//This deals with rendering all the allocated papers a reviewer has and other functionality such as moving to different pages related to this one
function ReviewerAllocatedPaper() {
    const navigate = useNavigate();
    const [rows, setRows] = useState<Data[]>([]);
    const [countdowns, setCountdowns] = useState<ReviewerAllocatedPaperProps[]>([]);
    const [currentCountdownIndex, setCurrentCountdownIndex] = useState(0);
    const [time, setTime] = useState<{ phase: string; hours: number; minutes: number; seconds: number }>({
        phase: "Loading ...",
        hours: 0,
        minutes: 0,
        seconds: 0,
    });


    useEffect(() => {
        getConferenceInfo().then((data) => {
            const { submissiondeadline, biddingdeadline, reviewdeadline, announcementtime } = data;
            const countdownData: ReviewerAllocatedPaperProps[] = [
                { phase: "Submission", deadline: new Date(submissiondeadline) },
                { phase: "Bidding", deadline: new Date(biddingdeadline) },
                { phase: "Reviewing", deadline: new Date(reviewdeadline) },
                { phase: "Announcement", deadline: new Date(announcementtime) },
            ];

            setCountdowns(countdownData);
        })
    }, [])

    useEffect(() => {
        const countdownInterval = setInterval(() => {
            const now = new Date();
            const diff = countdowns[currentCountdownIndex].deadline.getTime() - now.getTime();

            if (diff <= 0) {
                clearInterval(countdownInterval);
                if (currentCountdownIndex < countdowns.length - 1) {
                    setCurrentCountdownIndex(currentCountdownIndex + 1);
                }
                return;
            }

            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const seconds = Math.floor((diff / 1000) % 60);

            setTime({ phase: countdowns[currentCountdownIndex].phase, hours, minutes, seconds });
        }, 1000);



        return () => clearInterval(countdownInterval);

    }, [countdowns, currentCountdownIndex]);


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
                    return createPaper(value.id, value.title, value.author_name, value.coauthors, value.paperstatus)
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
                        disabled={time.phase !== "Reviewing"}
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
    if (time.phase === "Submission" || time.phase === "Bidding" || time.phase === "Loading ...") {
        return (
            <Box marginTop={4}>
                <Typography variant="h6">
                    You currently have no papers allocated.
                </Typography>
            </Box>
        );
    }
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
