import React, {useEffect, useState} from "react";
import { Button, TableCell, TableRow, TextField, Box } from "@mui/material";
import createStatusMessage from "../../components/TableView/TableUtilContent";
import TableView, { Data, HeadCell } from "../../components/TableView/TableView";
import DropdownBid from "../../components/DropdownBid/DropdownBid";
import getAllPaper from "../../services/getAllPaper";
import addBid from "../../services/addBid";
import {GenericForm} from "../../types/GenericForm";

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
// TODO :: implement a way to stop pages showing up in the Review phase
//This function renders the page as well as dealing with any functionality needed for the rendering and submissions
function BiddingSystem() {
    const [ userPoints, setUserPoints ] = useState<number>(5);
    const [ userPapers, setUserPapers ] = useState<number | string>(0);
    const [ itemSelected, setItemSelected ] = useState<boolean>(false);
    const [ selectedValue, setSelectedValue ] = useState<Record<string, number>>({});
    const [ inputError, setInputError ] = useState<boolean>(true);
    const [ rows, setRows ] = useState<Data[]>([]);

    //Gets papers from the backend and then creates paper objects with them
    useEffect(() => {
        getAllPaper()
            .then((value) => {
                value = value ?? []
                let totalBids = 0;
                const rows = value.map((value: GenericForm) => {
                    if (Number(value.bidamount) > 0) {
                        value.paperstatus = "Already Bid";
                    }
                    else {
                        value.paperstatus = "Ready to Bid";
                    }
                    totalBids += (Number(value.bidamount) || 0);
                    return createPaper(value.id, value.title, value.username, value.coauthors, Number(value.bidamount), value.paperstatus)
                })
                setUserPoints(userPoints - totalBids);
                setRows(rows ?? [])
            })
    }, [])
    //This is a function that handles what happens when an item is selected in a dropdown menu
    const handleItemSelected = (paperId: string, value: number) => {
        let newSelectedValue = {...selectedValue, [paperId]: value};
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
            setUserPapers(event.target.value);
            setInputError(true);
        } else {
            setInputError(false);
            setUserPapers(parsedValue);
        }
    };

    //Handles what happens when the submission Button is clicked
    const handleUpload = () => {
        //Finds the paperId of the row that has a value selected in its dropDown menu
        const selectedPaperId = Object.keys(selectedValue).find((paperId) => selectedValue[ paperId ] > 0);
        if (selectedPaperId != undefined) {
            addBid(selectedPaperId, selectedValue[ selectedPaperId ].toString())
                .then(response => {
                    console.log(response);
                    window.location.reload();
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }

    const handlePapers = () => {
        console.log(userPapers)
    }

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
                            disabled={itemSelected && !selectedValue[ row.id ]}
                            selectedValue={selectedValue[ row.id ] || 0}
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

    //Renders the page
    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box width="100%" textAlign="left" padding={4}>
                <div style={{ display: 'flex', flexDirection: 'row', height: '55px' }}>
                    <p style={{ marginBottom: '0px', marginRight: '20px' }}>Remaining Bidding points: {userPoints}</p>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <p>Maximum number of papers you would like to take: </p>
                        <TextField
                            type="text"
                            value={userPapers}
                            onChange={handleTextInputChange}
                            variant="standard"
                            size="small"
                            sx={{ marginLeft: '8px', width: '80px', height: '25px' }}
                            error={inputError}
                            helperText={inputError ? "Invalid input (1-10)" : ""}
                        />
                    </div>
                </div>
            </Box>
            <TableView
                rows={rows}
                defaultOrderBy="title"
                headCells={headCells}
                rowComponent={rowComponent}
            />
            <Box>
                <Button
                sx={{
                    backgroundColor: "#72BAD1",
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.075)",
                    borderRadius: "20px",
                    margin: "16px 100px 0 auto",
                    width: "150px",
                    color: "white"
                }}
                onClick={handlePapers}
                disabled={inputError}
            >
                Submit Max Papers
            </Button>
                <Button
                    sx={{
                        backgroundColor: "#72BAD1",
                        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.075)",
                        borderRadius: "20px",
                        margin: "16px 0 0 auto",
                        width: "150px",
                        color: "white"
                    }}
                    onClick={handleUpload}
                >
                    Submit Bids
                </Button>
            </Box>
        </Box>
    );
}
export default BiddingSystem;
