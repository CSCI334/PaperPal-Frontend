import React, { useState } from "react";
import { Box } from "@mui/system";
import { Button } from '@mui/material';
import DragDrop from '../../components/DragDrop/DragDrop';

//Class the deals with rendering of a page and any functionality needed
const AuthorSubmittedPaper: React.FC = () => {
    const [open, setOpen] = useState(false);

    //Deals with the opening of a DragDrop component
    const handleOpen = () => {
        setOpen(true);
    };

    //Deals with the closing of a DragDrop component
    const handleClose = () => {
        setOpen(false);
    };

    //Deals with what happens when files are uploaded in a DragDrop component
    //FURTHER IMPLEMENTATION REQUIRED
    const handleUpload = (file: File | null, paperName: string, coAuthors: string[]) => {
        console.log('File uploaded:', file);
        console.log('Paper Name:', paperName);
        console.log('Co Authors:', coAuthors);
    };


    //Renders a page that a user can see previously submitted files and allows for the submission of new files
    return (
        <Box position="relative">
            <DragDrop open={open} onClose={handleClose} onUpload={handleUpload} />
            <Button onClick={handleOpen}>
                Submit new paper
            </Button>
        </Box>
    );
};
export default AuthorSubmittedPaper;
