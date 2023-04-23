import React, { useState, useCallback, useRef } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, IconButton, Icon } from '@mui/material';
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
    onUpload: (files: File[]) => void;
}

//This class deals with the rendering of the DragDrop Dialog and also deals with the functions necessary for its operation
const DragDrop: React.FC<DragDropProps> = ({ open, onClose, onUpload }) => {
    const [files, setFiles] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    //This function deals with files being dropped on the Dropzone
    const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const droppedFiles = Array.from(e.dataTransfer.files);
        setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
    }, []);

    //This function deals with a Drag event on a Dropzone
    const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    }, []);

    //This function deals with the upload of the files.
    //FURTHER IMPLEMENTATION REQUIRED
    const handleUpload = () => {
        onUpload(files);
        setFiles([]);
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
            const newFiles = Array.from(e.target.files);
            setFiles((prevFiles) => [...prevFiles, ...newFiles]);
        }
    };


    //This function handles what happens when a file is removed
    const removeFile = (indexToRemove: number) => {
        setFiles((prevFiles) => prevFiles.filter((_, index) => index !== indexToRemove));
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
                    {files.length === 0 && (
                        <Typography variant="h6">
                            Drag and drop here or
                        </Typography>
                    )}
                    {files.length === 0 && (
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
                            multiple
                            onChange={handleFileInputChange}
                            style={{ display: 'none' }}
                        />
                    <ul style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '8px',
                        listStyle: 'none' }}>
                        {files.map((file, index) => (
                            <li key={index}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    position: 'relative',
                                    padding: 15
                            }}>
                                <Icon>
                                    <InsertDriveFile />
                                </Icon>
                                <IconButton size="small"
                                            onClick={() => removeFile(index)}
                                            sx={{
                                                position: 'absolute',
                                                top: 13,
                                                right: 5 }}>
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                                <Typography
                                    style={{
                                        wordWrap: 'break-word',
                                        textAlign: 'center',
                                        maxWidth: '50px'
                                    }}
                                >
                                    {file.name}
                                </Typography>
                            </li>
                        ))}
                    </ul>
                </Dropzone>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center' }}>
                <Button onClick={handleUpload} disabled={files.length === 0}>Submit Files</Button>
            </DialogActions>
        </Dialog>
    );
};

export default DragDrop;
