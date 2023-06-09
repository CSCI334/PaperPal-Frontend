import React, { useState, useCallback, useRef } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, IconButton, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import InsertDriveFile from '@mui/icons-material/InsertDriveFile';
import DeleteIcon from '@mui/icons-material/Delete';
import styled from '@emotion/styled';

//Design for a DropZone component used in the Dialog render
const Dropzone = styled('div')`
  border: 2px dashed #ccc;
  border-radius: 4px;
  padding: 16px;
  background-color: #f8f8f8;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 40vh;
`;

interface DragDropProps {
    open: boolean;
    onClose: () => void;
    onUpload: (file: File | null, paperName: string, coAuthors: string[]) => void;
}

//This class deals with the rendering of the DragDrop Dialog and also deals with the functions necessary for its operation
const DragDrop: React.FC<DragDropProps> = ({ open, onClose, onUpload }) => {
    const [file, setFile] = useState<File | null>(null);
    const [paperName, setPaperName] = useState<string>('');
    const [coAuthors, setCoAuthors] = useState<string>('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    //This function deals with files being dropped on the Dropzone
    const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const droppedFiles = Array.from(e.dataTransfer.files);
        if (droppedFiles.length === 1) {
            setFile(droppedFiles[0]);
        } else if (droppedFiles.length > 1) {
            alert('Please drop only one file at a time.');
        }
    }, []);

    //This function deals with a Drag event on a Dropzone
    const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    }, []);

    //This function deals with the upload of the files.
    const handleUpload = () => {
        const authorsArray = coAuthors.split(',').map((author) => author.trim());
        onUpload(file, paperName, authorsArray);
        setFile(null);
        onClose();
    };

    //This function handles the opening of a file selection screen
    const handleFileInputClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    //This function handles what happens when files are added using the file selection screen
    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
           if (e.target.files.length === 1) {
                const newFile = e.target.files.item(0);
                setFile(newFile);
            } else if (e.target.files.length > 1) {
               alert('Please select only one file at a time.');
           }
        }
    };

    //Renders a Dialog that has a drag and drop feature for a user to upload files
    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Upload Files</DialogTitle>
            <IconButton edge="end"
                color="inherit"
                onClick={onClose}
                aria-label="close"
                sx={{ position: 'absolute', top: 8, right: 8 }}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent sx={{
                width: '100%',
                minHeight: '50vh' }}>
                <Dropzone onDrop={onDrop} onDragOver={onDragOver}>
                    {!file && (
                        <Typography variant="h6">
                            Drag and drop here or
                        </Typography>
                    )}
                    {!file && (
                        <Typography variant="h6"
                                    onClick={handleFileInputClick}
                                    style={{
                                        cursor: 'pointer',
                                        color: "blue"
                        }}>
                            click to select
                        </Typography>
                    )}
                        <input ref={fileInputRef}
                            type="file"
                            hidden
                            onChange={handleFileInputChange}
                            style={{ display: 'none' }}
                        />
                    {file && (
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            position: 'relative',
                            maxWidth: '150px',
                            margin: '8px',
                        }}
                    >
                        <InsertDriveFile />
                        <IconButton
                            size="small"
                            onClick={() => setFile(null)}
                            sx={{ position: 'absolute', top: -3, right: 35, color: 'red' }}
                        >
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                        <Typography
                            style={{
                                wordWrap: 'break-word',
                                textAlign: 'center',
                            }}
                        >
                            {file.name}
                        </Typography>
                    </div>
                    )}
                </Dropzone>
                <TextField
                    label="Paper Name"
                    fullWidth
                    margin="dense"
                    value={paperName}
                    onChange={(e) => setPaperName(e.target.value)}
                />
                <TextField
                    label="Co-authors"
                    fullWidth
                    margin="dense"
                    value={coAuthors}
                    onChange={(e) => setCoAuthors(e.target.value)}
                />
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center' }}>
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
                    disabled={!file || !paperName}
                >
                    Submit Files
                </Button>
            </DialogActions>
        </Dialog>
    );
};
export default DragDrop;
