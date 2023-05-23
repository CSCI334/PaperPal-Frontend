import React, { useEffect, useState } from "react";
import { Button, TableCell, TableRow, TextField, Box, Typography } from "@mui/material";
import createStatusMessage from "../../components/TableView/TableUtilContent";
import TableView, { Data, HeadCell } from "../../components/TableView/TableView";
import DropdownBid from "../../components/DropdownBid/DropdownBid";
import getAllPaper from "../../services/getAllPaper";
import addBid from "../../services/addBid";
import { GenericForm } from "../../types/GenericForm";
import getConferenceInfo from "../../services/admin/getConferenceInfo";
import getWorkload from "../../services/reviewer/getWorkload";
import useWorkload from "../../hooks/useWorkload";
import httpOnClick from "../../hooks/httpOnClick";
import postWorkload from "../../services/reviewer/postWorkload";

//Defines a function to create paper data types
function createPaper(
    id: number,
    title: string,
    author: string,
    coauthors: string,
    bid: number,
    status: string
): Data {
    return {
        id,
        title,
        author,
        coauthors,
        bid,
        status
    };
}

interface BiddingSystemProps {
    phase: string;
    deadline: Date;
}

//This function renders the page as well as dealing with any functionality needed for the rendering and submissions
function BiddingSystem() {
    const [userPoints, setUserPoints] = useState<number>(0);
    const [userPapers, setUserPapers] = useState<number>(0);
    const [itemSelected, setItemSelected] = useState<boolean>(false);
    const [selectedValue, setSelectedValue] = useState<Record<string, number>>({});
    const [isWorkload, setIsWorkload] = useState<boolean>(true);
    const [inputError, setInputError] = useState<boolean>(false)

    const [rows, setRows] = useState<Data[]>([]);
    const updateAttribute = (id: number, attributeName: string, newValue: any) => {
        setRows((prevRows) =>
            prevRows.map((row) => {
                if (row.id === id) {
                    return { ...row, [attributeName]: newValue };
                }
                return row;
            })
        );
    };
    const [countdowns, setCountdowns] = useState<BiddingSystemProps[]>([]);
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
            const countdownData: BiddingSystemProps[] = [
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

    //Gets papers from the backend and then creates paper objects with them
    useEffect(() => {
        // get workload in backend and set the text field
        getWorkload().then((data) => {
            data = data ?? []
            if (data.paperworkload === null) {
                setIsWorkload(false);
            }
            console.log(data.paperworkload)
            setUserPapers(data.paperworkload)
            setUserPoints(data.bidpoints)
            console.log(data.bidpoints)
        })
        getAllPaper()
            .then((value) => {
                // value = value ?? []
                let totalBids = 0;
                const rows = value.map((value: GenericForm) => {
                    if (Number(value.bidamount) > 0) {
                        value.paperstatus = "Already Bid";
                        // totalBids += Number(value.bidamount)
                        // setUserPoints(userPoints - value.bidamount)
                    }
                    else {
                        value.paperstatus = "Ready to Bid";
                    }
                    // totalBids += (Number(value.bidamount) || 0);
                    return createPaper(value.id, value.title, value.username, value.coauthors, Number(value.bidamount), value.paperstatus)
                })
                // setUserPoints(userPoints - totalBids);
                setRows(rows ?? [])
                console.log(rows);
            })
    }, [])
    //This is a function that handles what happens when an item is selected in a dropdown menu
    const handleItemSelected = (paperId: string, value: number) => {
        let newSelectedValue = { ...selectedValue, [paperId]: value };
        //If an item is set back to its initial state, all dropdown menus become usable again
        if (value === 0) {
            setItemSelected(Object.values(newSelectedValue).some(v => v > 0));
        }
        else { //Else disable dropdown menus that don't have a value selected
            setItemSelected(true);
        }
        setSelectedValue(newSelectedValue);
    };

    //This is a function that deals with the text changing in a TextField
    const handleTextInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const parsedValue = parseInt(event.target.value, 10);

        //If the parsed value is not a number within the range of 1-10 the submission button becomes disabled and an error appears on the TextField
        if (isNaN(parsedValue) || parsedValue < 1 || parsedValue > 10) {
            setUserPapers(event.target.valueAsNumber);
            setInputError(true);
        } else {
            setInputError(false);
            setUserPapers(parsedValue);
        }
    };
    const handleUpload = httpOnClick(() => {
        const selectedPaperId = Object.keys(selectedValue).find((paperId) => selectedValue[paperId] > 0);
        if (selectedPaperId !== undefined) {
            return addBid(selectedPaperId, selectedValue[selectedPaperId].toString())
        }
        return new Promise<any>(() => { });

    }, () => {
        const selectedPaperId = Object.keys(selectedValue).find((paperId) => selectedValue[paperId] > 0);
        if (selectedPaperId !== undefined) {
            updateAttribute(Number.parseInt(selectedPaperId), "bid", selectedValue[selectedPaperId])
            updateAttribute(Number.parseInt(selectedPaperId), "status", "Already Bid")
            console.log(selectedPaperId)
            setUserPoints(userPoints - selectedValue[selectedPaperId])
            setItemSelected(false);
            setSelectedValue({});
        }

    }, "Succesfully submit bid")

    //Handles what happens when the submission Button is clicked
    // const handleUpload = () => {
    //     //Finds the paperId of the row that has a value selected in its dropDown menu
    //     const selectedPaperId = Object.keys(selectedValue).find((paperId) => selectedValue[paperId] > 0);

    //     if (selectedPaperId != undefined) {
    //         console.log(selectedPaperId)
    //         console.log(selectedValue)
    //         updateAttribute(Number.parseInt(selectedPaperId), "bid", selectedValue[selectedPaperId])
    //         updateAttribute(Number.parseInt(selectedPaperId), "status", "Already Bid")
    //         console.log(selectedPaperId)
    //         setUserPoints(userPoints - selectedValue[selectedPaperId])
    //         setItemSelected(false);
    //         setSelectedValue({});
    //         // addBid(selectedPaperId, selectedValue[selectedPaperId].toString())
    //         //     .then(response => {
    //         //         console.log(response);
    //         //         updateAttribute(Number.parseInt(selectedPaperId), "bidamount", selectedValue[selectedPaperId])
    //         //         updateAttribute(Number.parseInt(selectedPaperId), "status", "Already Bid")
    //         //         setUserPoints(userPoints - selectedValue[selectedPaperId])
    //         //     })
    //         //     .catch(error => {
    //         //         console.error(error);
    //         //     });
    //     }
    // }

    const handlePapers = httpOnClick(() => {

        return postWorkload(userPapers)
    }, value => {
        // not recommended
        setUserPoints(userPapers * 3)
        setIsWorkload(true);
    }, "Succesfully set maximum paper")

    //Creates the headers of a table
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
            id: "bids",
            label: "Bid"
        },
        {
            id: "status",
            label: "Status",
        }
    ];

    //This function creates rows of a table based on the data received from the backend
    const rowComponent = (row: Data) => {
        return (
            <TableRow>
                <TableCell component="th" scope="row">{row.title}</TableCell>
                <TableCell>{row.author}</TableCell>
                <TableCell>{row.coauthors}</TableCell>
                <TableCell>
                    {row.status === 'Ready to Bid' ? (//If the paper has already been bid on then it will show the bid value instead of a dropdown menu

                        <DropdownBid
                            key={row.id}
                            points={userPoints}
                            onItemSelected={(value) => handleItemSelected(row.id.toString(), value)}
                            disabled={itemSelected && !selectedValue[row.id]}
                            selectedValue={selectedValue[row.id] || 0}
                        />
                    ) : (
                        row.bid
                    )}
                </TableCell>
                <TableCell >
                    {createStatusMessage(row.status.toString())}
                </TableCell>
            </TableRow>
        );
    };
    if (time.phase !== "Bidding") {
        return (
            <Box marginTop={4}>
                <Typography variant="h6">
                    Bidding is not taking place currently.
                </Typography>
            </Box>
        );
    }
    //Renders the page
    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box width="100%" textAlign="left" padding={4}>
                <div style={{ display: 'flex', flexDirection: 'row', height: '55px' }}>
                    <p style={{ marginBottom: '0px', marginRight: '20px' }}>Remaining Bidding points: {userPoints}</p>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <p>Maximum number of papers you would like to take: </p>
                        {isWorkload && (
                            <p style={{ marginLeft: '4px' }}>{userPapers}</p>
                        )}
                        {!isWorkload && (
                            <TextField
                                type="number"
                                InputProps={{
                                    inputProps: {
                                        min: 1, // Minimum value
                                        max: 10, // Maximum value
                                    },
                                }}
                                defaultValue={0}
                                onChange={handleTextInputChange}
                                variant="standard"
                                size="small"
                                sx={{ marginLeft: '8px', width: '80px', height: '25px' }}
                                error={inputError}
                                helperText={inputError ? "Invalid input (1-10)" : ""}


                            />
                        )}

                    </div>

                    {!isWorkload && (
                        <Button variant="contained" color="button"
                            sx={{
                                marginLeft: "2%"
                            }}
                            onClick={handlePapers}
                            disabled={inputError}
                        >
                            Submit Max Papers
                        </Button>
                    )}


                </div>

            </Box>
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
                    marginLeft: "auto",
                    width: "150px",
                    color: "white"
                }}
                onClick={handleUpload}
            >
                Submit Bids
            </Button>

        </Box>
    );
}
export default BiddingSystem;
