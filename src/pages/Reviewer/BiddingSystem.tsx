import React, { useState } from "react";
import { Button, Container, TableCell, TableRow, TextField, Box } from "@mui/material";
import createStatusMessage from "../../components/TableView/TableUtilContent";
import TableView, { Data, HeadCell } from "../../components/TableView/TableView";
import DropdownBid from "../../components/DropdownBid/DropdownBid";

//Defines a function to create paper data types
function createPaper(
    id: number,
    title: string,
    date: string,
    author: string,
    bid: number,
    status: string
): Data {
    return {
        id,
        title,
        date,
        author,
        bid,
        status
    };
}

//This function renders the page as well as dealing with any functionality needed for the rendering and submissions
function BiddingSystem() {
    const [ userPoints, setUserPoints ] = useState<number>(5);
    const [ userPapers, setUserPapers ] = useState<number | string>(5);
    const [ itemSelected, setItemSelected ] = useState<boolean>(false);
    const [ selectedValue, setSelectedValue ] = useState<Record<string, number>>({});
    const [ inputError, setInputError ] = useState<boolean>(false);

    //This is a function that handles what happens when an item is selected in a dropdown menu
    const handleItemSelected = (paperId: string, value: number) => {

        //If an item is set back to its initial state, all dropdown menus become usable again
        if (value === 0) {
            setItemSelected(false);
            setSelectedValue(prevSelectedValue => ({ ...prevSelectedValue, [ paperId ]: 0 }));
        }
        else { //Else disable dropdown menus that don't have a value selected
            setItemSelected(true);
            setSelectedValue(prevSelectedValue => ({ ...prevSelectedValue, [ paperId ]: value }));
        }
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
    // TODO:: send data to backend
    const handleUpload = () => {
        //Finds the paperId of the row that has a value selected in its dropDown menu
        const selectedPaperId = Object.keys(selectedValue).find((paperId) => selectedValue[ paperId ] > 0);
        if (selectedPaperId != undefined) {
            setUserPoints(userPoints - selectedValue[ selectedPaperId ]);
            console.log(selectedPaperId);
            console.log(selectedValue[ selectedPaperId ]);
            console.log("Already Bid");
        }
        console.log(userPapers);
    }

    //Creates rows for a table
    // TODO:: needs to create this based on what is received from the backend
    const [ rows, setRows ] = useState<Data[]>([
        createPaper(1, "Paper 1", "September 9, 2020", "Billy Lambert", 0, "Ready to Bid"),
        createPaper(2, "Paper 2", "August 2, 2021", "Kiara Melendez", 0, "Ready to Bid"),
        createPaper(3, "Paper 3", "September 24, 2022", "Annalise Mccormick", 1, "Already Bid"),
        createPaper(4, "Paper 4", "December 29, 2020", "Khalil Colon", 0, "Ready to Bid"),
        createPaper(5, "Paper 5", "May 20, 2021", "Mercedes Patton", 0, "Ready to Bid"),
        createPaper(6, "Paper 6", "May 15, 2022", "Faris Osborn", 1, "Already Bid"),
        createPaper(7, "Paper 7", "February 27, 2020", "Kaylum Perkins", 1, "Already Bid"),
        createPaper(8, "Paper 8", "October 24, 2021", "Asma Acevedo", 1, "Already Bid"),
        createPaper(9, "Paper 9", "November 7, 2022", "Leonardo Edwards", 1, "Already Bid"),
        createPaper(10, "Paper 10", "May 29, 2020", "David Gray", 1, "Already Bid"),
        createPaper(11, "Paper 11", "July 14, 2021", "Miranda Barber", 1, "Already Bid"),
        createPaper(12, "Paper 12", "December 31, 2022", "Gladys Patrick", 1, "Already Bid"),
    ]);

    //Creates the headers of a table
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
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.author}</TableCell>
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
                disabled={inputError}
            >
                Submit Bids
            </Button>
        </Box>
    );
}
export default BiddingSystem;
